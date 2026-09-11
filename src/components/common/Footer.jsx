import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#1C1917] text-[#FAF7F2] border-t border-[#C5A059]/20 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#FAF7F2]/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C5A059] to-[#EADCC9] flex items-center justify-center text-lg shadow-inner">
                🏛️
              </div>
              <span className="font-serif-title font-bold text-xl tracking-wider text-[#FAF7F2]">
                HERITAGE QUEST
              </span>
            </div>
            <p className="text-sm text-[#FAF7F2]/70 leading-relaxed max-w-sm">
              An immersive digital odyssey transforming Indian civilization, ancient monuments, and untold historical epics into playable, story-driven discoveries.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C5A059] font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-[#5E7A68]" />
              <span>Authentic Archaeological Context & Non-Invasive Heritage</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif-title text-sm font-semibold tracking-wider text-[#C5A059] uppercase mb-4">
              Expeditions
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/75">
              <li>
                <Link to="/explore" className="hover:text-[#C5A059] transition-colors">
                  Civilizations Index
                </Link>
              </li>
              <li>
                <Link to="/library" className="hover:text-[#C5A059] transition-colors">
                  Playable Game Archetypes
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-[#C5A059] transition-colors">
                  National Interactive Map
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-[#C5A059] transition-colors">
                  AI Creator Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Game Archetypes */}
          <div>
            <h4 className="font-serif-title text-sm font-semibold tracking-wider text-[#C5A059] uppercase mb-4">
              Archetypes
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/75">
              <li>
                <Link to="/library?archetype=ARTIFACT_DETECTIVE" className="hover:text-[#C5A059] transition-colors">
                  3D Artifact Detective
                </Link>
              </li>
              <li>
                <Link to="/library?archetype=TIME_TRAVEL_DECISION" className="hover:text-[#C5A059] transition-colors">
                  Time-Travel Decisions
                </Link>
              </li>
              <li>
                <Link to="/library?archetype=ANCIENT_MESSAGE" className="hover:text-[#C5A059] transition-colors">
                  Glyph Decrypter
                </Link>
              </li>
              <li>
                <Link to="/library?archetype=ANCIENT_MARKET" className="hover:text-[#C5A059] transition-colors">
                  Lothal Silk & Spice Barter
                </Link>
              </li>
            </ul>
          </div>

          {/* Heritage Conservation Note */}
          <div>
            <h4 className="font-serif-title text-sm font-semibold tracking-wider text-[#C5A059] uppercase mb-4">
              Ethical Tourism
            </h4>
            <p className="text-xs text-[#FAF7F2]/65 leading-relaxed">
              Every quest adheres to strict preservation ethics: Zero physical contact, respect for sacred sites, and support for local artisan communities.
            </p>
            <div className="mt-4 p-3 rounded-xl bg-[#2B2724] border border-[#C5A059]/20 text-[11px] text-[#C5A059]">
              ✨ 100% Non-Hallucinatory Archaeological Reference
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/50">
          <p>© {new Date().getFullYear()} Heritage Quest Platform. Crafted for Indian Civilizational Heritage.</p>
          <div className="flex items-center gap-1">
            <span>Preserving memory with</span>
            <Heart className="w-3.5 h-3.5 text-[#C86D51] fill-current inline" />
            <span>and modern digital craft</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
