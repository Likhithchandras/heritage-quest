import { GAMES_DATA } from '../data/gamesData';
import { CIVILIZATIONS_DATA } from '../data/civilizationsData';

export const gameService = {
  async getAllGames() {
    await new Promise((res) => setTimeout(res, 300));
    return [...GAMES_DATA];
  },

  async getGameById(gameId) {
    await new Promise((res) => setTimeout(res, 250));
    const game = GAMES_DATA.find((g) => g.id === gameId);
    if (!game) throw new Error('Game experience not found');
    return game;
  },

  async getGamesByCivilization(civilizationId) {
    await new Promise((res) => setTimeout(res, 300));
    return GAMES_DATA.filter((g) => g.civilizationId === civilizationId);
  },

  async getCivilizations() {
    await new Promise((res) => setTimeout(res, 250));
    return [...CIVILIZATIONS_DATA];
  },

  async getCivilizationById(civId) {
    await new Promise((res) => setTimeout(res, 250));
    return CIVILIZATIONS_DATA.find((c) => c.id === civId) || CIVILIZATIONS_DATA[0];
  },

  async submitGameProgress(gameId, scoreEarned) {
    await new Promise((res) => setTimeout(res, 400));
    return {
      success: true,
      gameId,
      scoreEarned,
      newTotalXp: 1850 + scoreEarned,
      badgeUnlocked: 'Master of Heritage'
    };
  }
};
