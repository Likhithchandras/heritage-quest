import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, PlusCircle, CheckCircle2, ArrowRight, BookOpen, Layers } from 'lucide-react';
import Button from '@/components/common/Button';
import { useAudio } from '@/context/AudioContext';

export const CreateGamePage = () => {
  const [topic, setTopic] = useState('Stepwells of Gujarat (Rani ki Vav)');
  const [civilization, setCivilization] = useState('Solanki Dynasty (11th Century CE)');
  const [archetype, setArchetype] = useState('ARTIFACT_DETECTIVE');
  const [difficulty, setDifficulty] = useState('Medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState(null);
  const { playBell, playChime } = useAudio();

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    playBell(600);

    setTimeout(() => {
      setIsGenerating(false);
      playChime();
      setGeneratedOutput({
        title: `The Subterranean Whispers of ${topic}`,
        storyIntro: `In 1063 CE, Queen Udayamati commissioned the seven-tiered inverted temple of Rani ki Vav. As master architect, inspect the 500 principal sculpted panels dedicated to water conservation and sacred geometry.`,
        historicalFact: `Rani ki Vav was designed as an inverted temple highlighting the sacred sanctity of water in arid Patan, featuring stepped corridors with pillared multi-storey pavilions.`,
        hotspots: [
          { name: 'Sheshashayi Vishnu Panel', clue: 'Look for the reclining deity floating upon cosmic serpent Ananta.' },
          { name: 'Water Well Silt Shaft', clue: 'Examine the circular masonry shaft with terracotta silt-filtration rings.' },
          { name: 'Apsara Adornment Bracket', clue: 'Observe the 16 decorative poses illustrating classical Gujarati attire.' }
        ],
        xpReward: 400,
        badgeName: 'Hydraulic Architect of Patan'
      });
    }, 1800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C86D51]">
          Educator & Creator Studio
        </span>
        <h1 className="font-serif-title font-bold text-3xl sm:text-4xl text-[#1C1917] mt-1.5 mb-2">
          AI Experience Generator
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E]">
          Generate museum-grade gamified heritage adventures for classrooms and cultural exhibitions in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Creator Wizard */}
        <div className="lg:col-span-5 bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 shadow-sm">
          <h3 className="font-serif-title font-bold text-base text-[#1C1917] mb-4 flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-[#C5A059]" />
            Expedition Parameters
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#57534E] uppercase mb-1">
                Monument / Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#EADCC9] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#57534E] uppercase mb-1">
                Dynasty / Era
              </label>
              <input
                type="text"
                value={civilization}
                onChange={(e) => setCivilization(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#EADCC9] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-[#57534E] uppercase mb-1">
                Interactive Archetype
              </label>
              <select
                value={archetype}
                onChange={(e) => setArchetype(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#EADCC9] text-xs text-[#1C1917] focus:outline-none focus:border-[#C5A059]"
              >
                <option value="ARTIFACT_DETECTIVE">Artifact Detective (3D Hotspots)</option>
                <option value="TIME_TRAVEL_DECISION">Time-Travel Decisions</option>
                <option value="ANCIENT_MESSAGE">Ancient Message (Glyph Decrypter)</option>
                <option value="REBUILD_MONUMENT">Rebuild Monument (Assembly)</option>
                <option value="ANCIENT_MARKET">Ancient Market (Silk/Spice Barter)</option>
              </select>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full mt-2"
              disabled={isGenerating}
              icon={Sparkles}
            >
              {isGenerating ? 'Synthesizing Archaeological Lore...' : 'Generate Experience'}
            </Button>
          </form>
        </div>

        {/* Right Preview Chamber */}
        <div className="lg:col-span-7">
          <div className="bg-[#FFFDF9] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-8 shadow-sm min-h-[420px] flex flex-col justify-between">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-12 h-12 rounded-full border-4 border-[#C5A059] border-t-transparent animate-spin mb-4" />
                <p className="font-serif-title font-bold text-sm text-[#1C1917]">
                  Consulting Archaeological Archives...
                </p>
                <p className="text-xs text-[#57534E] mt-1">
                  Drafting verified narrative trees and 3D hotspot coordinates.
                </p>
              </div>
            ) : generatedOutput ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#EADCC9]">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#5E7A68] bg-[#5E7A68]/15 px-2.5 py-0.5 rounded-full">
                    AI Generation Complete ✓
                  </span>
                  <span className="text-xs font-mono font-bold text-[#C5A059]">
                    +{generatedOutput.xpReward} XP Reward
                  </span>
                </div>

                <h3 className="font-serif-title font-bold text-xl text-[#1C1917]">
                  {generatedOutput.title}
                </h3>

                <p className="text-xs text-[#57534E] bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADCC9] leading-relaxed">
                  {generatedOutput.storyIntro}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#57534E]">
                    Generated 3D Hotspot Clues:
                  </h4>
                  {generatedOutput.hotspots.map((hs, i) => (
                    <div
                      key={i}
                      className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EADCC9] text-xs flex items-start gap-2"
                    >
                      <span className="font-bold text-[#C86D51]">{i + 1}.</span>
                      <div>
                        <b className="text-[#1C1917]">{hs.name}: </b>
                        <span className="text-[#57534E]">{hs.clue}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#EADCC9] flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      playBell(700);
                      alert('Expedition published to your classroom codex!');
                    }}
                  >
                    Publish to Classroom
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center text-[#57534E]">
                <Sparkles className="w-10 h-10 text-[#C5A059] opacity-40 mb-3" />
                <p className="font-serif-title font-bold text-base text-[#1C1917]">
                  Ready to Craft an Experience
                </p>
                <p className="text-xs max-w-xs mt-1">
                  Fill in your topic on the left to generate an authentic, interactive learning game.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGamePage;
