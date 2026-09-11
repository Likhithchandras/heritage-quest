export const MOCK_USER_DATA = {
  id: 'user_dev_01',
  name: 'Likhith Chandra',
  username: 'likhith_explorer',
  email: 'likhith@heritagequest.org',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  level: 6,
  levelTitle: 'Royal Chronicler',
  culturalXp: 1850,
  nextLevelXp: 2500,
  civilizationsDiscoveredCount: 4,
  totalGamesCompletedCount: 7,
  artifactsDiscoveredCount: 5,
  currentAdventure: {
    gameId: 'game-artifact-detective',
    gameTitle: 'The Lost Bronze of Chola Port',
    civilization: 'Imperial Chola Dynasty',
    progressPercent: 65,
    nextObjective: 'Inspect the flame of transformation on the left hand.',
    coverImage: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80'
  },
  continuePlayingList: [
    {
      gameId: 'game-ancient-message',
      title: 'Deciphering the Steatite Seal',
      civilization: 'Indus Valley',
      progressPercent: 40,
      xpEarned: 120,
      coverImage: 'https://images.unsplash.com/photo-1599818816942-83b6b19a31a6?auto=format&fit=crop&w=400&q=80'
    },
    {
      gameId: 'game-time-travel-decision',
      title: 'The Edicts of the Iron Pillar',
      civilization: 'Mauryan Empire',
      progressPercent: 80,
      xpEarned: 350,
      coverImage: 'https://images.unsplash.com/photo-1600100397608-f010f421a182?auto=format&fit=crop&w=400&q=80'
    }
  ],
  culturalJourneyTimeline: [
    { era: '2500 BCE', event: 'Discovered Lothal Maritime Dockyard Seal', status: 'Completed', icon: '🏺' },
    { era: '261 BCE', event: 'Drafted Ashoka’s Edict XII on Religious Tolerance', status: 'Completed', icon: '🦁' },
    { era: '1014 CE', event: 'Uncovered Panchaloha Formulation in Thanjavur', status: 'In Progress', icon: '🔱' },
    { era: '1520 CE', event: 'Entered the Car Street Diamond Bazaar of Hampi', status: 'Upcoming', icon: '💎' }
  ],
  preferences: {
    ambientSound: true,
    hapticFeedback: true,
    highContrastMode: false,
    preferredLanguage: 'English'
  }
};
