import { ARTIFACTS_DATA } from '../data/artifactsData';
import { MOCK_USER_DATA } from '../data/mockUserData';
import { ACHIEVEMENTS_DATA } from '../data/achievementsData';
import { MAP_LOCATIONS_DATA } from '../data/mapLocationsData';

export const artifactService = {
  async getAllArtifacts() {
    await new Promise((res) => setTimeout(res, 250));
    return [...ARTIFACTS_DATA];
  },

  async getArtifactById(id) {
    await new Promise((res) => setTimeout(res, 200));
    return ARTIFACTS_DATA.find((a) => a.id === id) || ARTIFACTS_DATA[0];
  }
};

export const userService = {
  async getUserProfile() {
    await new Promise((res) => setTimeout(res, 300));
    return { ...MOCK_USER_DATA };
  },

  async getAchievements() {
    await new Promise((res) => setTimeout(res, 250));
    return [...ACHIEVEMENTS_DATA];
  },

  async updatePreferences(newPrefs) {
    await new Promise((res) => setTimeout(res, 200));
    return { success: true, preferences: newPrefs };
  }
};

export const mapService = {
  async getMapLocations() {
    await new Promise((res) => setTimeout(res, 300));
    return [...MAP_LOCATIONS_DATA];
  }
};

export const aiService = {
  async generateCulturalGame({ civilization, era, topic, ageGroup, difficulty, gameType }) {
    // Realistic AI pipeline synthesis delay
    await new Promise((res) => setTimeout(res, 1800));
    
    return {
      title: `The Chronicles of ${topic || 'the Sacred Shrine'}`,
      civilization: civilization || 'Imperial Chola Dynasty',
      era: era || '11th Century CE',
      difficulty: difficulty || 'Medium',
      gameType: gameType || 'Mysteries',
      generatedStory: `In the heart of the ${civilization || 'ancient kingdom'}, an artisan apprentice has discovered a forgotten copper plate containing astronomical secrets of ${topic || 'monumental architecture'}. Navigate the royal quarter, interview stone masons, and solve the astronomical puzzle before the solar eclipse.`,
      character: {
        name: 'Acharya Kunjara',
        role: 'Chief Royal Architect',
        avatar: '📐',
        firstDialogue: `"You seek the alignment of the stars with our granite vimana? Answer me first: what stone resists the test of monsoon and fire?"`
      },
      puzzle: {
        type: 'Symbol Alignment',
        task: 'Align the 3 celestial wheels with the cardinal sun angles.',
        clue: 'Look to the equinox shadow cast across the eastern entrance.'
      },
      historicalFacts: [
        'Stone blocks were hauled using continuous earthen ramps stretching over 4 kilometers.',
        'No binding mortar was used in the primary dry-stone interlocking core.'
      ],
      xpReward: 350,
      badgeTitle: 'Architect of the Ancients'
    };
  }
};
