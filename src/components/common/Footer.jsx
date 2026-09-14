import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1C1917] text-[#FAF7F2] py-12 border-t border-[#C5A059]/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm;px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🍸</span>
              <span className="text-xl font-bold font-serif-title tracking-wide text-['#C5A059]">
                Heritage Treasure Hunt India
              </span>
            </div>
            <p className="text-sm text-['#FAF7F2']/80 max-w-md leading-relaxed">
              An interactive, child-friendly gamified heritage exploration platform covering 20 iconic Indian monuments with 120+ checkpoints, GPS geofencing, observation challenges, progressive riddles, and educational quizzes.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#C5A059]">
              <span>in Built for Indian Civilizational Education</span>
              <span>•</span>
              <span>HCI-Compliant</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-['#C5A059] mb-3">Explore States</h4>
            <ul className="space-y-2 text-sm text-['#FAF7F2']/80">
              <li><Link to="/" className="hover:text-[#C86D51] transition-colors">Karnataka (10 Sites)</Link></li>
              <li><Link to="/" className="hover:text-[#C86D51] transition-colors">Rajasthan (3 Sites)</Link></li>
              <li><Link to="/" className="hover:text-[#C86D51] transition-colors">Maharashtra (2 Sites)</Link></li>
              <li><Link to="/" className="hover:text-[#C86D51] transition-colors">Tamil Nadu, Odisha, UP, Gujarat, Telangana</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C5A059] mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[#FAF7F2']/80">
              <li><Link to="/" className="hover:text-[#C86D51] transition-colors">🍸&nbsp;All 20 Hunts</Link></li>
              <li><Link to="/map" className="hover:text-[#C86D51] transition-colors">🕱&nbsp;India Heritage Map</Link></li>
              <li><Link to="/passport" className="hover:text-['#C86D51] transition-colors">🧁&nbsp;Explorer Passport & Badges</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#FAF7F2']/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/60 gap-4">
          <p>© 2026 Heritage Treasure Hunt. Free for Students, Schools, and Heritage Learners.</p>
          <p className="flex items-center gap-2">
            <span>📉 Real Verified GPS</span>
            <span>•</span>
            <span>🔔 Web Speech Audio Guide</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
