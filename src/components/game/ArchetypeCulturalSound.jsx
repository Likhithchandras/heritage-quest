import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '@/components/common/Button';
import { useAudio } from '@/context/AudioContext';

export const ArchetypeCulturalSound = ({ game, onComplete, updateScore }) => {
  const { playBell } = useAudio();
  const [activeNote, setActiveNote] = useState(null);
  const [matchedNotes, setMatchedNotes] = useState([]);

  const notes = [
    { id: 'sa', name: 'Sa (Shadja)', freq: 261.63, meaning: 'Peacock cry' },
    { id: 're', name: 'Re (Rishabha)', freq: 293.66, meaning: 'Skylark call' },
    { id: 'ga', name: 'Ga (Gandhara)', freq: 329.63, meaning: 'Goat bleat' },
    { id: 'ma', name: 'Ma (Madhyama)', freq: 349.23, meaning: 'Heron call' },
    { id: 'pa', name: 'Pa (Panchama)', freq: 392.00, meaning: 'Cuckoo (Kokila)' },
  ];

  const handlePlayNote = (note) => {
    setActiveNote(note.id);
    playBell(note.freq);

    if (!matchedNotes.includes(note.id)) {
      const updated = [...matchedNotes, note.id];
      setMatchedNotes(updated);

      if (updated.length === notes.length) {
        updateScore(game.xpReward);
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div className="text-center mb-8">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
          Acoustic Resonance • Hampi Musical Pillars
        </span>
        <h1 className="font-serif-title font-bold text-2xl sm:text-3xl text-[#1C1917] mt-1">
          {game.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] mt-2">
          Tap each granite musical pillar to align the harmonic pentatonic scale:
        </p>
      </div>

      <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-8 shadow-md">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {notes.map((note) => {
            const isPlayed = matchedNotes.includes(note.id);
            return (
              <motion.button
                key={note.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlayNote(note)}
                className={`p-6 rounded-2xl border text-center transition-all flex flex-col items-center justify-between min-h-[160px] ${
                  isPlayed
                    ? 'bg-[#5E7A68]/10 border-[#5E7A68] text-[#5E7A68]'
                    : 'bg-[#FAF7F2] border-[#C5A059]/40 hover:border-[#C5A059]'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#1C1917] text-[#FAF7F2] flex items-center justify-center font-bold text-sm">
                  {note.name.slice(0, 2)}
                </div>
                <div className="my-2">
                  <div className="font-serif-title font-bold text-xs text-[#1C1917]">
                    {note.name}
                  </div>
                  <div className="text-[10px] text-[#57534E]">
                    {note.meaning}
                  </div>
                </div>
                <Volume2 className="w-4 h-4 text-[#C5A059]" />
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs font-mono text-[#57534E]">
          Harmonics Aligned: {matchedNotes.length} / {notes.length}
        </div>
      </div>
    </div>
  );
};

export default ArchetypeCulturalSound;
