import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, CheckCircle2, User } from 'lucide-react';
import Button from '@/components/common/Button';
import { useAudio } from '@/context/AudioContext';

export const ArchetypeHistoricalCharacter = ({ game, onComplete, updateScore }) => {
  const [dialogueStep, setDialogueStep] = useState(0);
  const { playBell } = useAudio();

  const dialogue = [
    {
      speaker: 'Aryabhata',
      role: 'Astronomer & Mathematician of Pataliputra (499 CE)',
      avatar: '🌟',
      speech: 'Greetings, scholar. Know you that the Earth is spherical, and it rotates upon its own axis each solar day, while the stars remain steady in the celestial sphere?',
      choices: [
        { text: 'How do you calculate the ratio of the circumference to its diameter (Pi)?', reply: 'Add 4 to 100, multiply by 8, and then add 62,000. By this rule the circumference of a circle with a diameter of 20,000 can be approached (~3.1416).' },
        { text: 'What causes lunar eclipses according to your calculations?', reply: 'The Moon is eclipsed when it enters the long shadow cone of the Earth, not by mythical celestial serpents!' },
      ]
    },
    {
      speaker: 'Aryabhata',
      role: 'Astronomer & Mathematician of Pataliputra (499 CE)',
      avatar: '🌟',
      speech: 'Remarkable inquiry! Mathematics is the lantern that illuminates the order of the cosmos (Kala-Kriya).',
      choices: [
        { text: 'I shall preserve the Aryabhatiya treaties in our codex.', isFinal: true }
      ]
    }
  ];

  const currentChat = dialogue[dialogueStep] || dialogue[0];

  const handleSelectChoice = (choice) => {
    playBell(650);
    if (choice.isFinal || dialogueStep + 1 >= dialogue.length) {
      updateScore(game.xpReward);
      setTimeout(() => {
        onComplete();
      }, 1000);
    } else {
      setDialogueStep((s) => s + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
          Historical Audience • Gupta Golden Age
        </span>
        <h1 className="font-serif-title font-bold text-2xl sm:text-3xl text-[#1C1917] mt-1">
          {game.title}
        </h1>
      </div>

      <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 shadow-md">
        {/* Character Avatar & Identity */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#EADCC9]">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#C5A059] to-[#EADCC9] flex items-center justify-center text-3xl border border-[#C5A059] shadow-md">
            {currentChat.avatar}
          </div>
          <div>
            <h3 className="font-serif-title font-bold text-lg text-[#1C1917]">
              {currentChat.speaker}
            </h3>
            <p className="text-xs text-[#57534E] font-medium">
              {currentChat.role}
            </p>
          </div>
        </div>

        {/* Character Dialogue Bubble */}
        <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EADCC9] mb-6 relative">
          <p className="text-sm sm:text-base text-[#1C1917] leading-relaxed italic">
            "{currentChat.speech}"
          </p>
        </div>

        {/* Player Response Choices */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#57534E]">
            Your Inquisitive Discourse:
          </h4>
          {currentChat.choices.map((c, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectChoice(c)}
              className="w-full text-left p-4 rounded-2xl bg-[#FFFDF9] hover:bg-[#FAF7F2] border border-[#C5A059]/30 hover:border-[#C5A059] shadow-sm transition-all text-xs sm:text-sm font-medium text-[#1C1917]"
            >
              💬 {c.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchetypeHistoricalCharacter;
