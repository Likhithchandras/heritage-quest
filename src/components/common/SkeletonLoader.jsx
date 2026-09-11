import React from 'react';

export const SkeletonLoader = ({ type = 'card', count = 1, className = '' }) => {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {items.map((_, i) => (
          <div
            key={i}
            className="bg-[#FFFDF9] border border-[#EADCC9] rounded-3xl p-5 shadow-sm animate-pulse flex flex-col gap-4"
          >
            <div className="w-full h-48 bg-[#EADCC9]/50 rounded-2xl" />
            <div className="space-y-2">
              <div className="h-5 bg-[#EADCC9]/60 rounded-md w-3/4" />
              <div className="h-3.5 bg-[#EADCC9]/40 rounded-md w-1/2" />
            </div>
            <div className="h-12 bg-[#EADCC9]/30 rounded-xl" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-4 bg-[#EADCC9]/50 rounded-full w-20" />
              <div className="h-8 bg-[#EADCC9]/60 rounded-full w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className={`space-y-2.5 animate-pulse ${className}`}>
        {items.map((_, i) => (
          <div key={i} className="h-4 bg-[#EADCC9]/50 rounded-md w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className={`w-full h-32 bg-[#EADCC9]/40 rounded-2xl animate-pulse ${className}`} />
  );
};

export default SkeletonLoader;
