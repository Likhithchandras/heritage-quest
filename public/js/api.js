const API = {
  baseUrl: '/api',

  async getQuests() {
    try {
      const res = await fetch(`${this.baseUrl}/quests`);
      return await res.json();
    } catch (e) {
      console.warn('API getQuests failed, fallback to local', e);
      return { success: false, error: e.message };
    }
  },

  async getQuest(id) {
    try {
      const res = await fetch(`${this.baseUrl}/quests/${id}`);
      return await res.json();
    } catch (e) {
      console.warn('API getQuest failed', e);
      return { success: false, error: e.message };
    }
  },

  async startSession(questId, teamName) {
    try {
      const res = await fetch(`${this.baseUrl}/sessions/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questId, teamName })
      });
      return await res.json();
    } catch (e) {
      console.warn('API startSession failed', e);
      return { success: false, error: e.message };
    }
  },

  async verifyCheckpoint(sessionId, checkpointIndex, submission, userCoords, demoMode, isScanned) {
    try {
      const res = await fetch(`${this.baseUrl}/checkpoints/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          checkpointIndex,
          submission,
          userCoords,
          demoMode,
          isScanned
        })
      });
      return await res.json();
    } catch (e) {
      console.warn('API verifyCheckpoint failed', e);
      return { success: false, error: e.message };
    }
  },

  async useHint(sessionId, checkpointIndex) {
    try {
      const res = await fetch(`${this.baseUrl}/hints/hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, checkpointIndex })
      });
      return await res.json();
    } catch (e) {
      console.warn('API useHint failed', e);
      return { success: false, error: e.message };
    }
  },

  async completeQuest(sessionId, finalChoiceIndex) {
    try {
      const res = await fetch(`${this.baseUrl}/sessions/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, finalChoiceIndex })
      });
      return await res.json();
    } catch (e) {
      console.warn('API completeQuest failed', e);
      return { success: false, error: e.message };
    }
  },

  async getLeaderboard(questId) {
    try {
      const res = await fetch(`${this.baseUrl}/leaderboard?quest_id=${questId || 'all'}`);
      return await res.json();
    } catch (e) {
      console.warn('API getLeaderboard failed', e);
      return { success: false, error: e.message };
    }
  },

  async askAI(question, questId, checkpointIndex) {
    try {
      const res = await fetch(`${this.baseUrl}/ai/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, questId, checkpointIndex })
      });
      return await res.json();
    } catch (e) {
      console.warn('API askAI failed', e);
      return { success: false, error: e.message };
    }
  },

  async createCustomQuest(quest, checkpoints) {
    try {
      const res = await fetch(`${this.baseUrl}/quests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quest, checkpoints })
      });
      return await res.json();
    } catch (e) {
      console.warn('API createCustomQuest failed', e);
      return { success: false, error: e.message };
    }
  }
};
