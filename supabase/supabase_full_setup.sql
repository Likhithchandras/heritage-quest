-- ====================================================================
-- HERITAGE TREASURE HUNT — COMPLETE SUPABASE POSTGRESQL SETUP
-- 20 Iconic Monuments • 129 Interactive Checkpoints
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. HERITAGE SITES TABLE
CREATE TABLE IF NOT EXISTS heritage_sites (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    state TEXT NOT NULL,
    category TEXT NOT NULL,
    era TEXT,
    hero_image TEXT,
    description TEXT,
    difficulty TEXT DEFAULT 'Explorer (Kids & Family)',
    estimated_duration TEXT DEFAULT '45 mins',
    total_checkpoints INT DEFAULT 6,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CHECKPOINTS TABLE
CREATE TABLE IF NOT EXISTS checkpoints (
    id TEXT PRIMARY KEY,
    site_id TEXT REFERENCES heritage_sites(id) ON DELETE CASCADE,
    sequence INT NOT NULL,
    landmark TEXT NOT NULL,
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    radius INT DEFAULT 50,
    observation_task TEXT NOT NULL,
    riddle_text TEXT NOT NULL,
    riddle_answer TEXT NOT NULL,
    hint_1 TEXT,
    hint_2 TEXT,
    learn_fact TEXT NOT NULL,
    quiz_question TEXT NOT NULL,
    quiz_options JSONB NOT NULL,
    correct_option_index INT DEFAULT 0,
    points INT DEFAULT 50,
    xp INT DEFAULT 80,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXPLORER PROFILES (AUTH)
CREATE TABLE IF NOT EXISTS explorer_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'Junior Explorer',
    total_xp INT DEFAULT 0,
    current_rank TEXT DEFAULT 'Rookie Scout',
    unlocked_badges JSONB DEFAULT '[]'::jsonb,
    completed_hunts JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. LEADERBOARD ENTRIES
CREATE TABLE IF NOT EXISTS leaderboard (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    explorer_id UUID REFERENCES explorer_profiles(id) ON DELETE SET NULL,
    explorer_name TEXT NOT NULL,
    state TEXT NOT NULL,
    title TEXT NOT NULL,
    score INT NOT NULL,
    badges_count INT DEFAULT 0,
    hunts_completed INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- SEED DATA: 20 HERITAGE SITES & 129 CHECKPOINTS
-- ====================================================================

-- Site: Hampi (Karnataka)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'hampi',
    'Hampi',
    'The Lost Royal Seal',
    'Karnataka',
    'Imperial Capital',
    '14th - 16th Century CE (Vijayanagara)',
    'https://images.unsplash.com/photo-1600100397608-f010f443b74d?auto=format&fit=crop&w=1200&q=80',
    'A royal seal belonging to the Vijayanagara Empire has been lost. Explore Hampi, solve the clues and recover the seal.',
    'Explorer (Kids & Family)',
    '50 mins',
    8,
    15.335,
    76.46
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'HAM_001',
    'hampi',
    1,
    'Virupaksha Temple',
    15.335,
    76.46,
    50,
    'Look carefully at Virupaksha Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am made of stone and reach toward the sky at the temple entrance. What am I?',
    'Gopuram',
    'Look closely at Virupaksha Temple. Notice its shape or historical purpose.',
    'The answer starts with G and has 7 letters: G _ _ _ _ _ m',
    'Virupaksha Temple is a celebrated architectural marvel of Hampi, standing for centuries as a testament to historical ingenuity.',
    'What is a gopuram?',
    '["A temple entrance tower","A throne","A weapon","A marketplace"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'HAM_002',
    'hampi',
    2,
    'Hampi Bazaar',
    15.334,
    76.4635,
    50,
    'Look carefully at Hampi Bazaar. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'Diamonds and rubies were once sold in open bowls along my 800m street. What am I?',
    'Bazaar',
    'Look closely at Hampi Bazaar. Notice its shape or historical purpose.',
    'The answer starts with B and has 6 letters: B _ _ _ _ r',
    'Hampi Bazaar is a celebrated architectural marvel of Hampi, standing for centuries as a testament to historical ingenuity.',
    'What was famously traded at Hampi Bazaar?',
    '["Gemstones and diamonds","Plastic toys","Coins","Cars"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'HAM_003',
    'hampi',
    3,
    'Vittala Temple & Stone Chariot',
    15.3389,
    76.4789,
    50,
    'Look carefully at Vittala Temple & Stone Chariot. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I have four carved wheels of solid granite, but I never travel. What am I?',
    'Stone Chariot',
    'Look closely at Vittala Temple & Stone Chariot. Notice its shape or historical purpose.',
    'The answer starts with S and has 13 letters: S _ _ _ _ _ _ _ _ _ _ _ t',
    'Vittala Temple & Stone Chariot is a celebrated architectural marvel of Hampi, standing for centuries as a testament to historical ingenuity.',
    'Which currency note shows the Hampi Chariot?',
    '["Rs 50 Note","Rs 10 Note","Rs 100 Note","Rs 500 Note"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'HAM_004',
    'hampi',
    4,
    'King''s Balance (Tulabhara)',
    15.3398,
    76.482,
    50,
    'Look carefully at King''s Balance (Tulabhara). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'On coronation days, the king weighed himself against gold here. What stone frame am I?',
    'King''s Balance',
    'Look closely at King''s Balance (Tulabhara). Notice its shape or historical purpose.',
    'The answer starts with K and has 14 letters: K _ _ _ _ _ _ _ _ _ _ _ _ e',
    'King''s Balance (Tulabhara) is a celebrated architectural marvel of Hampi, standing for centuries as a testament to historical ingenuity.',
    'Why did the King weigh himself?',
    '["To donate gold to the people","To check weight","To train","To buy horses"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'HAM_005',
    'hampi',
    5,
    'Lotus Mahal',
    15.3205,
    76.471,
    50,
    'Look carefully at Lotus Mahal. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'My arches open gracefully like the petals of India''s national flower. What palace am I?',
    'Lotus Mahal',
    'Look closely at Lotus Mahal. Notice its shape or historical purpose.',
    'The answer starts with L and has 11 letters: L _ _ _ _ _ _ _ _ _ l',
    'Lotus Mahal is a celebrated architectural marvel of Hampi, standing for centuries as a testament to historical ingenuity.',
    'How was Lotus Mahal naturally cooled in summer?',
    '["Water pipes in walls","Fans","Ice","Open roof"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'HAM_006',
    'hampi',
    6,
    'Elephant Stables',
    15.3212,
    76.4725,
    50,
    'Look carefully at Elephant Stables. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I have eleven grand domed rooms for giant royal animals with trunks. What am I?',
    'Elephant Stables',
    'Look closely at Elephant Stables. Notice its shape or historical purpose.',
    'The answer starts with E and has 16 letters: E _ _ _ _ _ _ _ _ _ _ _ _ _ _ s',
    'Elephant Stables is a celebrated architectural marvel of Hampi, standing for centuries as a testament to historical ingenuity.',
    'How many domed chambers are there?',
    '["11 Chambers","5 Chambers","20 Chambers","50 Chambers"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'HAM_007',
    'hampi',
    7,
    'Mahanavami Dibba',
    15.3182,
    76.4688,
    50,
    'Look carefully at Mahanavami Dibba. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a 12-meter high stepped platform where kings celebrated Dasara. What is my name?',
    'Mahanavami Dibba',
    'Look closely at Mahanavami Dibba. Notice its shape or historical purpose.',
    'The answer starts with M and has 16 letters: M _ _ _ _ _ _ _ _ _ _ _ _ _ _ a',
    'Mahanavami Dibba is a celebrated architectural marvel of Hampi, standing for centuries as a testament to historical ingenuity.',
    'Which 10-day festival was celebrated here?',
    '["Dasara / Navaratri","Holi","New Year","Kite Day"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'HAM_008',
    'hampi',
    8,
    'Royal Enclosure Secret Chamber',
    15.3168,
    76.4675,
    50,
    'Look carefully at Royal Enclosure Secret Chamber. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the sacred emblem of the Vijayanagara Empire with the boar, sun, and moon. What treasure have you found?',
    'The Royal Seal',
    'Look closely at Royal Enclosure Secret Chamber. Notice its shape or historical purpose.',
    'The answer starts with T and has 14 letters: T _ _ _ _ _ _ _ _ _ _ _ _ l',
    'Royal Enclosure Secret Chamber is a celebrated architectural marvel of Hampi, standing for centuries as a testament to historical ingenuity.',
    'What symbols were carved on the Royal Seal?',
    '["Sun and Crescent Moon","Two Comets","Seven Stars","Lightning"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Mysore Palace (Karnataka)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'mysore-palace',
    'Mysore Palace',
    'The Maharaja''s Missing Message',
    'Karnataka',
    'Royal Palace',
    'Wadiyar Dynasty (1912 CE)',
    'https://images.unsplash.com/photo-1580181651977-398f5f0c02c0?auto=format&fit=crop&w=1200&q=80',
    'The Maharaja of Mysore left a coded royal proclamation hidden in the palace corridors. Decode the message of wisdom.',
    'Explorer (Kids & Family)',
    '40 mins',
    6,
    12.3051,
    76.6552
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'MYS_001',
    'mysore-palace',
    1,
    'Gombe Thotti (Doll''s Pavilion)',
    12.3051,
    76.6552,
    50,
    'Look carefully at Gombe Thotti (Doll''s Pavilion). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a traditional wooden figurine showcased during Dasara. What pavilion am I?',
    'Gombe Thotti',
    'Look closely at Gombe Thotti (Doll''s Pavilion). Notice its shape or historical purpose.',
    'The answer starts with G and has 12 letters: G _ _ _ _ _ _ _ _ _ _ i',
    'Gombe Thotti (Doll''s Pavilion) is a celebrated architectural marvel of Mysore Palace, standing for centuries as a testament to historical ingenuity.',
    'What does Gombe mean in Kannada?',
    '["Doll","Sword","Elephant","Crown"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'MYS_002',
    'mysore-palace',
    2,
    'Kalyana Mantapa (Marriage Hall)',
    12.3053,
    76.6554,
    50,
    'Look carefully at Kalyana Mantapa (Marriage Hall). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I have eight sides and stained-glass peacock tiles from Scotland. What hall am I?',
    'Kalyana Mantapa',
    'Look closely at Kalyana Mantapa (Marriage Hall). Notice its shape or historical purpose.',
    'The answer starts with K and has 15 letters: K _ _ _ _ _ _ _ _ _ _ _ _ _ a',
    'Kalyana Mantapa (Marriage Hall) is a celebrated architectural marvel of Mysore Palace, standing for centuries as a testament to historical ingenuity.',
    'Which bird is depicted on the stained glass ceiling?',
    '["Peacock","Eagle","Parrot","Swan"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'MYS_003',
    'mysore-palace',
    3,
    'Diwan-i-Khas (Private Durbar)',
    12.3055,
    76.6556,
    50,
    'Look carefully at Diwan-i-Khas (Private Durbar). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am painted in sea-green turquoise with gilded arches for private royal meetings. What hall am I?',
    'Diwan-i-Khas',
    'Look closely at Diwan-i-Khas (Private Durbar). Notice its shape or historical purpose.',
    'The answer starts with D and has 12 letters: D _ _ _ _ _ _ _ _ _ _ s',
    'Diwan-i-Khas (Private Durbar) is a celebrated architectural marvel of Mysore Palace, standing for centuries as a testament to historical ingenuity.',
    'What was the purpose of Diwan-i-Khas?',
    '["Private meetings with ministers","Dining","Kitchen","Barracks"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'MYS_004',
    'mysore-palace',
    4,
    'Ambavilasa (Public Durbar)',
    12.3057,
    76.6558,
    50,
    'Look carefully at Ambavilasa (Public Durbar). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the grandest public court where the Maharaja sat upon the Golden Throne. What is my name?',
    'Ambavilasa',
    'Look closely at Ambavilasa (Public Durbar). Notice its shape or historical purpose.',
    'The answer starts with A and has 10 letters: A _ _ _ _ _ _ _ _ a',
    'Ambavilasa (Public Durbar) is a celebrated architectural marvel of Mysore Palace, standing for centuries as a testament to historical ingenuity.',
    'What material covers the ceremonial doors?',
    '["Solid Carved Silver","Plastic","Clay","Tin"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'MYS_005',
    'mysore-palace',
    5,
    'The Golden Howdah (Ambari)',
    12.305,
    76.655,
    50,
    'Look carefully at The Golden Howdah (Ambari). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I weigh 750 kilograms of pure gold and ride atop the royal tusker elephant. What am I?',
    'Golden Howdah',
    'Look closely at The Golden Howdah (Ambari). Notice its shape or historical purpose.',
    'The answer starts with G and has 13 letters: G _ _ _ _ _ _ _ _ _ _ _ h',
    'The Golden Howdah (Ambari) is a celebrated architectural marvel of Mysore Palace, standing for centuries as a testament to historical ingenuity.',
    'How much does the Golden Howdah weigh?',
    '["750 Kilograms","50 Kilograms","100 Kilograms","2000 Kilograms"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'MYS_006',
    'mysore-palace',
    6,
    'Palace Illumination & Royal Gate',
    12.3045,
    76.6545,
    50,
    'Look carefully at Palace Illumination & Royal Gate. Can you spot the unique carved features, architectural arches, or structural pillars?',
    '100,000 of us light up the palace on Dasara nights like a glowing dream. What are we?',
    'Light Bulbs',
    'Look closely at Palace Illumination & Royal Gate. Notice its shape or historical purpose.',
    'The answer starts with L and has 11 letters: L _ _ _ _ _ _ _ _ _ s',
    'Palace Illumination & Royal Gate is a celebrated architectural marvel of Mysore Palace, standing for centuries as a testament to historical ingenuity.',
    'How many bulbs light up Mysore Palace?',
    '["Nearly 100,000 bulbs","500 bulbs","2000 bulbs","10000 bulbs"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Chitradurga Fort (Karnataka)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'chitradurga-fort',
    'Chitradurga Fort',
    'The Seven Walls Mystery',
    'Karnataka',
    'Hill Fortress',
    'Nayakas Dynasty',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    'Explore the impregnable stone fortress with seven concentric walls, secret rock crevices, and ancient rainwater tanks.',
    'Explorer (Kids & Family)',
    '50 mins',
    8,
    14.2215,
    76.398
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_001',
    'chitradurga-fort',
    1,
    'Rangayyana Bagilu (Outer Gate)',
    14.2215,
    76.398,
    50,
    'Look carefully at Rangayyana Bagilu (Outer Gate). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am built with winding curves so war elephants cannot charge straight into the fort. What entrance am I?',
    'Rangayyana Bagilu',
    'Look closely at Rangayyana Bagilu (Outer Gate). Notice its shape or historical purpose.',
    'The answer starts with R and has 17 letters: R _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ u',
    'Rangayyana Bagilu (Outer Gate) is a celebrated architectural marvel of Chitradurga Fort, standing for centuries as a testament to historical ingenuity.',
    'Why were entrance paths built with zig-zag turns?',
    '["To stop charging war elephants","For hide and seek","For wind","For art"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_002',
    'chitradurga-fort',
    2,
    'Obavvana Kindi (Heroine''s Crevice)',
    14.223,
    76.3995,
    50,
    'Look carefully at Obavvana Kindi (Heroine''s Crevice). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I defended this narrow rock hole armed only with a wooden rice pestle (Onake). Who am I?',
    'Onake Obavva',
    'Look closely at Obavvana Kindi (Heroine''s Crevice). Notice its shape or historical purpose.',
    'The answer starts with O and has 12 letters: O _ _ _ _ _ _ _ _ _ _ a',
    'Obavvana Kindi (Heroine''s Crevice) is a celebrated architectural marvel of Chitradurga Fort, standing for centuries as a testament to historical ingenuity.',
    'What tool did Onake Obavva use to defend the fort?',
    '["A wooden rice pestle (Onake)","A bronze spoon","A stone hammer","A shield"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_003',
    'chitradurga-fort',
    3,
    'Ekanatheshwari Temple',
    14.2245,
    76.401,
    50,
    'Look carefully at Ekanatheshwari Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the patron goddess temple of the fortress nestled against huge granite boulders. What temple am I?',
    'Ekanatheshwari Temple',
    'Look closely at Ekanatheshwari Temple. Notice its shape or historical purpose.',
    'The answer starts with E and has 21 letters: E _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Ekanatheshwari Temple is a celebrated architectural marvel of Chitradurga Fort, standing for centuries as a testament to historical ingenuity.',
    'How many temples were built inside the fort?',
    '["18 Temples","2 Temples","5 Temples","50 Temples"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_004',
    'chitradurga-fort',
    4,
    'Hidimbeshwara Cave Temple',
    14.2255,
    76.402,
    50,
    'Look carefully at Hidimbeshwara Cave Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'Carved from a natural boulder, I am named after an epic Mahabharata hero. What cave temple am I?',
    'Hidimbeshwara Temple',
    'Look closely at Hidimbeshwara Cave Temple. Notice its shape or historical purpose.',
    'The answer starts with H and has 20 letters: H _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Hidimbeshwara Cave Temple is a celebrated architectural marvel of Chitradurga Fort, standing for centuries as a testament to historical ingenuity.',
    'From which epic does Hidimbeshwara originate?',
    '["Mahabharata","Ramayana","Panchatantra","Jataka"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_005',
    'chitradurga-fort',
    5,
    'Gunpowder Mills (Maddu Bisuva Kallu)',
    14.226,
    76.4035,
    50,
    'Look carefully at Gunpowder Mills (Maddu Bisuva Kallu). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I have four giant round stones used to grind cannon powder. What am I?',
    'Gunpowder Mill',
    'Look closely at Gunpowder Mills (Maddu Bisuva Kallu). Notice its shape or historical purpose.',
    'The answer starts with G and has 14 letters: G _ _ _ _ _ _ _ _ _ _ _ _ l',
    'Gunpowder Mills (Maddu Bisuva Kallu) is a celebrated architectural marvel of Chitradurga Fort, standing for centuries as a testament to historical ingenuity.',
    'What was manufactured at these grinding mills?',
    '["Gunpowder for cannons","Flour for bread","Sugar","Spices"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_006',
    'chitradurga-fort',
    6,
    'Rainwater Harvesting Tanks (Honda)',
    14.227,
    76.4045,
    50,
    'Look carefully at Rainwater Harvesting Tanks (Honda). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a carved stone pond that captured every drop of rain so soldiers never went thirsty. What am I?',
    'Rainwater Tank',
    'Look closely at Rainwater Harvesting Tanks (Honda). Notice its shape or historical purpose.',
    'The answer starts with R and has 14 letters: R _ _ _ _ _ _ _ _ _ _ _ _ k',
    'Rainwater Harvesting Tanks (Honda) is a celebrated architectural marvel of Chitradurga Fort, standing for centuries as a testament to historical ingenuity.',
    'How many water tanks supplied the fort garrison?',
    '["Over 35 Reservoirs","Only 1 Tank","5 Tanks","None"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_007',
    'chitradurga-fort',
    7,
    'The Summit Watch Tower (Gali Gopura)',
    14.228,
    76.406,
    50,
    'Look carefully at The Summit Watch Tower (Gali Gopura). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'Perched on the highest cliff, my name means Wind Tower. Sentinels watched for enemy flags. What tower am I?',
    'Gali Gopura',
    'Look closely at The Summit Watch Tower (Gali Gopura). Notice its shape or historical purpose.',
    'The answer starts with G and has 11 letters: G _ _ _ _ _ _ _ _ _ a',
    'The Summit Watch Tower (Gali Gopura) is a celebrated architectural marvel of Chitradurga Fort, standing for centuries as a testament to historical ingenuity.',
    'What does the Kannada word Gali mean?',
    '["Wind","Sun","Stone","Fire"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_008',
    'chitradurga-fort',
    8,
    'The Seventh Citadel Wall',
    14.229,
    76.4075,
    50,
    'Look carefully at The Seventh Citadel Wall. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the final, seventh circular wall enclosing the highest kingly citadel. What mystery have you solved?',
    'The Seven Walls',
    'Look closely at The Seventh Citadel Wall. Notice its shape or historical purpose.',
    'The answer starts with T and has 15 letters: T _ _ _ _ _ _ _ _ _ _ _ _ _ s',
    'The Seventh Citadel Wall is a celebrated architectural marvel of Chitradurga Fort, standing for centuries as a testament to historical ingenuity.',
    'How were the fort stones held together?',
    '["Interlocking precision joints without cement","Mud glue","Wood nails","Tape"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Badami Cave Temples (Karnataka)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'badami-caves',
    'Badami Cave Temples',
    'The Cave Sculptor''s Secret',
    'Karnataka',
    'Rock-Cut Temples',
    'Early Chalukya Dynasty (6th-8th Century CE)',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    'Carved into red sandstone cliffs overlooking Agastya Lake, discover the secrets of the Chalukya master cave sculptors.',
    'Explorer (Kids & Family)',
    '40 mins',
    6,
    15.918,
    75.6765
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'BAD_001',
    'badami-caves',
    1,
    'Cave 1: Dancing Nataraja',
    15.918,
    75.6765,
    50,
    'Look carefully at Cave 1: Dancing Nataraja. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the cosmic dancer with eighteen carved stone arms depicting Bharatanatyam poses. Who am I?',
    'Nataraja',
    'Look closely at Cave 1: Dancing Nataraja. Notice its shape or historical purpose.',
    'The answer starts with N and has 8 letters: N _ _ _ _ _ _ a',
    'Cave 1: Dancing Nataraja is a celebrated architectural marvel of Badami Cave Temples, standing for centuries as a testament to historical ingenuity.',
    'How many arms does Nataraja have in Cave 1?',
    '["18 Arms","4 Arms","8 Arms","100 Arms"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'BAD_002',
    'badami-caves',
    2,
    'Cave 2: Trivikrama Cosmic Strides',
    15.9185,
    75.6772,
    50,
    'Look carefully at Cave 2: Trivikrama Cosmic Strides. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I stepped across the earth with one foot and the sky with my second foot. What avatar am I?',
    'Trivikrama',
    'Look closely at Cave 2: Trivikrama Cosmic Strides. Notice its shape or historical purpose.',
    'The answer starts with T and has 10 letters: T _ _ _ _ _ _ _ _ a',
    'Cave 2: Trivikrama Cosmic Strides is a celebrated architectural marvel of Badami Cave Temples, standing for centuries as a testament to historical ingenuity.',
    'Which avatar of Vishnu measured the cosmos?',
    '["Trivikrama (Vamana)","Matsya","Kurma","Rama"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'BAD_003',
    'badami-caves',
    3,
    'Cave 3: Narasimha & Harihara',
    15.919,
    75.678,
    50,
    'Look carefully at Cave 3: Narasimha & Harihara. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the largest and most grandly carved cave in Badami with an inscription from 578 CE. What cave am I?',
    'Cave 3',
    'Look closely at Cave 3: Narasimha & Harihara. Notice its shape or historical purpose.',
    'The answer starts with C and has 6 letters: C _ _ _ _ 3',
    'Cave 3: Narasimha & Harihara is a celebrated architectural marvel of Badami Cave Temples, standing for centuries as a testament to historical ingenuity.',
    'In which century was Cave 3 dedicated?',
    '["6th Century CE (578 CE)","12th Century CE","1st Century BCE","20th Century"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'BAD_004',
    'badami-caves',
    4,
    'Cave 4: Mahavira & Jain Tirthankaras',
    15.9195,
    75.6788,
    50,
    'Look carefully at Cave 4: Mahavira & Jain Tirthankaras. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the 24th Tirthankara seated serenely on a lion throne. Who am I?',
    'Mahavira',
    'Look closely at Cave 4: Mahavira & Jain Tirthankaras. Notice its shape or historical purpose.',
    'The answer starts with M and has 8 letters: M _ _ _ _ _ _ a',
    'Cave 4: Mahavira & Jain Tirthankaras is a celebrated architectural marvel of Badami Cave Temples, standing for centuries as a testament to historical ingenuity.',
    'Whom is Cave 4 dedicated to?',
    '["Jain Tirthankaras (Mahavira)","Greek philosophers","Roman kings","Pharaohs"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'BAD_005',
    'badami-caves',
    5,
    'Agastya Lake',
    15.92,
    75.6795,
    50,
    'Look carefully at Agastya Lake. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the sacred lake nestled in the red sandstone canyon between the cave cliffs. What lake am I?',
    'Agastya Lake',
    'Look closely at Agastya Lake. Notice its shape or historical purpose.',
    'The answer starts with A and has 12 letters: A _ _ _ _ _ _ _ _ _ _ e',
    'Agastya Lake is a celebrated architectural marvel of Badami Cave Temples, standing for centuries as a testament to historical ingenuity.',
    'Who was the lake at Badami named after?',
    '["Sage Agastya","Alexander","Marco Polo","Vasco da Gama"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'BAD_006',
    'badami-caves',
    6,
    'Bhootnath Temple at Water''s Edge',
    15.9208,
    75.681,
    50,
    'Look carefully at Bhootnath Temple at Water''s Edge. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I sit right on the water edge of the lake with my reflection shimmering on the waves. What temple am I?',
    'Bhootnath Temple',
    'Look closely at Bhootnath Temple at Water''s Edge. Notice its shape or historical purpose.',
    'The answer starts with B and has 16 letters: B _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Bhootnath Temple at Water''s Edge is a celebrated architectural marvel of Badami Cave Temples, standing for centuries as a testament to historical ingenuity.',
    'Where is Bhootnath Temple located?',
    '["Directly at the water edge of Agastya Lake","Underground","On a plane","On a glacier"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Aihole (Karnataka)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'aihole',
    'Aihole',
    'The Ancient Architect',
    'Karnataka',
    'Temple Laboratory',
    '5th - 8th Century CE (Chalukyas)',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    'Visit the laboratory of Indian temple architecture where master builders experimented with over 120 stone designs.',
    'Explorer (Kids & Family)',
    '40 mins',
    6,
    16.0195,
    75.882
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AIH_001',
    'aihole',
    1,
    'Durga Temple (Apsidal Wonder)',
    16.0195,
    75.882,
    50,
    'Look carefully at Durga Temple (Apsidal Wonder). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I have a rounded apsidal back like a horseshoe or Buddhist chaitya hall. What temple am I?',
    'Durga Temple',
    'Look closely at Durga Temple (Apsidal Wonder). Notice its shape or historical purpose.',
    'The answer starts with D and has 12 letters: D _ _ _ _ _ _ _ _ _ _ e',
    'Durga Temple (Apsidal Wonder) is a celebrated architectural marvel of Aihole, standing for centuries as a testament to historical ingenuity.',
    'Why is it called the Durga Temple?',
    '["It was located near the fort (Durg) wall","It was green","It was a ship","It had 100 doors"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AIH_002',
    'aihole',
    2,
    'Lad Khan Temple',
    16.019,
    75.8815,
    50,
    'Look carefully at Lad Khan Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I resemble a village meeting hall with stone lattice windows and a roof shrine. What temple am I?',
    'Lad Khan Temple',
    'Look closely at Lad Khan Temple. Notice its shape or historical purpose.',
    'The answer starts with L and has 15 letters: L _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Lad Khan Temple is a celebrated architectural marvel of Aihole, standing for centuries as a testament to historical ingenuity.',
    'What architectural feature filters sunlight?',
    '["Carved stone lattice (Jali) windows","Glass","Mirrors","Curtains"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AIH_003',
    'aihole',
    3,
    'Ravana Phadi Cave',
    16.021,
    75.8845,
    50,
    'Look carefully at Ravana Phadi Cave. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am Aihole''s oldest rock-cut cave, famous for my 10-armed Dancing Shiva relief. What cave am I?',
    'Ravana Phadi',
    'Look closely at Ravana Phadi Cave. Notice its shape or historical purpose.',
    'The answer starts with R and has 12 letters: R _ _ _ _ _ _ _ _ _ _ i',
    'Ravana Phadi Cave is a celebrated architectural marvel of Aihole, standing for centuries as a testament to historical ingenuity.',
    'Approximately when was Ravana Phadi carved?',
    '["550 CE (6th Century)","1800 CE","200 BCE","1950 CE"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AIH_004',
    'aihole',
    4,
    'Meguti Jain Temple & Inscription',
    16.0225,
    75.886,
    50,
    'Look carefully at Meguti Jain Temple & Inscription. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'My stone wall carries the famous 634 CE poem praising the victories of King Pulakeshin II. What temple am I?',
    'Meguti Temple',
    'Look closely at Meguti Jain Temple & Inscription. Notice its shape or historical purpose.',
    'The answer starts with M and has 13 letters: M _ _ _ _ _ _ _ _ _ _ _ e',
    'Meguti Jain Temple & Inscription is a celebrated architectural marvel of Aihole, standing for centuries as a testament to historical ingenuity.',
    'Which northern emperor was defeated by Pulakeshin II?',
    '["Emperor Harsha","Alexander","Caesar","Genghis Khan"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AIH_005',
    'aihole',
    5,
    'Huchappayyagudi Temple',
    16.018,
    75.88,
    50,
    'Look carefully at Huchappayyagudi Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I feature exquisite ceiling carvings of Garuda and celestial deities soaring in flight. What temple am I?',
    'Huchappayyagudi',
    'Look closely at Huchappayyagudi Temple. Notice its shape or historical purpose.',
    'The answer starts with H and has 15 letters: H _ _ _ _ _ _ _ _ _ _ _ _ _ i',
    'Huchappayyagudi Temple is a celebrated architectural marvel of Aihole, standing for centuries as a testament to historical ingenuity.',
    'Where are the flying deity carvings located?',
    '["On the stone ceiling panels","In a well","On roof tiles","On grass"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AIH_006',
    'aihole',
    6,
    'Konti Gudi Group',
    16.0175,
    75.879,
    50,
    'Look carefully at Konti Gudi Group. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'We are a cluster of four ancient shrines representing the experimental cradle of temple architecture. What are we?',
    'Konti Gudi',
    'Look closely at Konti Gudi Group. Notice its shape or historical purpose.',
    'The answer starts with K and has 10 letters: K _ _ _ _ _ _ _ _ i',
    'Konti Gudi Group is a celebrated architectural marvel of Aihole, standing for centuries as a testament to historical ingenuity.',
    'What title is Aihole famously known by?',
    '["The Cradle of Indian Temple Architecture","Golden City","Desert Oasis","Mountain Peak"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Pattadakal (Karnataka)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'pattadakal',
    'Pattadakal',
    'The Master Builder''s Blueprint',
    'Karnataka',
    'Coronation City',
    '7th - 8th Century CE (Chalukyas)',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    'Explore the UNESCO World Heritage coronation city featuring a synthesis of North Indian Nagara and South Indian Dravida styles.',
    'Explorer (Kids & Family)',
    '40 mins',
    6,
    15.949,
    75.816
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'PAT_001',
    'pattadakal',
    1,
    'Virupaksha Temple (Lokeshwara)',
    15.949,
    75.816,
    50,
    'Look carefully at Virupaksha Temple (Lokeshwara). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I was built by Queen Lokamahadevi in 740 CE and served as the model for Kailasa temple. What temple am I?',
    'Virupaksha Temple',
    'Look closely at Virupaksha Temple (Lokeshwara). Notice its shape or historical purpose.',
    'The answer starts with V and has 17 letters: V _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Virupaksha Temple (Lokeshwara) is a celebrated architectural marvel of Pattadakal, standing for centuries as a testament to historical ingenuity.',
    'Which Queen commissioned the Virupaksha Temple?',
    '["Queen Lokamahadevi","Queen Elizabeth","Cleopatra","Victoria"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'PAT_002',
    'pattadakal',
    2,
    'Mallikarjuna Temple (Sister Shrine)',
    15.9493,
    75.8164,
    50,
    'Look carefully at Mallikarjuna Temple (Sister Shrine). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the twin sister temple of Virupaksha, built with a circular dome roof. What is my name?',
    'Mallikarjuna Temple',
    'Look closely at Mallikarjuna Temple (Sister Shrine). Notice its shape or historical purpose.',
    'The answer starts with M and has 19 letters: M _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Mallikarjuna Temple (Sister Shrine) is a celebrated architectural marvel of Pattadakal, standing for centuries as a testament to historical ingenuity.',
    'What shape is the dome tower atop Mallikarjuna Temple?',
    '["Circular (Hemispherical)","Triangular","Star Shaped","Flat"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'PAT_003',
    'pattadakal',
    3,
    'Sangameshvara Temple',
    15.9498,
    75.817,
    50,
    'Look carefully at Sangameshvara Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'Commissioned by King Vijayaditya, I am the oldest Dravida-style temple in Pattadakal. What temple am I?',
    'Sangameshvara Temple',
    'Look closely at Sangameshvara Temple. Notice its shape or historical purpose.',
    'The answer starts with S and has 20 letters: S _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Sangameshvara Temple is a celebrated architectural marvel of Pattadakal, standing for centuries as a testament to historical ingenuity.',
    'Who was the King that commissioned Sangameshvara Temple?',
    '["King Vijayaditya","King Ashoka","King Babur","King Henry"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'PAT_004',
    'pattadakal',
    4,
    'Kadasiddheshwara Temple',
    15.9502,
    75.8175,
    50,
    'Look carefully at Kadasiddheshwara Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I feature a North Indian beehive-curved tower (Rekha Nagara) with an Amalaka crest. What temple am I?',
    'Kadasiddheshwara',
    'Look closely at Kadasiddheshwara Temple. Notice its shape or historical purpose.',
    'The answer starts with K and has 16 letters: K _ _ _ _ _ _ _ _ _ _ _ _ _ _ a',
    'Kadasiddheshwara Temple is a celebrated architectural marvel of Pattadakal, standing for centuries as a testament to historical ingenuity.',
    'What distinct style is seen in the beehive-curved tower?',
    '["North Indian Nagara Style","Gothic Style","Art Deco","Egyptian"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'PAT_005',
    'pattadakal',
    5,
    'Jambulingeshwara Temple',
    15.9505,
    75.8178,
    50,
    'Look carefully at Jambulingeshwara Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'My front tower arch prominently features Lord Surya riding across the sky on seven horses. What temple am I?',
    'Jambulingeshwara',
    'Look closely at Jambulingeshwara Temple. Notice its shape or historical purpose.',
    'The answer starts with J and has 16 letters: J _ _ _ _ _ _ _ _ _ _ _ _ _ _ a',
    'Jambulingeshwara Temple is a celebrated architectural marvel of Pattadakal, standing for centuries as a testament to historical ingenuity.',
    'How many horses draw the chariot of the Sun God Surya?',
    '["7 Horses","2 Horses","100 Horses","1 Horse"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'PAT_006',
    'pattadakal',
    6,
    'Papanatha Temple',
    15.948,
    75.815,
    50,
    'Look carefully at Papanatha Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I uniquely combine a North Indian curved tower with South Indian halls and Ramayana friezes. What temple am I?',
    'Papanatha Temple',
    'Look closely at Papanatha Temple. Notice its shape or historical purpose.',
    'The answer starts with P and has 16 letters: P _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Papanatha Temple is a celebrated architectural marvel of Pattadakal, standing for centuries as a testament to historical ingenuity.',
    'What royal ceremony was celebrated at Pattadakal by kings?',
    '["Royal Coronation Ceremony","Boat Race","Snowboarding","Olympic Games"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Belur (Karnataka)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'belur',
    'Belur',
    'The Sculptor''s Masterpiece',
    'Karnataka',
    'Hoysala Star-Plan',
    '1117 CE (Hoysala Empire)',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    'Explore the star-shaped Chennakeshava Temple carved from soft soapstone featuring the world-famous dancing Madanika bracket figures.',
    'Explorer (Kids & Family)',
    '40 mins',
    6,
    13.1625,
    75.8595
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'BEL_001',
    'belur',
    1,
    'Chennakeshava Temple (Star Platform)',
    13.1625,
    75.8595,
    50,
    'Look carefully at Chennakeshava Temple (Star Platform). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am an intricately carved star-shaped temple built by King Vishnuvardhana in 1117 CE. What temple am I?',
    'Chennakeshava Temple',
    'Look closely at Chennakeshava Temple (Star Platform). Notice its shape or historical purpose.',
    'The answer starts with C and has 20 letters: C _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Chennakeshava Temple (Star Platform) is a celebrated architectural marvel of Belur, standing for centuries as a testament to historical ingenuity.',
    'What geometrical shape is the platform of Belur temple?',
    '["Star Shaped (Stellate)","Circle","Triangle","Hexagon"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'BEL_002',
    'belur',
    2,
    'Darpana Sundari (The Mirror Maiden)',
    13.1627,
    75.8598,
    50,
    'Look carefully at Darpana Sundari (The Mirror Maiden). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the world-famous bracket figure of a maiden gazing into a handheld stone mirror. What is my name?',
    'Darpana Sundari',
    'Look closely at Darpana Sundari (The Mirror Maiden). Notice its shape or historical purpose.',
    'The answer starts with D and has 15 letters: D _ _ _ _ _ _ _ _ _ _ _ _ _ i',
    'Darpana Sundari (The Mirror Maiden) is a celebrated architectural marvel of Belur, standing for centuries as a testament to historical ingenuity.',
    'What is the lady holding in the Darpana Sundari sculpture?',
    '["A handheld mirror","A sword","A smartphone","A book"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'BEL_003',
    'belur',
    3,
    'Gravity Pillar (Mahasthambha)',
    13.1622,
    75.859,
    50,
    'Look carefully at Gravity Pillar (Mahasthambha). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a 42-foot tall pillar that balances purely on my own center of gravity without foundation. What am I?',
    'Gravity Pillar',
    'Look closely at Gravity Pillar (Mahasthambha). Notice its shape or historical purpose.',
    'The answer starts with G and has 14 letters: G _ _ _ _ _ _ _ _ _ _ _ _ r',
    'Gravity Pillar (Mahasthambha) is a celebrated architectural marvel of Belur, standing for centuries as a testament to historical ingenuity.',
    'What allows the Gravity Pillar to remain standing?',
    '["Perfect balance on its center of gravity","Iron glue","Steel chains","Balloons"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'BEL_004',
    'belur',
    4,
    'Madanikas Gallery (Dancing Maidens)',
    13.1628,
    75.8594,
    50,
    'Look carefully at Madanikas Gallery (Dancing Maidens). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'We are 42 celestial maidens carved from soapstone under the temple roof playing music and dancing. What are we?',
    'Madanikas',
    'Look closely at Madanikas Gallery (Dancing Maidens). Notice its shape or historical purpose.',
    'The answer starts with M and has 9 letters: M _ _ _ _ _ _ _ s',
    'Madanikas Gallery (Dancing Maidens) is a celebrated architectural marvel of Belur, standing for centuries as a testament to historical ingenuity.',
    'How many exterior Madanika figures adorn the temple?',
    '["42 Figures","2 Figures","10 Figures","500 Figures"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'BEL_005',
    'belur',
    5,
    'Kappe Chennigraya Shrine',
    13.163,
    75.86,
    50,
    'Look carefully at Kappe Chennigraya Shrine. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the secondary star-shaped shrine consecrated by the talented dancing Queen Shantala. What shrine am I?',
    'Kappe Chennigraya',
    'Look closely at Kappe Chennigraya Shrine. Notice its shape or historical purpose.',
    'The answer starts with K and has 17 letters: K _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ a',
    'Kappe Chennigraya Shrine is a celebrated architectural marvel of Belur, standing for centuries as a testament to historical ingenuity.',
    'What art form was Queen Shantala a master of?',
    '["Classical Dance (Bharatanatyam)","Archery","Rowing","Painting"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'BEL_006',
    'belur',
    6,
    'Temple Pushkarini (Stepped Tank)',
    13.1618,
    75.8585,
    50,
    'Look carefully at Temple Pushkarini (Stepped Tank). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the geometric stepped sacred pool where lotus flowers bloom and pilgrims cleanse. What am I?',
    'Pushkarini',
    'Look closely at Temple Pushkarini (Stepped Tank). Notice its shape or historical purpose.',
    'The answer starts with P and has 10 letters: P _ _ _ _ _ _ _ _ i',
    'Temple Pushkarini (Stepped Tank) is a celebrated architectural marvel of Belur, standing for centuries as a testament to historical ingenuity.',
    'What is the traditional name for a sacred stepped temple tank?',
    '["Pushkarini (or Kalyani)","Swimming Pool","Aquarium","Fountain"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Halebidu (Karnataka)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'halebidu',
    'Halebidu',
    'The Stone Story',
    'Karnataka',
    'Twin Hoysala Gem',
    '1121 CE (Hoysalas)',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    'Explore the twin temples of Hoysaleshwara adorned with over 20,000 carved figures depicting epics in stone.',
    'Explorer (Kids & Family)',
    '40 mins',
    6,
    13.2165,
    75.994
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'HAL_001',
    'halebidu',
    1,
    'Hoysaleshwara Temple',
    13.2165,
    75.994,
    50,
    'Look carefully at Hoysaleshwara Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a monumental twin temple with two identical sanctums on a star-shaped terrace. What temple am I?',
    'Hoysaleshwara Temple',
    'Look closely at Hoysaleshwara Temple. Notice its shape or historical purpose.',
    'The answer starts with H and has 20 letters: H _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Hoysaleshwara Temple is a celebrated architectural marvel of Halebidu, standing for centuries as a testament to historical ingenuity.',
    'What animal forms the bottom-most carved frieze around the base?',
    '["Marching Elephants","Flying Birds","Swimming Fish","Sleeping Cats"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'HAL_002',
    'halebidu',
    2,
    'Monolithic Nandi Mantapa',
    13.2168,
    75.9945,
    50,
    'Look carefully at Monolithic Nandi Mantapa. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a colossal monolithic bull carved from dark soapstone, polished to shine like glass. What sacred animal am I?',
    'Nandi',
    'Look closely at Monolithic Nandi Mantapa. Notice its shape or historical purpose.',
    'The answer starts with N and has 5 letters: N _ _ _ i',
    'Monolithic Nandi Mantapa is a celebrated architectural marvel of Halebidu, standing for centuries as a testament to historical ingenuity.',
    'What animal is the sacred Nandi that guards the Shiva temple?',
    '["A Sacred Bull","A Lion","An Elephant","A Peacock"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'HAL_003',
    'halebidu',
    3,
    'Garuda Pillar (Loyal Bodyguards)',
    13.216,
    75.9935,
    50,
    'Look carefully at Garuda Pillar (Loyal Bodyguards). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the hero pillar celebrating the supreme devotion of the elite Garuda bodyguards. What pillar am I?',
    'Garuda Pillar',
    'Look closely at Garuda Pillar (Loyal Bodyguards). Notice its shape or historical purpose.',
    'The answer starts with G and has 13 letters: G _ _ _ _ _ _ _ _ _ _ _ r',
    'Garuda Pillar (Loyal Bodyguards) is a celebrated architectural marvel of Halebidu, standing for centuries as a testament to historical ingenuity.',
    'What elite title was given to the king''s loyal bodyguard force?',
    '["The Garudas","The Ninjas","The Spartans","The Gladiators"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'HAL_004',
    'halebidu',
    4,
    'Outer Wall Mythological Friezes',
    13.2163,
    75.9942,
    50,
    'Look carefully at Outer Wall Mythological Friezes. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a continuous wall of stone carvings narrating the Mahabharata and Ramayana like an open comic book. What am I?',
    'Mythological Friezes',
    'Look closely at Outer Wall Mythological Friezes. Notice its shape or historical purpose.',
    'The answer starts with M and has 20 letters: M _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ s',
    'Outer Wall Mythological Friezes is a celebrated architectural marvel of Halebidu, standing for centuries as a testament to historical ingenuity.',
    'Which epic mountain is Ravana shown attempting to lift?',
    '["Mount Kailash","Mount Everest","Mount Fuji","Mount Kilimanjaro"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'HAL_005',
    'halebidu',
    5,
    'Dancing Ganesha Relief',
    13.2166,
    75.9938,
    50,
    'Look carefully at Dancing Ganesha Relief. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the elephant-headed god of wisdom shown dancing joyfully with a sweet in my trunk. Who am I?',
    'Dancing Ganesha',
    'Look closely at Dancing Ganesha Relief. Notice its shape or historical purpose.',
    'The answer starts with D and has 15 letters: D _ _ _ _ _ _ _ _ _ _ _ _ _ a',
    'Dancing Ganesha Relief is a celebrated architectural marvel of Halebidu, standing for centuries as a testament to historical ingenuity.',
    'What sweet treat is Lord Ganesha fond of holding in his trunk?',
    '["Modak (Sweet Ladoo)","Pizza","Chocolate","Ice Cream"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'HAL_006',
    'halebidu',
    6,
    'Kedareshwara Temple (Star Gem)',
    13.215,
    75.992,
    50,
    'Look carefully at Kedareshwara Temple (Star Gem). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a graceful three-shrine star-shaped temple standing peacefully by the lake. What temple am I?',
    'Kedareshwara Temple',
    'Look closely at Kedareshwara Temple (Star Gem). Notice its shape or historical purpose.',
    'The answer starts with K and has 19 letters: K _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Kedareshwara Temple (Star Gem) is a celebrated architectural marvel of Halebidu, standing for centuries as a testament to historical ingenuity.',
    'What was the original ancient name of Halebidu during the Hoysala era?',
    '["Dorasamudra","Bengaluru","Mumbai","Chennai"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Srirangapatna (Karnataka)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'srirangapatna',
    'Srirangapatna',
    'The Lost Messenger',
    'Karnataka',
    'River Island Fort',
    'Tipu Sultan & Vijayanagara (18th Century CE)',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    'Search for the coded missives of Tipu Sultan''s royal messenger across the fortified river island surrounded by the Kaveri River.',
    'Explorer (Kids & Family)',
    '40 mins',
    6,
    12.423,
    76.6935
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'SRI_001',
    'srirangapatna',
    1,
    'Ranganathaswamy Island Temple',
    12.423,
    76.6935,
    50,
    'Look carefully at Ranganathaswamy Island Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the ancient 9th-century temple dedicated to Lord Vishnu that gave this island its sacred name. What temple am I?',
    'Ranganathaswamy Temple',
    'Look closely at Ranganathaswamy Island Temple. Notice its shape or historical purpose.',
    'The answer starts with R and has 22 letters: R _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Ranganathaswamy Island Temple is a celebrated architectural marvel of Srirangapatna, standing for centuries as a testament to historical ingenuity.',
    'Which holy South Indian river completely encircles the island?',
    '["Kaveri River","Ganga River","Yamuna River","Indus River"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'SRI_002',
    'srirangapatna',
    2,
    'Dariya Daulat Bagh (Summer Palace)',
    12.418,
    76.696,
    50,
    'Look carefully at Dariya Daulat Bagh (Summer Palace). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'Built almost entirely from seasoned teakwood, my name means Wealth of the Sea. What palace am I?',
    'Dariya Daulat Bagh',
    'Look closely at Dariya Daulat Bagh (Summer Palace). Notice its shape or historical purpose.',
    'The answer starts with D and has 18 letters: D _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ h',
    'Dariya Daulat Bagh (Summer Palace) is a celebrated architectural marvel of Srirangapatna, standing for centuries as a testament to historical ingenuity.',
    'What natural wood material was primarily used to build this palace?',
    '["Seasoned Teakwood","Plastic","Concrete","Aluminum"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'SRI_003',
    'srirangapatna',
    3,
    'The Obelisk & Breach Point',
    12.426,
    76.688,
    50,
    'Look carefully at The Obelisk & Breach Point. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the stone monument marking where the fortress walls were breached during the historic 1799 battle. What am I?',
    'The Obelisk',
    'Look closely at The Obelisk & Breach Point. Notice its shape or historical purpose.',
    'The answer starts with T and has 11 letters: T _ _ _ _ _ _ _ _ _ k',
    'The Obelisk & Breach Point is a celebrated architectural marvel of Srirangapatna, standing for centuries as a testament to historical ingenuity.',
    'What fearsome animal moniker was Tipu Sultan known by?',
    '["The Tiger of Mysore","The Lion","The Eagle","The Shark"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'SRI_004',
    'srirangapatna',
    4,
    'Bailey''s Dungeon',
    12.4255,
    76.689,
    50,
    'Look carefully at Bailey''s Dungeon. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am an underground brick dungeon below water level where captured officers were imprisoned. What is my name?',
    'Bailey''s Dungeon',
    'Look closely at Bailey''s Dungeon. Notice its shape or historical purpose.',
    'The answer starts with B and has 16 letters: B _ _ _ _ _ _ _ _ _ _ _ _ _ _ n',
    'Bailey''s Dungeon is a celebrated architectural marvel of Srirangapatna, standing for centuries as a testament to historical ingenuity.',
    'Where is Bailey''s Dungeon situated within the island fortress?',
    '["Underground near the river wall","Atop a mountain","In a submarine","In a treehouse"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'SRI_005',
    'srirangapatna',
    5,
    'The Gumbaz Mausoleum',
    12.411,
    76.712,
    50,
    'Look carefully at The Gumbaz Mausoleum. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the grand domed tomb where Tipu Sultan and Hyder Ali rest in peace, with ivory-inlaid doors. What am I?',
    'The Gumbaz',
    'Look closely at The Gumbaz Mausoleum. Notice its shape or historical purpose.',
    'The answer starts with T and has 10 letters: T _ _ _ _ _ _ _ _ z',
    'The Gumbaz Mausoleum is a celebrated architectural marvel of Srirangapatna, standing for centuries as a testament to historical ingenuity.',
    'What material is inlaid into the dark rosewood doors of the Gumbaz?',
    '["Carved Ivory","Gold wire","Plastic beads","Glass marbles"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'SRI_006',
    'srirangapatna',
    6,
    'Sangama (Confluence of Rivers)',
    12.415,
    76.72,
    50,
    'Look carefully at Sangama (Confluence of Rivers). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the sacred point where two split branches of the Kaveri River join back together. What am I called?',
    'Sangama',
    'Look closely at Sangama (Confluence of Rivers). Notice its shape or historical purpose.',
    'The answer starts with S and has 7 letters: S _ _ _ _ _ a',
    'Sangama (Confluence of Rivers) is a celebrated architectural marvel of Srirangapatna, standing for centuries as a testament to historical ingenuity.',
    'What traditional round basket boat is used by locals on the Kaveri?',
    '["Coracle (Teppa)","Kayak","Gondola","Speedboat"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Shravanabelagola (Karnataka)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'shravanabelagola',
    'Shravanabelagola',
    'The Ancient Giant',
    'Karnataka',
    'Sacred Jain Center',
    '981 CE (Western Ganga Dynasty)',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    'Climb the 650 rock-cut steps of Vindhyagiri Hill to discover the 57-foot Gommateshwara statue—the world''s largest freestanding monolith!',
    'Explorer (Kids & Family)',
    '35 mins',
    5,
    12.853,
    76.484
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'SHR_001',
    'shravanabelagola',
    1,
    'Vindhyagiri Hill Steps',
    12.853,
    76.484,
    50,
    'Look carefully at Vindhyagiri Hill Steps. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a colossal granite hill with over 650 rock-cut steps leading up to the great statue. What hill am I?',
    'Vindhyagiri Hill',
    'Look closely at Vindhyagiri Hill Steps. Notice its shape or historical purpose.',
    'The answer starts with V and has 16 letters: V _ _ _ _ _ _ _ _ _ _ _ _ _ _ l',
    'Vindhyagiri Hill Steps is a celebrated architectural marvel of Shravanabelagola, standing for centuries as a testament to historical ingenuity.',
    'How many rock-cut steps lead to the summit of Vindhyagiri Hill?',
    '["Over 650 Steps","50 Steps","10 Steps","10,000 Steps"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'SHR_002',
    'shravanabelagola',
    2,
    'Gommateshwara (Lord Bahubali) Monolith',
    12.8535,
    76.4845,
    50,
    'Look carefully at Gommateshwara (Lord Bahubali) Monolith. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I stand 57 feet tall, carved from a single granite cliff without any joints. What famous statue am I?',
    'Gommateshwara',
    'Look closely at Gommateshwara (Lord Bahubali) Monolith. Notice its shape or historical purpose.',
    'The answer starts with G and has 13 letters: G _ _ _ _ _ _ _ _ _ _ _ a',
    'Gommateshwara (Lord Bahubali) Monolith is a celebrated architectural marvel of Shravanabelagola, standing for centuries as a testament to historical ingenuity.',
    'How tall is the monolithic Gommateshwara statue?',
    '["57 Feet (17.5 Metres)","10 Feet","200 Feet","1000 Feet"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'SHR_003',
    'shravanabelagola',
    3,
    'Chavundaraya Inscription at Feet',
    12.8536,
    76.4846,
    50,
    'Look carefully at Chavundaraya Inscription at Feet. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the ancient stone inscription identifying the Ganga general who commissioned the statue. What am I?',
    'Chavundaraya Inscription',
    'Look closely at Chavundaraya Inscription at Feet. Notice its shape or historical purpose.',
    'The answer starts with C and has 24 letters: C _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ n',
    'Chavundaraya Inscription at Feet is a celebrated architectural marvel of Shravanabelagola, standing for centuries as a testament to historical ingenuity.',
    'Which language''s earliest written literature is found on this rock?',
    '["Old Marathi Script","French","Russian","German"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'SHR_004',
    'shravanabelagola',
    4,
    'Chandragiri Hill & Bhadrabahu Cave',
    12.858,
    76.487,
    50,
    'Look carefully at Chandragiri Hill & Bhadrabahu Cave. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the northern hill where Emperor Chandragupta Maurya spent his final years in peace. What hill am I?',
    'Chandragiri Hill',
    'Look closely at Chandragiri Hill & Bhadrabahu Cave. Notice its shape or historical purpose.',
    'The answer starts with C and has 16 letters: C _ _ _ _ _ _ _ _ _ _ _ _ _ _ l',
    'Chandragiri Hill & Bhadrabahu Cave is a celebrated architectural marvel of Shravanabelagola, standing for centuries as a testament to historical ingenuity.',
    'Which famous emperor spent his final spiritual years on Chandragiri?',
    '["Emperor Chandragupta Maurya","Akbar","Alexander","Caesar"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'SHR_005',
    'shravanabelagola',
    5,
    'Kalyani Lake (The White Pond)',
    12.855,
    76.4855,
    50,
    'Look carefully at Kalyani Lake (The White Pond). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'My name translates to the White Pond of the Monks, giving this town its legendary name. What am I?',
    'Kalyani Lake',
    'Look closely at Kalyani Lake (The White Pond). Notice its shape or historical purpose.',
    'The answer starts with K and has 12 letters: K _ _ _ _ _ _ _ _ _ _ e',
    'Kalyani Lake (The White Pond) is a celebrated architectural marvel of Shravanabelagola, standing for centuries as a testament to historical ingenuity.',
    'What does the Kannada word Belagola literally mean?',
    '["White Pond","Red Mountain","Golden Tree","Blue Sky"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Amer Fort (Rajasthan)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'amer-fort',
    'Amer Fort',
    'The King''s Hidden Message',
    'Rajasthan',
    'Royal Hill Fortress',
    '1592 CE (Kachwaha Rajputs)',
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    'Climb the royal ramparts of Amer Fort and decode the hidden royal message inside the mirror palace.',
    'Explorer (Kids & Family)',
    '45 mins',
    7,
    26.9855,
    75.851
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AME_001',
    'amer-fort',
    1,
    'Suraj Pol (Sun Gate)',
    26.9855,
    75.851,
    50,
    'Look carefully at Suraj Pol (Sun Gate). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the grand eastern entrance where royal cavalry entered facing the morning sunrise. What gate am I?',
    'Suraj Pol',
    'Look closely at Suraj Pol (Sun Gate). Notice its shape or historical purpose.',
    'The answer starts with S and has 9 letters: S _ _ _ _ _ _ _ l',
    'Suraj Pol (Sun Gate) is a celebrated architectural marvel of Amer Fort, standing for centuries as a testament to historical ingenuity.',
    'Which direction does the Sun Gate face?',
    '["East towards the rising sun","West","North","South"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AME_002',
    'amer-fort',
    2,
    'Jaleb Chowk (Grand Courtyard)',
    26.9858,
    75.8515,
    50,
    'Look carefully at Jaleb Chowk (Grand Courtyard). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the vast courtyard where victorious soldiers assembled and horse parades were held. What chowk am I?',
    'Jaleb Chowk',
    'Look closely at Jaleb Chowk (Grand Courtyard). Notice its shape or historical purpose.',
    'The answer starts with J and has 11 letters: J _ _ _ _ _ _ _ _ _ k',
    'Jaleb Chowk (Grand Courtyard) is a celebrated architectural marvel of Amer Fort, standing for centuries as a testament to historical ingenuity.',
    'What took place in Jaleb Chowk?',
    '["Parades and soldier assemblies","Cooking food","Boat races","Swimming"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AME_003',
    'amer-fort',
    3,
    'Diwan-i-Aam (Hall of Public Audience)',
    26.9862,
    75.8518,
    50,
    'Look carefully at Diwan-i-Aam (Hall of Public Audience). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I have 27 pillars of red sandstone with marble elephant brackets where the King met subjects. What hall am I?',
    'Diwan-i-Aam',
    'Look closely at Diwan-i-Aam (Hall of Public Audience). Notice its shape or historical purpose.',
    'The answer starts with D and has 11 letters: D _ _ _ _ _ _ _ _ _ m',
    'Diwan-i-Aam (Hall of Public Audience) is a celebrated architectural marvel of Amer Fort, standing for centuries as a testament to historical ingenuity.',
    'How many ornate pillars support Diwan-i-Aam?',
    '["27 Pillars","4 Pillars","100 Pillars","10 Pillars"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AME_004',
    'amer-fort',
    4,
    'Ganesh Pol Gateway',
    26.9865,
    75.852,
    50,
    'Look carefully at Ganesh Pol Gateway. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the grand painted portal featuring delicate frescoes of Lord Ganesh leading to private palace suites. What gate am I?',
    'Ganesh Pol',
    'Look closely at Ganesh Pol Gateway. Notice its shape or historical purpose.',
    'The answer starts with G and has 10 letters: G _ _ _ _ _ _ _ _ l',
    'Ganesh Pol Gateway is a celebrated architectural marvel of Amer Fort, standing for centuries as a testament to historical ingenuity.',
    'Which deity is painted above the portal?',
    '["Lord Ganesh","Poseidon","Thor","Apollo"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AME_005',
    'amer-fort',
    5,
    'Sheesh Mahal (Hall of Mirrors)',
    26.9868,
    75.8524,
    50,
    'Look carefully at Sheesh Mahal (Hall of Mirrors). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'A single candle flickers inside me and reflects like thousands of twinkling stars across mirrors. What palace am I?',
    'Sheesh Mahal',
    'Look closely at Sheesh Mahal (Hall of Mirrors). Notice its shape or historical purpose.',
    'The answer starts with S and has 12 letters: S _ _ _ _ _ _ _ _ _ _ l',
    'Sheesh Mahal (Hall of Mirrors) is a celebrated architectural marvel of Amer Fort, standing for centuries as a testament to historical ingenuity.',
    'How many candles were needed to illuminate Sheesh Mahal?',
    '["A single candle","10,000 candles","500 candles","Electric lights"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AME_006',
    'amer-fort',
    6,
    'Sukh Niwas (Palace of Pleasure)',
    26.987,
    75.8528,
    50,
    'Look carefully at Sukh Niwas (Palace of Pleasure). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'Cool breezes blow over a cascading water channel inside my room to create natural air conditioning. What hall am I?',
    'Sukh Niwas',
    'Look closely at Sukh Niwas (Palace of Pleasure). Notice its shape or historical purpose.',
    'The answer starts with S and has 10 letters: S _ _ _ _ _ _ _ _ s',
    'Sukh Niwas (Palace of Pleasure) is a celebrated architectural marvel of Amer Fort, standing for centuries as a testament to historical ingenuity.',
    'How was Sukh Niwas kept cool in summer?',
    '["Water flowing through marble channels","Air conditioners","Fans","Open doors"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AME_007',
    'amer-fort',
    7,
    'Kesar Kyari (Saffron Garden in Lake)',
    26.984,
    75.8495,
    50,
    'Look carefully at Kesar Kyari (Saffron Garden in Lake). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a star-patterned floating garden in Maota Lake where kings planted fragrant saffron. What garden am I?',
    'Kesar Kyari',
    'Look closely at Kesar Kyari (Saffron Garden in Lake). Notice its shape or historical purpose.',
    'The answer starts with K and has 11 letters: K _ _ _ _ _ _ _ _ _ i',
    'Kesar Kyari (Saffron Garden in Lake) is a celebrated architectural marvel of Amer Fort, standing for centuries as a testament to historical ingenuity.',
    'What aromatic plant was cultivated in Kesar Kyari?',
    '["Saffron (Kesar)","Cactus","Pineapple","Watermelons"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Chittorgarh Fort (Rajasthan)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'chittorgarh-fort',
    'Chittorgarh Fort',
    'The Rajput Defender',
    'Rajasthan',
    'Hill Citadel',
    '7th - 16th Century CE (Sisodias)',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    'Discover the legendary fortress of Mewar and solve riddles across seven gates and majestic victory towers.',
    'Explorer (Kids & Family)',
    '50 mins',
    8,
    24.887,
    74.625
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_001',
    'chittorgarh-fort',
    1,
    'Padan Pol (First Fort Gate)',
    24.887,
    74.625,
    50,
    'Look carefully at Padan Pol (First Fort Gate). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the first of seven massive fortified iron-spiked gates ascending the rocky hill. What gate am I?',
    'Padan Pol',
    'Look closely at Padan Pol (First Fort Gate). Notice its shape or historical purpose.',
    'The answer starts with P and has 9 letters: P _ _ _ _ _ _ _ l',
    'Padan Pol (First Fort Gate) is a celebrated architectural marvel of Chittorgarh Fort, standing for centuries as a testament to historical ingenuity.',
    'How many fortified gates must be crossed to enter Chittorgarh?',
    '["7 Gates","1 Gate","3 Gates","12 Gates"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_002',
    'chittorgarh-fort',
    2,
    'Vijay Stambh (Tower of Victory)',
    24.8885,
    74.6265,
    50,
    'Look carefully at Vijay Stambh (Tower of Victory). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a 9-story, 122-foot high tower built by Rana Kumbha in 1448 to celebrate victory. What is my name?',
    'Vijay Stambh',
    'Look closely at Vijay Stambh (Tower of Victory). Notice its shape or historical purpose.',
    'The answer starts with V and has 12 letters: V _ _ _ _ _ _ _ _ _ _ h',
    'Vijay Stambh (Tower of Victory) is a celebrated architectural marvel of Chittorgarh Fort, standing for centuries as a testament to historical ingenuity.',
    'Who built the magnificent Tower of Victory?',
    '["Rana Kumbha","Alexander","Akbar","Shah Jahan"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_003',
    'chittorgarh-fort',
    3,
    'Kirti Stambh (Tower of Fame)',
    24.891,
    74.628,
    50,
    'Look carefully at Kirti Stambh (Tower of Fame). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a 7-story Solanki-style tower built in the 12th century dedicated to Adinatha. What tower am I?',
    'Kirti Stambh',
    'Look closely at Kirti Stambh (Tower of Fame). Notice its shape or historical purpose.',
    'The answer starts with K and has 12 letters: K _ _ _ _ _ _ _ _ _ _ h',
    'Kirti Stambh (Tower of Fame) is a celebrated architectural marvel of Chittorgarh Fort, standing for centuries as a testament to historical ingenuity.',
    'To whom is Kirti Stambh dedicated?',
    '["Rishabhanatha (Adinatha)","A king","A warrior","A merchant"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_004',
    'chittorgarh-fort',
    4,
    'Padmini Palace & Water Pavilion',
    24.885,
    74.624,
    50,
    'Look carefully at Padmini Palace & Water Pavilion. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a white three-story palace standing in the center of a lotus pool famous for the historic mirror story. What palace am I?',
    'Padmini Palace',
    'Look closely at Padmini Palace & Water Pavilion. Notice its shape or historical purpose.',
    'The answer starts with P and has 14 letters: P _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Padmini Palace & Water Pavilion is a celebrated architectural marvel of Chittorgarh Fort, standing for centuries as a testament to historical ingenuity.',
    'Where does the pavilion of Rani Padmini stand?',
    '["In the center of a water reservoir","Underground","In a tree","On a cloud"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_005',
    'chittorgarh-fort',
    5,
    'Gaumukh Reservoir (Cow''s Mouth Spring)',
    24.8875,
    74.6255,
    50,
    'Look carefully at Gaumukh Reservoir (Cow''s Mouth Spring). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'Pure spring water continuously pours from a carved rock shaped like a cow''s mouth into a pool. What is my name?',
    'Gaumukh Reservoir',
    'Look closely at Gaumukh Reservoir (Cow''s Mouth Spring). Notice its shape or historical purpose.',
    'The answer starts with G and has 17 letters: G _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ r',
    'Gaumukh Reservoir (Cow''s Mouth Spring) is a celebrated architectural marvel of Chittorgarh Fort, standing for centuries as a testament to historical ingenuity.',
    'From what carved shape does the natural spring water flow?',
    '["A carved cow''s mouth (Gau-mukh)","A dragon head","A pipe","A waterfall"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_006',
    'chittorgarh-fort',
    6,
    'Kumbha Palace Ruins',
    24.889,
    74.627,
    50,
    'Look carefully at Kumbha Palace Ruins. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the ancient palace where Maharana Pratap was born with secret underground escape tunnels. What palace am I?',
    'Kumbha Palace',
    'Look closely at Kumbha Palace Ruins. Notice its shape or historical purpose.',
    'The answer starts with K and has 13 letters: K _ _ _ _ _ _ _ _ _ _ _ e',
    'Kumbha Palace Ruins is a celebrated architectural marvel of Chittorgarh Fort, standing for centuries as a testament to historical ingenuity.',
    'Which legendary warrior king was born at Kumbha Palace?',
    '["Maharana Pratap","Rana Sanga","Rana Kumbha","Bappa Rawal"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_007',
    'chittorgarh-fort',
    7,
    'Meera Bai Temple',
    24.888,
    74.626,
    50,
    'Look carefully at Meera Bai Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the beautiful stone temple where the royal poet saint sang devotional songs to Lord Krishna. What temple am I?',
    'Meera Bai Temple',
    'Look closely at Meera Bai Temple. Notice its shape or historical purpose.',
    'The answer starts with M and has 16 letters: M _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Meera Bai Temple is a celebrated architectural marvel of Chittorgarh Fort, standing for centuries as a testament to historical ingenuity.',
    'Which deity did Saint Meera Bai sing devotional bhajans to?',
    '["Lord Krishna","Lord Shiva","Lord Brahma","Lord Indra"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'CHI_008',
    'chittorgarh-fort',
    8,
    'Suraj Gokhra (Sun Bastion View)',
    24.892,
    74.629,
    50,
    'Look carefully at Suraj Gokhra (Sun Bastion View). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the highest eastern bastion overlooking the plains where royal heralds greeted the morning sun. What bastion am I?',
    'Suraj Gokhra',
    'Look closely at Suraj Gokhra (Sun Bastion View). Notice its shape or historical purpose.',
    'The answer starts with S and has 12 letters: S _ _ _ _ _ _ _ _ _ _ a',
    'Suraj Gokhra (Sun Bastion View) is a celebrated architectural marvel of Chittorgarh Fort, standing for centuries as a testament to historical ingenuity.',
    'What title was Chittorgarh Fort proudly known by across India?',
    '["The Pride of Rajasthan","The Golden City","The Pink City","The Lake City"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Jaisalmer Fort (Rajasthan)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'jaisalmer-fort',
    'Jaisalmer Fort',
    'The Desert Treasure',
    'Rajasthan',
    'Living Golden Fort',
    '1156 CE (Bhati Rajputs)',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    'Venture inside the Sonar Qila (Golden Fort) rising like a sandcastle from the heart of the Thar Desert.',
    'Explorer (Kids & Family)',
    '45 mins',
    7,
    26.9125,
    70.912
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'JAI_001',
    'jaisalmer-fort',
    1,
    'Akhai Pol (First Golden Gate)',
    26.9125,
    70.912,
    50,
    'Look carefully at Akhai Pol (First Golden Gate). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the outermost royal gate of the Golden Fort carved from yellow sandstone. What gate am I?',
    'Akhai Pol',
    'Look closely at Akhai Pol (First Golden Gate). Notice its shape or historical purpose.',
    'The answer starts with A and has 9 letters: A _ _ _ _ _ _ _ l',
    'Akhai Pol (First Golden Gate) is a celebrated architectural marvel of Jaisalmer Fort, standing for centuries as a testament to historical ingenuity.',
    'What glowing color does the sandstone fort turn at sunset?',
    '["Golden Yellow","Bright Purple","Emerald Green","Pitch Black"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'JAI_002',
    'jaisalmer-fort',
    2,
    'Dussehra Chowk (Palace Square)',
    26.913,
    70.9125,
    50,
    'Look carefully at Dussehra Chowk (Palace Square). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the central palace square where royal coronation ceremonies and Dasara celebrations take place. What square am I?',
    'Dussehra Chowk',
    'Look closely at Dussehra Chowk (Palace Square). Notice its shape or historical purpose.',
    'The answer starts with D and has 14 letters: D _ _ _ _ _ _ _ _ _ _ _ _ k',
    'Dussehra Chowk (Palace Square) is a celebrated architectural marvel of Jaisalmer Fort, standing for centuries as a testament to historical ingenuity.',
    'What shape is the marble throne in Dussehra Chowk?',
    '["Circular marble seat","Square bed","Triangle chair","Couch"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'JAI_003',
    'jaisalmer-fort',
    3,
    'Raj Mahal (Maharawal Palace)',
    26.9135,
    70.913,
    50,
    'Look carefully at Raj Mahal (Maharawal Palace). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a seven-story palace with delicate stone jharokhas rising above the fort ramparts. What palace am I?',
    'Raj Mahal',
    'Look closely at Raj Mahal (Maharawal Palace). Notice its shape or historical purpose.',
    'The answer starts with R and has 9 letters: R _ _ _ _ _ _ _ l',
    'Raj Mahal (Maharawal Palace) is a celebrated architectural marvel of Jaisalmer Fort, standing for centuries as a testament to historical ingenuity.',
    'What are delicately carved stone overhanging balconies called?',
    '["Jharokhas","Windows","Chimneys","Shutters"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'JAI_004',
    'jaisalmer-fort',
    4,
    'Laxminath Temple',
    26.914,
    70.9135,
    50,
    'Look carefully at Laxminath Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the oldest Hindu temple inside the fort dedicated to Vishnu and Lakshmi with silver doors. What temple am I?',
    'Laxminath Temple',
    'Look closely at Laxminath Temple. Notice its shape or historical purpose.',
    'The answer starts with L and has 16 letters: L _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Laxminath Temple is a celebrated architectural marvel of Jaisalmer Fort, standing for centuries as a testament to historical ingenuity.',
    'To which divine couple is Laxminath Temple dedicated?',
    '["Lord Vishnu and Goddess Lakshmi","Shiva and Parvati","Rama and Sita","Brahma and Saraswati"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'JAI_005',
    'jaisalmer-fort',
    5,
    'Parsvanatha Jain Temple',
    26.9145,
    70.914,
    50,
    'Look carefully at Parsvanatha Jain Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am carved with such delicate yellow sandstone filigree that my stone looks like carved lace. What temple am I?',
    'Parsvanatha Temple',
    'Look closely at Parsvanatha Jain Temple. Notice its shape or historical purpose.',
    'The answer starts with P and has 18 letters: P _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Parsvanatha Jain Temple is a celebrated architectural marvel of Jaisalmer Fort, standing for centuries as a testament to historical ingenuity.',
    'What material was carved so delicately to resemble lace?',
    '["Yellow Sandstone","Wood","Plastic","Clay"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'JAI_006',
    'jaisalmer-fort',
    6,
    'Cannon Point Bastion',
    26.915,
    70.9145,
    50,
    'Look carefully at Cannon Point Bastion. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the round bastion with ancient cannons offering a 360-degree view of the Thar Desert. What am I?',
    'Cannon Point',
    'Look closely at Cannon Point Bastion. Notice its shape or historical purpose.',
    'The answer starts with C and has 12 letters: C _ _ _ _ _ _ _ _ _ _ t',
    'Cannon Point Bastion is a celebrated architectural marvel of Jaisalmer Fort, standing for centuries as a testament to historical ingenuity.',
    'Which great desert surrounds the golden fort of Jaisalmer?',
    '["The Thar Desert","The Sahara Desert","The Gobi Desert","The Kalahari Desert"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'JAI_007',
    'jaisalmer-fort',
    7,
    'Desert Haveli Balcony',
    26.9155,
    70.915,
    50,
    'Look carefully at Desert Haveli Balcony. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a famous multi-story merchant mansion with 66 stone lattice jharokha balconies. What am I called?',
    'Patwon Ki Haveli',
    'Look closely at Desert Haveli Balcony. Notice its shape or historical purpose.',
    'The answer starts with P and has 16 letters: P _ _ _ _ _ _ _ _ _ _ _ _ _ _ i',
    'Desert Haveli Balcony is a celebrated architectural marvel of Jaisalmer Fort, standing for centuries as a testament to historical ingenuity.',
    'What makes Jaisalmer Fort unique in India today?',
    '["It is a living fort with 4,000 residents living inside","It is underwater","It is made of gold metal","It flies in air"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Ajanta Caves (Maharashtra)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'ajanta-caves',
    'Ajanta Caves',
    'The Painter''s Secret',
    'Maharashtra',
    'Rock-Cut Cave Paintings',
    '2nd Century BCE - 5th Century CE',
    'https://images.unsplash.com/photo-1600100397608-f010f443b74d?auto=format&fit=crop&w=1200&q=80',
    'Discover ancient Buddhist fresco masterpieces painted with mineral pigments in horseshoe cliffside caves.',
    'Explorer (Kids & Family)',
    '40 mins',
    6,
    20.552,
    75.703
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AJA_001',
    'ajanta-caves',
    1,
    'Cave 1: Bodhisattva Padmapani',
    20.552,
    75.703,
    50,
    'Look carefully at Cave 1: Bodhisattva Padmapani. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the world-famous fresco painting of the Bodhisattva holding a blue lotus with gentle eyes. Who am I?',
    'Padmapani',
    'Look closely at Cave 1: Bodhisattva Padmapani. Notice its shape or historical purpose.',
    'The answer starts with P and has 9 letters: P _ _ _ _ _ _ _ i',
    'Cave 1: Bodhisattva Padmapani is a celebrated architectural marvel of Ajanta Caves, standing for centuries as a testament to historical ingenuity.',
    'What sacred flower does Bodhisattva Padmapani hold?',
    '["A Blue Lotus (Padma)","A Rose","A Sunflower","A Tulip"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AJA_002',
    'ajanta-caves',
    2,
    'Cave 2: Thousand Buddhas Ceiling',
    20.5525,
    75.7035,
    50,
    'Look carefully at Cave 2: Thousand Buddhas Ceiling. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'My ceiling is painted with concentric mandala designs and hundreds of miniature Buddha figures. What cave am I?',
    'Cave 2',
    'Look closely at Cave 2: Thousand Buddhas Ceiling. Notice its shape or historical purpose.',
    'The answer starts with C and has 6 letters: C _ _ _ _ 2',
    'Cave 2: Thousand Buddhas Ceiling is a celebrated architectural marvel of Ajanta Caves, standing for centuries as a testament to historical ingenuity.',
    'What geometric design decorates the ceiling of Cave 2?',
    '["Mandala floral panels","Stripes","Polka dots","Checkerboard"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AJA_003',
    'ajanta-caves',
    3,
    'Cave 9: Chaitya Prayer Hall',
    20.553,
    75.704,
    50,
    'Look carefully at Cave 9: Chaitya Prayer Hall. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am an ancient horseshoe-arched prayer hall with a monolithic stupa carved in the 1st century BCE. What hall am I?',
    'Chaitya Hall',
    'Look closely at Cave 9: Chaitya Prayer Hall. Notice its shape or historical purpose.',
    'The answer starts with C and has 12 letters: C _ _ _ _ _ _ _ _ _ _ l',
    'Cave 9: Chaitya Prayer Hall is a celebrated architectural marvel of Ajanta Caves, standing for centuries as a testament to historical ingenuity.',
    'What is the purpose of a Buddhist Chaitya hall?',
    '["A prayer and meditation sanctuary","A dining room","A stable","A kitchen"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AJA_004',
    'ajanta-caves',
    4,
    'Cave 10: 1819 Discovery Inscription',
    20.5535,
    75.7045,
    50,
    'Look carefully at Cave 10: 1819 Discovery Inscription. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'British officer John Smith carved his name on my pillar while tiger hunting in 1819, rediscovering Ajanta! What cave am I?',
    'Cave 10',
    'Look closely at Cave 10: 1819 Discovery Inscription. Notice its shape or historical purpose.',
    'The answer starts with C and has 7 letters: C _ _ _ _ _ 0',
    'Cave 10: 1819 Discovery Inscription is a celebrated architectural marvel of Ajanta Caves, standing for centuries as a testament to historical ingenuity.',
    'In what year were the Ajanta Caves rediscovered by John Smith?',
    '["1819 CE","1999 CE","1492 CE","1776 CE"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AJA_005',
    'ajanta-caves',
    5,
    'Cave 19: Sculptured Chaitya Facade',
    20.554,
    75.705,
    50,
    'Look carefully at Cave 19: Sculptured Chaitya Facade. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I have an elaborate stone facade carved with standing Buddha figures and a grand horseshoe sun-window. What cave am I?',
    'Cave 19',
    'Look closely at Cave 19: Sculptured Chaitya Facade. Notice its shape or historical purpose.',
    'The answer starts with C and has 7 letters: C _ _ _ _ _ 9',
    'Cave 19: Sculptured Chaitya Facade is a celebrated architectural marvel of Ajanta Caves, standing for centuries as a testament to historical ingenuity.',
    'What window shape illuminates the interior of Cave 19?',
    '["Horseshoe Sun Window (Chandrashala)","Triangle","Square","Hexagon"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AJA_006',
    'ajanta-caves',
    6,
    'Cave 26: The Reclining Buddha',
    20.5545,
    75.7055,
    50,
    'Look carefully at Cave 26: The Reclining Buddha. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I feature a colossal 24-foot long rock-cut statue of the Buddha entering final Nirvana. What sculpture am I?',
    'Reclining Buddha',
    'Look closely at Cave 26: The Reclining Buddha. Notice its shape or historical purpose.',
    'The answer starts with R and has 16 letters: R _ _ _ _ _ _ _ _ _ _ _ _ _ _ a',
    'Cave 26: The Reclining Buddha is a celebrated architectural marvel of Ajanta Caves, standing for centuries as a testament to historical ingenuity.',
    'How long is the Reclining Buddha sculpture in Cave 26?',
    '["24 Feet (7.3 Metres)","5 Feet","100 Feet","500 Feet"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Ellora Caves (Maharashtra)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'ellora-caves',
    'Ellora Caves',
    'The Three Faiths Mystery',
    'Maharashtra',
    'Monolithic Rock Architecture',
    '6th - 10th Century CE (Rashtrakutas)',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    'Marvel at Kailasa Temple and 34 rock-cut sanctuaries uniting Hindu, Buddhist, and Jain traditions.',
    'Explorer (Kids & Family)',
    '45 mins',
    7,
    20.026,
    75.178
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'ELL_001',
    'ellora-caves',
    1,
    'Cave 10: Vishwakarma (Carpenter''s Cave)',
    20.026,
    75.178,
    50,
    'Look carefully at Cave 10: Vishwakarma (Carpenter''s Cave). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'My rock ceiling is carved with stone ribs to look like wooden carpentry beams. What cave am I?',
    'Vishwakarma Cave',
    'Look closely at Cave 10: Vishwakarma (Carpenter''s Cave). Notice its shape or historical purpose.',
    'The answer starts with V and has 16 letters: V _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Cave 10: Vishwakarma (Carpenter''s Cave) is a celebrated architectural marvel of Ellora Caves, standing for centuries as a testament to historical ingenuity.',
    'Why is Cave 10 called the Carpenter''s Cave?',
    '["The stone ceiling looks like wooden beams","Carpenters lived here","It made tables","It had trees"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'ELL_002',
    'ellora-caves',
    2,
    'Cave 15: Dashavatara Cave',
    20.0265,
    75.1785,
    50,
    'Look carefully at Cave 15: Dashavatara Cave. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a two-story cave temple depicting the ten avatars of Lord Vishnu bursting from stone pillars. What cave am I?',
    'Dashavatara Cave',
    'Look closely at Cave 15: Dashavatara Cave. Notice its shape or historical purpose.',
    'The answer starts with D and has 16 letters: D _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Cave 15: Dashavatara Cave is a celebrated architectural marvel of Ellora Caves, standing for centuries as a testament to historical ingenuity.',
    'How many avatars of Lord Vishnu are celebrated here?',
    '["10 Avatars","4 Avatars","100 Avatars","2 Avatars"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'ELL_003',
    'ellora-caves',
    3,
    'Cave 16: Kailasa Temple (The Monolith)',
    20.027,
    75.179,
    50,
    'Look carefully at Cave 16: Kailasa Temple (The Monolith). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the world''s largest single rock-cut monument, carved top-to-bottom from a single mountain cliff! What temple am I?',
    'Kailasa Temple',
    'Look closely at Cave 16: Kailasa Temple (The Monolith). Notice its shape or historical purpose.',
    'The answer starts with K and has 14 letters: K _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Cave 16: Kailasa Temple (The Monolith) is a celebrated architectural marvel of Ellora Caves, standing for centuries as a testament to historical ingenuity.',
    'How was the monumental Kailasa Temple carved?',
    '["Top-to-bottom out of a single rock mountain","Assembled with bricks","Built with cement","Imported from Rome"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'ELL_004',
    'ellora-caves',
    4,
    'Cave 16: Elephant Courtyard',
    20.0272,
    75.1792,
    50,
    'Look carefully at Cave 16: Elephant Courtyard. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'Two life-sized monolithic elephants and 100-foot victory pillars stand in my open courtyard. What are we?',
    'Monolithic Elephants',
    'Look closely at Cave 16: Elephant Courtyard. Notice its shape or historical purpose.',
    'The answer starts with M and has 20 letters: M _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ s',
    'Cave 16: Elephant Courtyard is a celebrated architectural marvel of Ellora Caves, standing for centuries as a testament to historical ingenuity.',
    'What sentinel animal statues guard the court of Kailasa Temple?',
    '["Life-sized monolithic elephants","Giraffes","Kangaroos","Penguins"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'ELL_005',
    'ellora-caves',
    5,
    'Cave 21: Rameshwara Cave',
    20.0278,
    75.1798,
    50,
    'Look carefully at Cave 21: Rameshwara Cave. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I feature graceful sculptures of river goddesses Ganga on a crocodile and Yamuna on a tortoise. What cave am I?',
    'Rameshwara Cave',
    'Look closely at Cave 21: Rameshwara Cave. Notice its shape or historical purpose.',
    'The answer starts with R and has 15 letters: R _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Cave 21: Rameshwara Cave is a celebrated architectural marvel of Ellora Caves, standing for centuries as a testament to historical ingenuity.',
    'Which sacred river goddess is depicted standing on a crocodile?',
    '["Goddess Ganga","Goddess Nile","Goddess Amazon","Goddess Thames"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'ELL_006',
    'ellora-caves',
    6,
    'Cave 29: Dhumar Lena (Waterfall Cave)',
    20.0285,
    75.1805,
    50,
    'Look carefully at Cave 29: Dhumar Lena (Waterfall Cave). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a colossal cave carved beside a natural cascading waterfall with 26 massive pillars. What cave am I?',
    'Dhumar Lena',
    'Look closely at Cave 29: Dhumar Lena (Waterfall Cave). Notice its shape or historical purpose.',
    'The answer starts with D and has 11 letters: D _ _ _ _ _ _ _ _ _ a',
    'Cave 29: Dhumar Lena (Waterfall Cave) is a celebrated architectural marvel of Ellora Caves, standing for centuries as a testament to historical ingenuity.',
    'What natural scenic feature cascades right beside Cave 29 in monsoon?',
    '["A natural waterfall","A volcano","A glacier","A sand dune"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'ELL_007',
    'ellora-caves',
    7,
    'Cave 32: Indra Sabha (Jain Hall)',
    20.0295,
    75.1815,
    50,
    'Look carefully at Cave 32: Indra Sabha (Jain Hall). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a two-story Jain rock temple adorned with intricate lotus ceiling carvings and a monolithic shrine. What cave am I?',
    'Indra Sabha',
    'Look closely at Cave 32: Indra Sabha (Jain Hall). Notice its shape or historical purpose.',
    'The answer starts with I and has 11 letters: I _ _ _ _ _ _ _ _ _ a',
    'Cave 32: Indra Sabha (Jain Hall) is a celebrated architectural marvel of Ellora Caves, standing for centuries as a testament to historical ingenuity.',
    'What three great faiths coexist side-by-side at Ellora?',
    '["Buddhism, Hinduism, and Jainism","Greek, Roman, and Norse","Egyptian, Aztec, and Incan","None"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Mahabalipuram (Tamil Nadu)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'mahabalipuram',
    'Mahabalipuram',
    'The Stone Carver''s Challenge',
    'Tamil Nadu',
    'Pallava Shore Monuments',
    '7th - 8th Century CE (Pallavas)',
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    'Explore UNESCO seaside monolithic temples, balancing rock wonders, and open-air bas-relief carvings by the Bay of Bengal.',
    'Explorer (Kids & Family)',
    '40 mins',
    6,
    12.6165,
    80.198
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'MAH_001',
    'mahabalipuram',
    1,
    'Shore Temple (Facing the Bay)',
    12.6165,
    80.198,
    50,
    'Look carefully at Shore Temple (Facing the Bay). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am an 8th-century granite temple standing right on the beach where ocean waves lap against my base. What temple am I?',
    'Shore Temple',
    'Look closely at Shore Temple (Facing the Bay). Notice its shape or historical purpose.',
    'The answer starts with S and has 12 letters: S _ _ _ _ _ _ _ _ _ _ e',
    'Shore Temple (Facing the Bay) is a celebrated architectural marvel of Mahabalipuram, standing for centuries as a testament to historical ingenuity.',
    'Which body of water does Shore Temple overlook?',
    '["The Bay of Bengal","The Arctic Ocean","The Red Sea","The Pacific Ocean"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'MAH_002',
    'mahabalipuram',
    2,
    'Arjuna''s Penance / Descent of the Ganges',
    12.6175,
    80.193,
    50,
    'Look carefully at Arjuna''s Penance / Descent of the Ganges. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the world''s largest open-air rock relief, carved on two giant boulders showing elephants and gods. What am I?',
    'Arjuna''s Penance',
    'Look closely at Arjuna''s Penance / Descent of the Ganges. Notice its shape or historical purpose.',
    'The answer starts with A and has 16 letters: A _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Arjuna''s Penance / Descent of the Ganges is a celebrated architectural marvel of Mahabalipuram, standing for centuries as a testament to historical ingenuity.',
    'What is Arjuna''s Penance famous for?',
    '["World''s largest open-air rock relief carving","Tallest skyscraper","Deepest ocean well","Longest railway"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'MAH_003',
    'mahabalipuram',
    3,
    'Krishna''s Butterball',
    12.6185,
    80.1925,
    50,
    'Look carefully at Krishna''s Butterball. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a 250-ton giant granite boulder resting precariously balanced on a 45-degree smooth rock slope! What am I called?',
    'Krishna''s Butterball',
    'Look closely at Krishna''s Butterball. Notice its shape or historical purpose.',
    'The answer starts with K and has 20 letters: K _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ l',
    'Krishna''s Butterball is a celebrated architectural marvel of Mahabalipuram, standing for centuries as a testament to historical ingenuity.',
    'How much does the giant balancing boulder weigh?',
    '["Approximately 250 Tons","5 Kilograms","10 Pounds","50 Grams"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'MAH_004',
    'mahabalipuram',
    4,
    'Pancha Rathas (Five Chariots)',
    12.613,
    80.1915,
    50,
    'Look carefully at Pancha Rathas (Five Chariots). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'We are five monolithic stone temples carved from single granite outcrops named after the Pandavas. What are we?',
    'Pancha Rathas',
    'Look closely at Pancha Rathas (Five Chariots). Notice its shape or historical purpose.',
    'The answer starts with P and has 13 letters: P _ _ _ _ _ _ _ _ _ _ _ s',
    'Pancha Rathas (Five Chariots) is a celebrated architectural marvel of Mahabalipuram, standing for centuries as a testament to historical ingenuity.',
    'How many monolithic chariots make up Pancha Rathas?',
    '["5 Monolithic Rathas","2 Rathas","20 Rathas","100 Rathas"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'MAH_005',
    'mahabalipuram',
    5,
    'Varaha Cave Temple',
    12.617,
    80.192,
    50,
    'Look carefully at Varaha Cave Temple. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I feature a dramatic rock-cut panel showing Lord Vishnu as the giant boar Varaha rescuing Mother Earth. What cave am I?',
    'Varaha Cave',
    'Look closely at Varaha Cave Temple. Notice its shape or historical purpose.',
    'The answer starts with V and has 11 letters: V _ _ _ _ _ _ _ _ _ e',
    'Varaha Cave Temple is a celebrated architectural marvel of Mahabalipuram, standing for centuries as a testament to historical ingenuity.',
    'Which avatar of Vishnu is shown lifting Mother Earth?',
    '["Varaha (The Boar)","Matsya (The Fish)","Kurma (The Turtle)","Kalki"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'MAH_006',
    'mahabalipuram',
    6,
    'Mahishamardini Cave',
    12.616,
    80.191,
    50,
    'Look carefully at Mahishamardini Cave. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I feature the dynamic masterpiece relief of Goddess Durga riding her lion to defeat the buffalo demon. What cave am I?',
    'Mahishamardini Cave',
    'Look closely at Mahishamardini Cave. Notice its shape or historical purpose.',
    'The answer starts with M and has 19 letters: M _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Mahishamardini Cave is a celebrated architectural marvel of Mahabalipuram, standing for centuries as a testament to historical ingenuity.',
    'Which animal does Goddess Durga ride into battle?',
    '["A Royal Lion","A Horse","A Camel","An Elephant"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Konark Sun Temple (Odisha)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'konark-sun-temple',
    'Konark Sun Temple',
    'The Mystery of the Stone Chariot',
    'Odisha',
    'Black Pagoda Sun Temple',
    '1250 CE (Eastern Ganga Dynasty)',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    'Discover the monumental Sun Chariot temple adorned with 24 giant stone sundials and dance halls by the Odisha coast.',
    'Explorer (Kids & Family)',
    '40 mins',
    6,
    19.8875,
    86.0945
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'KON_001',
    'konark-sun-temple',
    1,
    'Natya Mandap (Dance Hall)',
    19.8875,
    86.0945,
    50,
    'Look carefully at Natya Mandap (Dance Hall). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the open dancing hall where 128 classical Odissi dance postures are carved into stone pillars. What hall am I?',
    'Natya Mandap',
    'Look closely at Natya Mandap (Dance Hall). Notice its shape or historical purpose.',
    'The answer starts with N and has 12 letters: N _ _ _ _ _ _ _ _ _ _ p',
    'Natya Mandap (Dance Hall) is a celebrated architectural marvel of Konark Sun Temple, standing for centuries as a testament to historical ingenuity.',
    'What classical Indian dance tradition is carved here?',
    '["Odissi Dance","Flamenco","Ballet","Salsa"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'KON_002',
    'konark-sun-temple',
    2,
    'Jagamohana (Great Assembly Hall)',
    19.8878,
    86.095,
    50,
    'Look carefully at Jagamohana (Great Assembly Hall). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the massive pyramidal sandstone assembly hall crowned with stepping tiers that still stands tall today. What hall am I?',
    'Jagamohana',
    'Look closely at Jagamohana (Great Assembly Hall). Notice its shape or historical purpose.',
    'The answer starts with J and has 10 letters: J _ _ _ _ _ _ _ _ a',
    'Jagamohana (Great Assembly Hall) is a celebrated architectural marvel of Konark Sun Temple, standing for centuries as a testament to historical ingenuity.',
    'What material was primarily used to build the Sun Temple?',
    '["Khondalite and Chlorite Sandstone","Plastic","Glass","Wood"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'KON_003',
    'konark-sun-temple',
    3,
    'The 24 Sun Wheels (Sundials)',
    19.888,
    86.0955,
    50,
    'Look carefully at The 24 Sun Wheels (Sundials). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'We are 24 carved stone wheels that function as precise scientific sundials calculating time to the minute! What are we?',
    'Sun Wheels',
    'Look closely at The 24 Sun Wheels (Sundials). Notice its shape or historical purpose.',
    'The answer starts with S and has 10 letters: S _ _ _ _ _ _ _ _ s',
    'The 24 Sun Wheels (Sundials) is a celebrated architectural marvel of Konark Sun Temple, standing for centuries as a testament to historical ingenuity.',
    'How many stone wheels surround the base of Konark?',
    '["24 Wheels (12 pairs)","4 Wheels","8 Wheels","100 Wheels"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'KON_004',
    'konark-sun-temple',
    4,
    'Colossal War Horses & Elephants',
    19.8885,
    86.096,
    50,
    'Look carefully at Colossal War Horses & Elephants. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'We are giant monolithic stone sculptures of rearing war horses trampling enemy soldiers at the gates. What are we?',
    'War Horses',
    'Look closely at Colossal War Horses & Elephants. Notice its shape or historical purpose.',
    'The answer starts with W and has 10 letters: W _ _ _ _ _ _ _ _ s',
    'Colossal War Horses & Elephants is a celebrated architectural marvel of Konark Sun Temple, standing for centuries as a testament to historical ingenuity.',
    'What do the two colossal war horse sculptures symbolize?',
    '["Military valor and dynamic energy","Speed of cars","Peaceful farming","Racing"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'KON_005',
    'konark-sun-temple',
    5,
    'Chlorite Surya Deva Statues',
    19.889,
    86.0965,
    50,
    'Look carefully at Chlorite Surya Deva Statues. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am carved from smooth green chlorite stone depicting the Sun God Surya wearing western boots. Who am I?',
    'Surya Deva',
    'Look closely at Chlorite Surya Deva Statues. Notice its shape or historical purpose.',
    'The answer starts with S and has 10 letters: S _ _ _ _ _ _ _ _ a',
    'Chlorite Surya Deva Statues is a celebrated architectural marvel of Konark Sun Temple, standing for centuries as a testament to historical ingenuity.',
    'What direction do the three Surya statues face?',
    '["East, South, and West","North only","Downwards","Inside floor"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'KON_006',
    'konark-sun-temple',
    6,
    'Chhaya Devi Temple & Ocean Coast',
    19.8895,
    86.097,
    50,
    'Look carefully at Chhaya Devi Temple & Ocean Coast. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the sanctuary dedicated to the wife of the Sun God standing amidst coastal casuarina groves. What temple am I?',
    'Chhaya Devi Temple',
    'Look closely at Chhaya Devi Temple & Ocean Coast. Notice its shape or historical purpose.',
    'The answer starts with C and has 18 letters: C _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Chhaya Devi Temple & Ocean Coast is a celebrated architectural marvel of Konark Sun Temple, standing for centuries as a testament to historical ingenuity.',
    'What nickname did European sailors give to Konark Sun Temple?',
    '["The Black Pagoda","The White Castle","The Golden Tower","The Green Dome"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Agra Fort (Uttar Pradesh)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'agra-fort',
    'Agra Fort',
    'The Mughal Messenger',
    'Uttar Pradesh',
    'Red Sandstone Imperial City',
    '1565 - 1638 CE (Mughal Empire)',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    'Enter the imperial walled city of red sandstone and white marble palaces overlooking the Taj Mahal along the Yamuna River.',
    'Explorer (Kids & Family)',
    '40 mins',
    6,
    27.178,
    78.0215
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AGR_001',
    'agra-fort',
    1,
    'Amar Singh Gate',
    27.178,
    78.0215,
    50,
    'Look carefully at Amar Singh Gate. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the grand red sandstone entrance fortified with a drawbridge and crooked passage to thwart attackers. What gate am I?',
    'Amar Singh Gate',
    'Look closely at Amar Singh Gate. Notice its shape or historical purpose.',
    'The answer starts with A and has 15 letters: A _ _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Amar Singh Gate is a celebrated architectural marvel of Agra Fort, standing for centuries as a testament to historical ingenuity.',
    'What stone gives Agra Fort its dramatic fiery red color?',
    '["Red Sandstone from Rajasthan","Red paint","Red bricks","Clay"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AGR_002',
    'agra-fort',
    2,
    'Jahangiri Mahal',
    27.1785,
    78.022,
    50,
    'Look carefully at Jahangiri Mahal. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'Built by Emperor Akbar for his son, I blend Hindu Gujarati carved brackets with Islamic archways. What palace am I?',
    'Jahangiri Mahal',
    'Look closely at Jahangiri Mahal. Notice its shape or historical purpose.',
    'The answer starts with J and has 15 letters: J _ _ _ _ _ _ _ _ _ _ _ _ _ l',
    'Jahangiri Mahal is a celebrated architectural marvel of Agra Fort, standing for centuries as a testament to historical ingenuity.',
    'Which Mughal Emperor constructed the Jahangiri Mahal?',
    '["Emperor Akbar","Emperor Babur","Emperor Humayun","Emperor Aurangzeb"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AGR_003',
    'agra-fort',
    3,
    'Khas Mahal (White Marble Pavilion)',
    27.179,
    78.023,
    50,
    'Look carefully at Khas Mahal (White Marble Pavilion). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am an elegant white marble palace overlooking the Anguri Bagh grape garden with brass-roofed pavilions. What palace am I?',
    'Khas Mahal',
    'Look closely at Khas Mahal (White Marble Pavilion). Notice its shape or historical purpose.',
    'The answer starts with K and has 10 letters: K _ _ _ _ _ _ _ _ l',
    'Khas Mahal (White Marble Pavilion) is a celebrated architectural marvel of Agra Fort, standing for centuries as a testament to historical ingenuity.',
    'What type of royal garden stretches in front of Khas Mahal?',
    '["Anguri Bagh (Grape Garden)","Cactus garden","Corn field","Tea estate"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AGR_004',
    'agra-fort',
    4,
    'Musamman Burj (Octagonal Tower)',
    27.1795,
    78.0235,
    50,
    'Look carefully at Musamman Burj (Octagonal Tower). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the octagonal marble tower with delicate jali screens where Emperor Shah Jahan gazed at the Taj Mahal. What tower am I?',
    'Musamman Burj',
    'Look closely at Musamman Burj (Octagonal Tower). Notice its shape or historical purpose.',
    'The answer starts with M and has 13 letters: M _ _ _ _ _ _ _ _ _ _ _ j',
    'Musamman Burj (Octagonal Tower) is a celebrated architectural marvel of Agra Fort, standing for centuries as a testament to historical ingenuity.',
    'Which world-famous monument can be viewed from Musamman Burj?',
    '["The Taj Mahal","The Eiffel Tower","The Colosseum","Big Ben"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AGR_005',
    'agra-fort',
    5,
    'Diwan-i-Khas & Black Marble Throne',
    27.18,
    78.024,
    50,
    'Look carefully at Diwan-i-Khas & Black Marble Throne. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the private council hall featuring Emperor Jahangir''s sleek black onyx marble throne on the terrace. What hall am I?',
    'Diwan-i-Khas',
    'Look closely at Diwan-i-Khas & Black Marble Throne. Notice its shape or historical purpose.',
    'The answer starts with D and has 12 letters: D _ _ _ _ _ _ _ _ _ _ s',
    'Diwan-i-Khas & Black Marble Throne is a celebrated architectural marvel of Agra Fort, standing for centuries as a testament to historical ingenuity.',
    'What rare dark stone was used to craft Jahangir''s throne?',
    '["Black Onyx Marble","Black plastic","Charcoal","Obsidian glass"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'AGR_006',
    'agra-fort',
    6,
    'Sheesh Mahal (Glass Dressing Palace)',
    27.1805,
    78.0245,
    50,
    'Look carefully at Sheesh Mahal (Glass Dressing Palace). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am an opulent dressing chamber inlaid with thousands of convex mirror pieces from Aleppo, Syria. What palace am I?',
    'Sheesh Mahal',
    'Look closely at Sheesh Mahal (Glass Dressing Palace). Notice its shape or historical purpose.',
    'The answer starts with S and has 12 letters: S _ _ _ _ _ _ _ _ _ _ l',
    'Sheesh Mahal (Glass Dressing Palace) is a celebrated architectural marvel of Agra Fort, standing for centuries as a testament to historical ingenuity.',
    'Which famous river flows right beneath the eastern walls of Agra Fort?',
    '["Yamuna River","Ganga River","Kaveri River","Narmada River"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Rani ki Vav (Gujarat)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'rani-ki-vav',
    'Rani ki Vav',
    'The Queen''s Hidden Stepwell',
    'Gujarat',
    'Inverted Stepwell Temple',
    '1063 CE (Solanki Dynasty)',
    'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    'Descend seven stories underground into the UNESCO Queen''s stepwell, designed as an inverted subterranean temple to water.',
    'Explorer (Kids & Family)',
    '40 mins',
    6,
    23.8585,
    72.1015
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'RAN_001',
    'rani-ki-vav',
    1,
    'First Tier Stepped Pavilion',
    23.8585,
    72.1015,
    50,
    'Look carefully at First Tier Stepped Pavilion. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a 7-story subterranean stepwell built upside down into the earth as an inverted temple to water. What am I?',
    'Rani ki Vav',
    'Look closely at First Tier Stepped Pavilion. Notice its shape or historical purpose.',
    'The answer starts with R and has 11 letters: R _ _ _ _ _ _ _ _ _ v',
    'First Tier Stepped Pavilion is a celebrated architectural marvel of Rani ki Vav, standing for centuries as a testament to historical ingenuity.',
    'Who commissioned this stepwell in memory of King Bhima I?',
    '["Queen Udayamati","Queen Victoria","Queen Noor Jahan","Queen Lakshmi"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'RAN_002',
    'rani-ki-vav',
    2,
    'Sheshashayi Vishnu on Serpent',
    23.8588,
    72.1018,
    50,
    'Look carefully at Sheshashayi Vishnu on Serpent. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a majestic carving on the lowest water level showing Lord Vishnu reclining on the thousand-headed serpent. Who am I?',
    'Sheshashayi Vishnu',
    'Look closely at Sheshashayi Vishnu on Serpent. Notice its shape or historical purpose.',
    'The answer starts with S and has 18 letters: S _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ u',
    'Sheshashayi Vishnu on Serpent is a celebrated architectural marvel of Rani ki Vav, standing for centuries as a testament to historical ingenuity.',
    'Which sacred serpent forms the couch for Lord Vishnu?',
    '["Sheshanaga (Adisesha)","Cobra","Python","Anaconda"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'RAN_003',
    'rani-ki-vav',
    3,
    'Dashavatara Sculptural Gallery',
    23.859,
    72.102,
    50,
    'Look carefully at Dashavatara Sculptural Gallery. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'We are stone panels along the stepped walls showing all ten incarnations of Vishnu including Rama and Krishna. What are we?',
    'Dashavatara Gallery',
    'Look closely at Dashavatara Sculptural Gallery. Notice its shape or historical purpose.',
    'The answer starts with D and has 19 letters: D _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ y',
    'Dashavatara Sculptural Gallery is a celebrated architectural marvel of Rani ki Vav, standing for centuries as a testament to historical ingenuity.',
    'Which Indian currency note features Rani ki Vav on its reverse side?',
    '["₹100 Note","₹10 Note","₹50 Note","₹500 Note"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'RAN_004',
    'rani-ki-vav',
    4,
    'Apsaras & Nagkanyas Pillars',
    23.8592,
    72.1022,
    50,
    'Look carefully at Apsaras & Nagkanyas Pillars. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'Over 500 principal sculptures of celestial maidens putting on makeup and styling hair adorn my pillars. What are we?',
    'Apsaras',
    'Look closely at Apsaras & Nagkanyas Pillars. Notice its shape or historical purpose.',
    'The answer starts with A and has 7 letters: A _ _ _ _ _ s',
    'Apsaras & Nagkanyas Pillars is a celebrated architectural marvel of Rani ki Vav, standing for centuries as a testament to historical ingenuity.',
    'Approximately how many major sculptures are carved in Rani ki Vav?',
    '["Over 500 major sculptures","50 sculptures","20 sculptures","None"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'RAN_005',
    'rani-ki-vav',
    5,
    'The Circular Water Shaft',
    23.8595,
    72.1025,
    50,
    'Look carefully at The Circular Water Shaft. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the deep circular well shaft at the western end where subterranean water gathered from the Saraswati river. What am I?',
    'The Well Shaft',
    'Look closely at The Circular Water Shaft. Notice its shape or historical purpose.',
    'The answer starts with T and has 14 letters: T _ _ _ _ _ _ _ _ _ _ _ _ t',
    'The Circular Water Shaft is a celebrated architectural marvel of Rani ki Vav, standing for centuries as a testament to historical ingenuity.',
    'Which sacred river supplied clean underground water to Rani ki Vav?',
    '["Saraswati River","Amazon River","Nile River","Mississippi River"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'RAN_006',
    'rani-ki-vav',
    6,
    'The Queen''s Secret Crypt',
    23.8598,
    72.1028,
    50,
    'Look carefully at The Queen''s Secret Crypt. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'At the lowest level beneath the steps lies a 30-km escape tunnel leading to the ancient town of Sidhpur. What have you solved?',
    'The Queen''s Secret',
    'Look closely at The Queen''s Secret Crypt. Notice its shape or historical purpose.',
    'The answer starts with T and has 18 letters: T _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ t',
    'The Queen''s Secret Crypt is a celebrated architectural marvel of Rani ki Vav, standing for centuries as a testament to historical ingenuity.',
    'In which year was Rani ki Vav inscribed as a UNESCO World Heritage Site?',
    '["2014 CE","1950 CE","1800 CE","2025 CE"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- Site: Golconda Fort (Telangana)
INSERT INTO heritage_sites (
    id, name, title, state, category, era, hero_image, description,
    difficulty, estimated_duration, total_checkpoints, latitude, longitude
) VALUES (
    'golconda-fort',
    'Golconda Fort',
    'The Sultan''s Secret',
    'Telangana',
    'Acoustic Diamond Citadel',
    '13th - 17th Century CE (Qutb Shahis)',
    'https://images.unsplash.com/photo-1600100397608-f010f443b74d?auto=format&fit=crop&w=1200&q=80',
    'Scale the acoustic citadel of Golconda where clapping whispers travel to mountain summits and diamonds were once stored.',
    'Explorer (Kids & Family)',
    '45 mins',
    7,
    17.3825,
    78.401
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    description = EXCLUDED.description;

INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'GOL_001',
    'golconda-fort',
    1,
    'Fateh Darwaza (Victory Gate)',
    17.3825,
    78.401,
    50,
    'Look carefully at Fateh Darwaza (Victory Gate). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the victory gate with iron spikes where a single clap at the entrance can be heard 1 km away at the top! What gate am I?',
    'Fateh Darwaza',
    'Look closely at Fateh Darwaza (Victory Gate). Notice its shape or historical purpose.',
    'The answer starts with F and has 13 letters: F _ _ _ _ _ _ _ _ _ _ _ a',
    'Fateh Darwaza (Victory Gate) is a celebrated architectural marvel of Golconda Fort, standing for centuries as a testament to historical ingenuity.',
    'What happens when someone claps hands under Fateh Darwaza dome?',
    '["The clap echoes clearly to the hilltop 1 km away","The lights turn on","A bell rings","Nothing"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'GOL_002',
    'golconda-fort',
    2,
    'Grand Portico Clapping Point',
    17.383,
    78.4015,
    50,
    'Look carefully at Grand Portico Clapping Point. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'Stand beneath the acoustic dome point. Clap hands to send sound waves traveling up the hillside! What is this called?',
    'Acoustic Warning System',
    'Look closely at Grand Portico Clapping Point. Notice its shape or historical purpose.',
    'The answer starts with A and has 23 letters: A _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ m',
    'Grand Portico Clapping Point is a celebrated architectural marvel of Golconda Fort, standing for centuries as a testament to historical ingenuity.',
    'Why was the acoustic clapping dome engineered into the fort?',
    '["To instantly warn guards at the hilltop of approaching invaders","For concerts","For rainmaking","For fun"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'GOL_003',
    'golconda-fort',
    3,
    'Balahisar Stone Steps',
    17.3835,
    78.402,
    50,
    'Look carefully at Balahisar Stone Steps. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'Climb the 360 rock-cut steps ascending past ancient arsenals, granaries, and boulders. How many steps lead to the top?',
    '360 Steps',
    'Look closely at Balahisar Stone Steps. Notice its shape or historical purpose.',
    'The answer starts with 3 and has 9 letters: 3 _ _ _ _ _ _ _ s',
    'Balahisar Stone Steps is a celebrated architectural marvel of Golconda Fort, standing for centuries as a testament to historical ingenuity.',
    'Approximately how many stone steps must you climb to reach the summit?',
    '["360 Steps","50 Steps","10 Steps","5,000 Steps"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'GOL_004',
    'golconda-fort',
    4,
    'Nagina Bagh (Royal Garden)',
    17.384,
    78.4025,
    50,
    'Look carefully at Nagina Bagh (Royal Garden). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the geometric pleasure garden located on an elevated terrace adorned with fountains. What garden am I?',
    'Nagina Bagh',
    'Look closely at Nagina Bagh (Royal Garden). Notice its shape or historical purpose.',
    'The answer starts with N and has 11 letters: N _ _ _ _ _ _ _ _ _ h',
    'Nagina Bagh (Royal Garden) is a celebrated architectural marvel of Golconda Fort, standing for centuries as a testament to historical ingenuity.',
    'What does the Persian word Nagina mean in Nagina Bagh?',
    '["Jewel / Gem","Flower","River","Bird"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'GOL_005',
    'golconda-fort',
    5,
    'Ibrahim Mosque',
    17.3845,
    78.403,
    50,
    'Look carefully at Ibrahim Mosque. Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am a graceful two-minaret mosque perched on a high granite boulder overlooking the twin cities. What mosque am I?',
    'Ibrahim Mosque',
    'Look closely at Ibrahim Mosque. Notice its shape or historical purpose.',
    'The answer starts with I and has 14 letters: I _ _ _ _ _ _ _ _ _ _ _ _ e',
    'Ibrahim Mosque is a celebrated architectural marvel of Golconda Fort, standing for centuries as a testament to historical ingenuity.',
    'Which Qutb Shahi Sultan built the mosque on the upper citadel?',
    '["Ibrahim Qutb Shah","Alexander","Babur","Akbar"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'GOL_006',
    'golconda-fort',
    6,
    'The Baradari (Summit Pavilion)',
    17.385,
    78.4035,
    50,
    'Look carefully at The Baradari (Summit Pavilion). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'I am the open-air pavilion at the highest point of Golconda with a 360-degree view of Hyderabad. What am I called?',
    'Baradari',
    'Look closely at The Baradari (Summit Pavilion). Notice its shape or historical purpose.',
    'The answer starts with B and has 8 letters: B _ _ _ _ _ _ i',
    'The Baradari (Summit Pavilion) is a celebrated architectural marvel of Golconda Fort, standing for centuries as a testament to historical ingenuity.',
    'What does the architectural term Baradari literally mean?',
    '["A pavilion with 12 doors (Bara-Dari)","A tall tower","A deep well","A stone bridge"]'::jsonb,
    0,
    50,
    100
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;
INSERT INTO checkpoints (
    id, site_id, sequence, landmark, latitude, longitude, radius,
    observation_task, riddle_text, riddle_answer, hint_1, hint_2,
    learn_fact, quiz_question, quiz_options, correct_option_index, points, xp
) VALUES (
    'GOL_007',
    'golconda-fort',
    7,
    'Royal Diamond Vault (Koh-i-Noor)',
    17.3855,
    78.404,
    50,
    'Look carefully at Royal Diamond Vault (Koh-i-Noor). Can you spot the unique carved features, architectural arches, or structural pillars?',
    'Deep in my reinforced stone vaults, legendary diamonds like the Koh-i-Noor were once stored! What treasure vault am I?',
    'Diamond Vault',
    'Look closely at Royal Diamond Vault (Koh-i-Noor). Notice its shape or historical purpose.',
    'The answer starts with D and has 13 letters: D _ _ _ _ _ _ _ _ _ _ _ t',
    'Royal Diamond Vault (Koh-i-Noor) is a celebrated architectural marvel of Golconda Fort, standing for centuries as a testament to historical ingenuity.',
    'Which world-famous legendary diamond was stored at Golconda?',
    '["The Koh-i-Noor Diamond","The Pink Panther","The Black Opal","The Golden Ring"]'::jsonb,
    0,
    100,
    200
) ON CONFLICT (id) DO UPDATE SET
    landmark = EXCLUDED.landmark,
    riddle_text = EXCLUDED.riddle_text;

-- ====================================================================
-- INITIAL SEED LEADERBOARD
-- ====================================================================
INSERT INTO leaderboard (explorer_name, state, title, score, badges_count, hunts_completed) VALUES
('Aarav Patil', 'Karnataka', 'Grand Heritage Master', 4820, 7, 8),
('Diya Rathore', 'Rajasthan', 'Royal Historian', 4250, 6, 7),
('Advait Deshmukh', 'Maharashtra', 'Royal Historian', 3680, 6, 6),
('Ananya Sundaram', 'Tamil Nadu', 'Temple Detective', 2940, 5, 5),
('Rohan Senapati', 'Odisha', 'Temple Detective', 2480, 4, 4),
('Meera Chundawat', 'Rajasthan', 'Riddle Master', 1950, 4, 3),
('Karthik Hegde', 'Karnataka', 'Riddle Master', 1620, 3, 3),
('Tanvi Reddy', 'Telangana', 'Heritage Seeker', 1240, 3, 2),
('Kabir Varma', 'Uttar Pradesh', 'Heritage Seeker', 980, 2, 2),
('Prisha Patel', 'Gujarat', 'Rookie Scout', 640, 2, 1);
