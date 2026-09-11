/**
 * SUPABASE CLOUD CLIENT & POSTGIS INTEGRATION
 * Configured with live Supabase credentials
 */

const SUPABASE_CONFIG = {
  url: 'https://afaoxwmipyyvhwjhuypn.supabase.co',
  anonKey: 'sb_publishable_OPDdUlTG5kvCVwTuY1UYqQ_09kKaxWS'
};

const CloudDB = {
  isConfigured() {
    return Boolean(
      SUPABASE_CONFIG.url &&
      SUPABASE_CONFIG.anonKey &&
      !SUPABASE_CONFIG.url.includes('your-project')
    );
  },

  /**
   * Fetch all heritage sites from Supabase (with fallback to local)
   */
  async getSites() {
    if (!this.isConfigured()) return HERITAGE_DATA;
    try {
      const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/heritage_sites?select=*`, {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) return data;
      }
    } catch (e) {
      console.warn('Using local heritage cache:', e);
    }
    return HERITAGE_DATA;
  },

  /**
   * Fetch nearby heritage sites using PostGIS RPC
   */
  async getNearbySites(lat, lng, radiusKm = 100) {
    if (!this.isConfigured()) return HERITAGE_DATA;

    try {
      const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/rpc/get_nearby_heritage_hunts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        },
        body: JSON.stringify({
          user_lat: lat,
          user_lng: lng,
          radius_km: radiusKm
        })
      });

      if (!response.ok) throw new Error('Spatial RPC query failed');
      return await response.json();
    } catch (err) {
      console.warn('Falling back to local data:', err);
      return HERITAGE_DATA;
    }
  },

  /**
   * Post completed hunt to Supabase Global Leaderboard
   */
  async submitLeaderboardEntry(entry) {
    if (!this.isConfigured()) return;

    try {
      const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/leaderboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          display_name: entry.displayName || 'Anonymous Explorer',
          site_id: entry.siteId,
          hunt_title: entry.huntTitle,
          score: entry.score,
          time_taken_seconds: entry.timeTakenSeconds || 1800
        })
      });
      if (response.ok) {
        console.log('✅ Leaderboard score synced with Supabase.');
      }
    } catch (err) {
      console.warn('Could not post to cloud leaderboard:', err);
    }
  },

  /**
   * Fetch live Global Leaderboard entries
   */
  async getLeaderboard() {
    if (!this.isConfigured()) return null;
    try {
      const response = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/leaderboard?select=*&order=score.desc,time_taken_seconds.asc&limit=10`, {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn('Could not fetch cloud leaderboard:', e);
    }
    return null;
  }
};

window.CloudDB = CloudDB;
