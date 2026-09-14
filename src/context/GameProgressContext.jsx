import React, { createContext, useContext, useState, useEffect } from 'react';
import { BADGES, RANKS } from '../data/badgesData';
import { sounds } from '../utils/soundEffects';

const GameProgressContext = createContext();

export function GameProgressProvider({ children }) {
  const [totalScore, setTotalScore] = useState(() => {
    return parseInt(localStorage.getItem('heritage_score') || '0', 10);
  });

  const [totalXp, setTotalXp] = useState(() => {
    return parseInt(localStorage.getItem('heritage_xp') || '0', 10);
  });

  const [completedHunts, setCompletedHunts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('heritage_completed_hunts') || '[]');
    } catch {
      return [];
    }
  });

  const [checkpointProgress, setCheckpointProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('heritage_checkpoint_progress') || '{}');
    } catch {
      return {};
    }
  });

  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('heritage_unlocked_badges') || '[]');
    } catch {
      return [];
    }
  });

  const [explorerName, setExplorerName] = useState(() => {
    return localStorage.getItem('heritage_explorer_name') || 'Junior Explorer';
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('heritage_score', totalScore.toString());
  }, [totalScore]);

  useEffect(() => {
    localStorage.setItem('heritage_xp', totalXp.toString());
    checkBadgeUnlocks(totalScore, totalXp, completedHunts);
  }, [totalXp, totalScore, completedHunts]);

  useEffect(() => {
    localStorage.setItem('heritage_completed_hunts', JSON.stringify(completedHunts));
  }, [completedHunts]);

  useEffect(() => {
    localStorage.setItem('heritage_checkpoint_progress', JSON.stringify(checkpointProgress));
  }, [checkpointProgress]);

  useEffect(() => {
    localStorage.setItem('heritage_unlocked_badges', JSON.stringify(unlockedBadges));
  }, [unlockedBadges]);

  useEffect(() => {
    localStorage.setItem('heritage_explorer_name', explorerName);
  }, [explorerName]);

  const checkBadgeUnlocks = (score, xp, completed) => {
    const newlyUnlocked = [];
    BADGES.forEach((b) => {
      if (!unlockedBadges.includes(b.id)) {
        if (score >= b.unlockedAtPoints) {
          newlyUnlocked.push(b.id);
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      setUnlockedBadges((prev) => [...prev, ...newlyUnlocked]);
      sounds.fanfare();
    }
  };

  const completeCheckpoint = (huntId, checkpointSeq, earnedPoints = 80, earnedXp = 80) => {
    setTotalScore((prev) => prev + earnedPoints);
    setTotalXp((prev) => prev + (earnedXp || earnedPoints));

    setCheckpointProgress((prev) => {
      const currentHighest = prev[huntId] || 0;
      return {
        ...prev,
        [huntId]: Math.max(currentHighest, checkpointSeq + 1),
      };
    });
  };

  const saveCheckpointProgress = (huntId, currentIdx, earnedPoints) => {
    completeCheckpoint(huntId, currentIdx, earnedPoints, earnedPoints);
  };

  const completeHunt = (huntId) => {
    if (!completedHunts.includes(huntId)) {
      setCompletedHunts((prev) => [...prev, huntId]);
      sounds.fanfare();
    }
  };

  const resetHunt = (huntId) => {
    setCheckpointProgress(prev => {
      const updated = { ...prev };
      delete updated[huntId];
      return updated;
    });
    setCompletedHunts(prev => prev.filter(id => id !== huntId));
  };

  const resetAllProgress = () => {
    setTotalScore(0);
    setTotalXp(0);
    setCompletedHunts([]);
    setCheckpointProgress({});
    setUnlockedBadges([]);
    localStorage.clear();
  };

  // Rank computation
  const currentRank = [...RANKS].reverse().find(r => totalScore >= r.minScore) || RANKS[0];

  const value = {
    totalScore,
    totalXp,
    completedHunts,
    checkpointProgress,
    huntProgress: checkpointProgress,
    badges: unlockedBadges,
    unlockedBadges,
    explorerName,
    setExplorerName,
    currentRank,
    completeCheckpoint,
    saveCheckpointProgress,
    completeHunt,
    resetHunt,
    resetAllProgress,
  };

  return (
    <GameProgressContext.Provider value={value}>
      {children}
    </GameProgressContext.Provider>
  );
}

export function useGameProgress() {
  const context = useContext(GameProgressContext);
  if (!context) {
    throw new Error('useGameProgress must be used within GameProgressProvider');
  }
  return context;
}
