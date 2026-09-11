import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRightLeft, Coins } from 'lucide-react';
import Button from '@/components/common/Button';
import { useAudio } from '@/context/AudioContext';

export const ArchetypeAncientMarket = ({ game, onComplete, updateScore }) => {
  const [playerInventory, setPlayerInventory] = useState({
    carnelianBeads: 10,
    copperIngots: 4,
    cottonFabrics: 6,
  });

  const [tradesCompleted, setTradesCompleted] = useState(0);
  const { playBell, playChime } = useAudio();

  const handleTrade = (tradeType) => {
    playBell(700);
    if (tradeType === 'lapis' && playerInventory.carnelianBeads >= 4) {
      setPlayerInventory((prev) => ({
        ...prev,
        carnelianBeads: prev.carnelianBeads - 4,
      }));
      setTradesCompleted((c) => c + 1);
    } else if (tradeType === 'tin' && playerInventory.copperIngots >= 2) {
      setPlayerInventory((prev) => ({
        ...prev,
        copperIngots: prev.copperIngots - 2,
      }));
      setTradesCompleted((c) => c + 1);
    }

    if (tradesCompleted + 1 >= 3) {
      updateScore(game.xpReward);
      setTimeout(() => {
        onComplete();
      }, 1200);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
          Maritime Silk & Spice Barter • Lothal Port
        </span>
        <h1 className="font-serif-title font-bold text-2xl sm:text-3xl text-[#1C1917] mt-1">
          {game.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] mt-2">
          {game.tagline}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Player Cargo Hold */}
        <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 shadow-md md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Coins className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif-title font-bold text-base text-[#1C1917]">
              Your Lothal Cargo
            </h3>
          </div>

          <div className="space-y-3">
            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#EADCC9] flex justify-between items-center">
              <span className="text-xs font-medium text-[#1C1917]">🔴 Carnelian Beads</span>
              <span className="font-mono font-bold text-xs text-[#C86D51]">{playerInventory.carnelianBeads}</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#EADCC9] flex justify-between items-center">
              <span className="text-xs font-medium text-[#1C1917]">🟫 Copper Ingots</span>
              <span className="font-mono font-bold text-xs text-[#C86D51]">{playerInventory.copperIngots}</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#EADCC9] flex justify-between items-center">
              <span className="text-xs font-medium text-[#1C1917]">📜 Cotton Fabrics</span>
              <span className="font-mono font-bold text-xs text-[#C86D51]">{playerInventory.cottonFabrics}</span>
            </div>
          </div>
        </div>

        {/* Right: Foreign Merchants */}
        <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 shadow-md md:col-span-2">
          <h3 className="font-serif-title font-bold text-base text-[#1C1917] mb-2">
            Mesopotamian & Persian Merchants
          </h3>
          <p className="text-xs text-[#57534E] mb-4">
            Fulfill 3 international trade requests to clear the dockyard shipment:
          </p>

          <div className="space-y-4">
            {/* Offer 1 */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#C5A059]/30 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-[#1C1917] font-serif-title">
                  Ur Merchant: Lapis Lazuli Inlay
                </h4>
                <p className="text-[11px] text-[#57534E]">
                  Requires 4 Carnelian Beads in exchange for Royal Blue Lapis.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                disabled={playerInventory.carnelianBeads < 4}
                onClick={() => handleTrade('lapis')}
              >
                Barter
              </Button>
            </div>

            {/* Offer 2 */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#C5A059]/30 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-[#1C1917] font-serif-title">
                  Dilmun Sailor: Afghan Tin Ores
                </h4>
                <p className="text-[11px] text-[#57534E]">
                  Requires 2 Copper Ingots to alloy bronze spearheads.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                disabled={playerInventory.copperIngots < 2}
                onClick={() => handleTrade('tin')}
              >
                Barter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchetypeAncientMarket;
