import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import Button from '@/components/common/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-[#FAF7F2] border border-[#C5A059] flex items-center justify-center text-4xl mb-4 shadow-md">
        🏛️
      </div>
      <h1 className="font-serif-title font-bold text-4xl text-[#1C1917] mb-2">
        404 — Lost in the Ruins
      </h1>
      <p className="text-sm text-[#57534E] max-w-md mb-6">
        The monument or epigraph you are looking for has been swallowed by the sands of time.
      </p>
      <Button
        variant="primary"
        icon={Compass}
        onClick={() => navigate('/')}
      >
        Return to Sanctuary
      </Button>
    </div>
  );
};

export default NotFoundPage;
