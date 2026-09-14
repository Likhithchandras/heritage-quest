import React, { useState, useMemo } from 'react';
import { INITIAL_LEADERBOARD } from '../data/leaderboardData';
import { useGameProgress } from '../context/GameProgressContext';
import { useAuth } from '../context/AuthContext';
import { soundEffects } from '../utils/soundEffects';
import { Trophy, Award, Crown, Medal, Star, Shield, Filter, Search, Sparkles, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LeaderboardPage() {
  const { totalScore, badges, completedHunts, currentRank } = useGameProgress();
  const { currentUser } = useAuth();
  const [selectedState, setSelectedState] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const states = ['ALL', 'Karnataka', 'Rajasthan', 'Maharashtra', 'Tamil Nadu', 'Odisha', 'Telangana', 'Uttar Pradesh', 'Gujarat'];

  // Dynamically incorporate real players into the leaderboard
  const combinedLeaderboard = useMemo(() => {
    const list = [...INITIAL_LEADERBOARD];

    // Only add current user if they have scored XP or are logged in
    if (totalScore > 0 || (currentUser && currentUser.isLoggedIn)) {
      const userEntry = {
        id: 'current_user',
        name: currentUser ? currentUser.name : 'Junior Explorer',
        title: currentRank.name,
        state: 'All India',
        avatar: '⭐',
        score: totalScore,
        checkpointsSolved: completedHunts.length * 6,
        badgesCount: badges.length,
        huntsCompleted: completedHunts.length,
        isCurrentUser: true
      };
      list.push(userEntry);
    }

    // Sort descending by score
    list.sort((a, b) => b.score - a.score);

    return list.map((item, idx) => ({ ...item, rank: idx + 1 }));
  }, [totalScore, badges, completedHunts, currentRank, currentUser]);

  const filteredLeaderboard = combinedLeaderboard.filter(item => {
    const matchesState = selectedState === 'ALL' || item.state.toLowerCase() === selectedState.toLowerCase() || item.isCurrentUser;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  const top3 = combinedLeaderboard.slice(0, 3);
  const currentUserRank = combinedLeaderboard.find(item => item.isCurrentUser);

  return (
    <div className="space-y-10 pb-20 max-w-5xl mx-auto animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950/90 via-stone-950 to-amber-950/90 border-2 border-amber-500/40 p-6 md:p-10 shadow-2xl space-y-4 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mx-auto">
          <Trophy className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>Pan-India Explorer Leaderboard</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-amber-100 font-serif">
          Heritage Hall of Fame 🏆
        </h1>

        <p className="text-stone-300 text-sm md:text-base max-w-2xl mx-auto">
          Real-time rankings of junior archaeologists decoding riddles and discovering ancient monument secrets across India.
        </p>

        {/* Current User Standing Card */}
        {currentUserRank && (
          <div className="mt-4 p-4 bg-amber-950/60 border border-amber-500/40 rounded-2xl max-w-xl mx-auto flex items-center justify-between gap-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-xl font-bold text-amber-300 font-serif">
                #{currentUserRank.rank}
              </div>
              <div>
                <div className="text-[11px] text-stone-400 font-semibold uppercase">Your Live Standing</div>
                <div className="text-base font-extrabold text-amber-200 font-serif">{currentUserRank.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-amber-400 font-mono">{currentUserRank.score} XP</div>
              <div className="text-[11px] text-stone-400 font-semibold">{currentUserRank.title}</div>
            </div>
          </div>
        )}
      </div>

      {/* When Leaderboard Has Scores */}
      {combinedLeaderboard.length > 0 ? (
        <div className="space-y-6">
          {/* Top 3 Podium if Available */}
          {top3.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
              {/* 2nd Place */}
              {top3[1] && (
                <div className="order-2 md:order-1 bg-stone-900/80 border-2 border-stone-700/60 rounded-3xl p-6 text-center space-y-3 shadow-xl transform md:translate-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-stone-800 border-4 border-stone-400 flex items-center justify-center text-3xl shadow">
                    🥈
                  </div>
                  <div className="inline-block px-3 py-0.5 rounded-full bg-stone-800 text-stone-300 text-xs font-bold border border-stone-600">
                    Rank #2
                  </div>
                  <h3 className="font-serif font-black text-lg text-stone-100 truncate">{top3[1].name}</h3>
                  <p className="text-xs text-stone-400">{top3[1].title}</p>
                  <div className="text-2xl font-black text-amber-400">{top3[1].score} XP</div>
                </div>
              )}

              {/* 1st Place */}
              {top3[0] && (
                <div className="order-1 md:order-2 bg-gradient-to-b from-amber-950/90 to-stone-900 border-4 border-amber-400 rounded-3xl p-8 text-center space-y-4 shadow-2xl scale-105 relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider rounded-full shadow-lg flex items-center space-x-1">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Grand Champion</span>
                  </div>
                  <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 border-4 border-amber-400 flex items-center justify-center text-4xl shadow-[0_0_25px_rgba(245,158,11,0.4)] animate-bounce">
                    🥇
                  </div>
                  <h3 className="font-serif font-black text-xl text-amber-100 truncate">{top3[0].name}</h3>
                  <p className="text-xs text-amber-300 font-bold">{top3[0].title}</p>
                  <div className="text-3xl font-black text-amber-400 font-mono">{top3[0].score} XP</div>
                </div>
              )}

              {/* 3rd Place */}
              {top3[2] && (
                <div className="order-3 md:order-3 bg-stone-900/80 border-2 border-stone-700/60 rounded-3xl p-6 text-center space-y-3 shadow-xl transform md:translate-y-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-stone-800 border-4 border-amber-700 flex items-center justify-center text-3xl shadow">
                    🥉
                  </div>
                  <div className="inline-block px-3 py-0.5 rounded-full bg-amber-950 text-amber-400 text-xs font-bold border border-amber-700">
                    Rank #3
                  </div>
                  <h3 className="font-serif font-black text-lg text-stone-100 truncate">{top3[2].name}</h3>
                  <p className="text-xs text-stone-400">{top3[2].title}</p>
                  <div className="text-2xl font-black text-amber-400">{top3[2].score} XP</div>
                </div>
              )}
            </div>
          )}

          {/* Full Table */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-950/80 text-stone-400 text-xs uppercase font-extrabold border-b border-stone-800 tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Explorer</th>
                    <th className="px-6 py-4 hidden sm:table-cell">Badges</th>
                    <th className="px-6 py-4 text-right">Total XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 font-sans">
                  {filteredLeaderboard.map((player) => (
                    <tr
                      key={player.id}
                      className="bg-amber-500/15 border-l-4 border-amber-400 font-semibold"
                    >
                      <td className="px-6 py-4 font-extrabold font-serif">
                        <span className="text-amber-300">#{player.rank}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-stone-800 border border-amber-400 flex items-center justify-center text-sm shrink-0">
                            ⭐
                          </div>
                          <div>
                            <div className="font-extrabold text-stone-100 flex items-center gap-1.5">
                              <span>{player.name}</span>
                              <span className="px-2 py-0.2 bg-amber-500 text-stone-950 text-[10px] font-black rounded-full uppercase">
                                YOU
                              </span>
                            </div>
                            <div className="text-xs text-amber-400 font-serif">{player.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell text-xs text-stone-300 font-medium">
                        🏅 {player.badgesCount} Badges
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-base font-black text-amber-400 font-mono">
                          {player.score} XP
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Aesthetic Clean Empty State */
        <div className="p-12 text-center bg-stone-900/40 rounded-3xl border-2 border-dashed border-stone-800 space-y-4 max-w-xl mx-auto">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center text-amber-400 text-3xl">
            🏆
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-amber-100 font-serif">
              Leaderboard is Ready for Champions!
            </h3>
            <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
              No explorer scores recorded yet. Solve your first checkpoint riddle or complete an expedition to claim the <strong>#1 Spot</strong> on the Hall of Fame!
            </p>
          </div>
          <Link
            to="/"
            onClick={() => soundEffects.playClick()}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 font-black text-xs rounded-xl shadow-lg transition-all"
          >
            <span>Begin Your First Quest</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
