import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameHeader from '@/components/game/GameHeader';
import GameCompleteModal from '@/components/game/GameCompleteModal';
import ArchetypeArtifactDetective from '@/components/game/ArchetypeArtifactDetective';
import ArchetypeTimeTravelDecision from '@/components/game/ArchetypeTimeTravelDecision';
import ArchetypeAncientMessage from '@/components/game/ArchetypeAncientMessage';
import ArchetypeRebuildMonument from '@/components/game/ArchetypeRebuildMonument';
import ArchetypeAncientMarket from '@/components/game/ArchetypeAncientMarket';
import ArchetypeHistoricalCharacter from '@/components/game/ArchetypeHistoricalCharacter';
import ArchetypeCulturalSound from '@/components/game/ArchetypeCulturalSound';
import ArchetypeCulturalCraft from '@/components/game/ArchetypeCulturalCraft';
import { GAMES_DATA } from '@/data/gamesData';
import { useAuth } from '@/context/AuthContext';

export const GameExperiencePage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { addXp, completeGame } = useAuth();
  const [currentScore, setCurrentScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const game = GAMES_DATA.find((g) => g.id === gameId) || GAMES_DATA[0];

  const handleScoreUpdate = (newScore) => {
    setCurrentScore(newScore);
  };

  const handleGameComplete = () => {
    setIsCompleted(true);
    addXp(game.xpReward);
    completeGame(game.id);
  };

  const renderArchetype = () => {
    switch (game.archetype) {
      case 'ARTIFACT_DETECTIVE':
        return (
          <ArchetypeArtifactDetective
            game={game}
            onComplete={handleGameComplete}
            updateScore={handleScoreUpdate}
          />
        );
      case 'TIME_TRAVEL_DECISION':
        return (
          <ArchetypeTimeTravelDecision
            game={game}
            onComplete={handleGameComplete}
            updateScore={handleScoreUpdate}
          />
        );
      case 'ANCIENT_MESSAGE':
        return (
          <ArchetypeAncientMessage
            game={game}
            onComplete={handleGameComplete}
            updateScore={handleScoreUpdate}
          />
        );
      case 'REBUILD_MONUMENT':
        return (
          <ArchetypeRebuildMonument
            game={game}
            onComplete={handleGameComplete}
            updateScore={handleScoreUpdate}
          />
        );
      case 'ANCIENT_MARKET':
        return (
          <ArchetypeAncientMarket
            game={game}
            onComplete={handleGameComplete}
            updateScore={handleScoreUpdate}
          />
        );
      case 'HISTORICAL_CHARACTER':
        return (
          <ArchetypeHistoricalCharacter
            game={game}
            onComplete={handleGameComplete}
            updateScore={handleScoreUpdate}
          />
        );
      case 'CULTURAL_SOUND':
        return (
          <ArchetypeCulturalSound
            game={game}
            onComplete={handleGameComplete}
            updateScore={handleScoreUpdate}
          />
        );
      case 'CULTURAL_CRAFT':
        return (
          <ArchetypeCulturalCraft
            game={game}
            onComplete={handleGameComplete}
            updateScore={handleScoreUpdate}
          />
        );
      default:
        return (
          <ArchetypeArtifactDetective
            game={game}
            onComplete={handleGameComplete}
            updateScore={handleScoreUpdate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-16">
      {/* Top HUD Header */}
      <GameHeader
        title={game.title}
        civilization={game.civilization}
        currentStep={1}
        totalSteps={1}
        score={currentScore}
        xpPotential={game.xpReward}
      />

      {/* Main Game Experience Container */}
      <main className="pt-4">
        {renderArchetype()}
      </main>

      {/* Completion Modal */}
      <GameCompleteModal
        isOpen={isCompleted}
        game={game}
        scoreEarned={game.xpReward}
        onReplay={() => {
          setIsCompleted(false);
          setCurrentScore(0);
        }}
      />
    </div>
  );
};

export default GameExperiencePage;
