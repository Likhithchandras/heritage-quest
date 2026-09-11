-- ====================================================================
-- HERITAGE TREASURE HUNT — SUPABASE & POSTGIS DATABASE SCHEMA
-- Version: 2.0 (Production / Multi-site)
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. HERITAGE SITES
CREATE TABLE IF NOT EXISTS heritage_sites (
    site_id VARCHAR(32) PRIMARY KEY,
    site_name VARCHAR(128) NOT NULL,
    state VARCHAR(64) NOT NULL,
    city VARCHAR(64) NOT NULL,
    location_desc VARCHAR(255),
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    geom GEOMETRY(Point, 4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)) STORED,
    historical_period VARCHAR(64) NOT NULL,
    architectural_style VARCHAR(64) NOT NULL,
    unesco_status BOOLEAN DEFAULT FALSE,
    description TEXT NOT NULL,
    story TEXT NOT NULL,
    historical_fact TEXT NOT NULL,
    final_secret TEXT NOT NULL,
    cover_image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Spatial index on site locations
CREATE INDEX IF NOT EXISTS idx_heritage_sites_geom ON heritage_sites USING GIST(geom);

-- 3. TREASURE HUNTS
CREATE TABLE IF NOT EXISTS treasure_hunts (
    hunt_id VARCHAR(32) PRIMARY KEY,
    site_id VARCHAR(32) REFERENCES heritage_sites(site_id) ON DELETE CASCADE,
    hunt_title VARCHAR(128) NOT NULL,
    difficulty VARCHAR(16) CHECK (difficulty IN ('Easy', 'Medium', 'Hard', 'EASY', 'MEDIUM', 'HARD')),
    estimated_duration VARCHAR(32) NOT NULL,
    trail_distance VARCHAR(32) NOT NULL,
    age_group VARCHAR(64) NOT NULL,
    total_points INT DEFAULT 1000,
    guide_name VARCHAR(64) NOT NULL,
    guide_role VARCHAR(64) NOT NULL,
    guide_avatar VARCHAR(16) DEFAULT '🏛️',
    guide_greeting TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CHECKPOINTS (OBSERVATION STATIONS)
CREATE TABLE IF NOT EXISTS checkpoints (
    checkpoint_id VARCHAR(64) PRIMARY KEY,
    hunt_id VARCHAR(32) REFERENCES treasure_hunts(hunt_id) ON DELETE CASCADE,
    checkpoint_number INT NOT NULL,
    title VARCHAR(128) NOT NULL,
    landmark VARCHAR(128) NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    geom GEOMETRY(Point, 4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)) STORED,
    geofence_radius_meters INT DEFAULT 35,
    clue_text TEXT NOT NULL,
    riddle_text TEXT NOT NULL,
    accepted_answers TEXT[] NOT NULL,
    hint_1 TEXT NOT NULL,
    hint_2 TEXT NOT NULL,
    observation_challenge TEXT NOT NULL,
    fun_question TEXT NOT NULL,
    question_answer TEXT NOT NULL,
    historical_fact TEXT NOT NULL,
    points_reward INT DEFAULT 150,
    badge_title VARCHAR(64),
    qr_code VARCHAR(64),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Spatial index on checkpoints
CREATE INDEX IF NOT EXISTS idx_checkpoints_geom ON checkpoints USING GIST(geom);

-- 5. USER PROFILES
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name VARCHAR(64) NOT NULL,
    email VARCHAR(128) UNIQUE,
    avatar_id VARCHAR(32) DEFAULT 'explorer_default',
    total_xp INT DEFAULT 0,
    hunts_completed_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. USER HUNT PROGRESS (Active Sessions)
CREATE TABLE IF NOT EXISTS user_hunt_progress (
    progress_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    hunt_id VARCHAR(32) REFERENCES treasure_hunts(hunt_id) ON DELETE CASCADE,
    current_checkpoint_number INT DEFAULT 1,
    hints_used_count INT DEFAULT 0,
    score_accumulated INT DEFAULT 0,
    status VARCHAR(16) DEFAULT 'IN_PROGRESS' CHECK (status IN ('IN_PROGRESS', 'COMPLETED', 'ABANDONED')),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    UNIQUE(user_id, hunt_id)
);

-- 7. GLOBAL LEADERBOARD
CREATE TABLE IF NOT EXISTS leaderboard (
    entry_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    display_name VARCHAR(64) NOT NULL,
    site_id VARCHAR(32) REFERENCES heritage_sites(site_id) ON DELETE CASCADE,
    hunt_title VARCHAR(128) NOT NULL,
    score INT NOT NULL,
    time_taken_seconds INT NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(score DESC, time_taken_seconds ASC);

-- ====================================================================
-- 8. POSTGIS SPATIAL RPC FUNCTIONS
-- ====================================================================

-- Function: Discover Nearby Heritage Hunts within radius (in KM)
CREATE OR REPLACE FUNCTION get_nearby_heritage_hunts(
    user_lat DOUBLE PRECISION,
    user_lng DOUBLE PRECISION,
    radius_km DOUBLE PRECISION DEFAULT 100.0
)
RETURNS TABLE (
    site_id VARCHAR(32),
    site_name VARCHAR(128),
    state VARCHAR(64),
    city VARCHAR(64),
    distance_km DOUBLE PRECISION,
    unesco_status BOOLEAN,
    hunt_title VARCHAR(128),
    total_checkpoints BIGINT
) LANGUAGE sql STABLE AS $$
    SELECT 
        s.site_id,
        s.site_name,
        s.state,
        s.city,
        ROUND((ST_Distance(
            s.geom::geography,
            ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography
        ) / 1000)::numeric, 2)::DOUBLE PRECISION AS distance_km,
        s.unesco_status,
        h.hunt_title,
        COUNT(c.checkpoint_id) AS total_checkpoints
    FROM heritage_sites s
    LEFT JOIN treasure_hunts h ON s.site_id = h.site_id
    LEFT JOIN checkpoints c ON h.hunt_id = c.hunt_id
    WHERE ST_DWithin(
        s.geom::geography,
        ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
        radius_km * 1000
    )
    GROUP BY s.site_id, s.site_name, s.state, s.city, s.geom, s.unesco_status, h.hunt_title
    ORDER BY distance_km ASC;
$$;

-- Function: Verify User Proximity to Checkpoint (Geofence Guard)
CREATE OR REPLACE FUNCTION verify_checkpoint_proximity(
    user_lat DOUBLE PRECISION,
    user_lng DOUBLE PRECISION,
    target_checkpoint_id VARCHAR(64)
)
RETURNS TABLE (
    is_in_range BOOLEAN,
    distance_meters INT,
    geofence_radius INT
) LANGUAGE plpgsql STABLE AS $$
DECLARE
    cp_geom GEOMETRY;
    cp_radius INT;
    calculated_dist INT;
BEGIN
    SELECT geom, geofence_radius_meters 
    INTO cp_geom, cp_radius 
    FROM checkpoints 
    WHERE checkpoint_id = target_checkpoint_id;

    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, -1, -1;
        RETURN;
    END IF;

    calculated_dist := ROUND(ST_Distance(
        cp_geom::geography,
        ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography
    ))::INT;

    RETURN QUERY SELECT (calculated_dist <= cp_radius), calculated_dist, cp_radius;
END;
$$;

-- ====================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE heritage_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE treasure_hunts ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_hunt_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Public read access for heritage sites, hunts, checkpoints, and leaderboards
CREATE POLICY "Public Read Heritage Sites" ON heritage_sites FOR SELECT USING (true);
CREATE POLICY "Public Read Treasure Hunts" ON treasure_hunts FOR SELECT USING (true);
CREATE POLICY "Public Read Checkpoints" ON checkpoints FOR SELECT USING (true);
CREATE POLICY "Public Read Leaderboard" ON leaderboard FOR SELECT USING (true);
CREATE POLICY "Public Read Profiles" ON user_profiles FOR SELECT USING (true);

-- Authenticated / anonymous user session writes
CREATE POLICY "User write own progress" ON user_hunt_progress 
    FOR ALL USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Insert leaderboard entry" ON leaderboard
    FOR INSERT WITH CHECK (true);
