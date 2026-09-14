import React, { useState, useEffect } from 'react';
import { Compass, Navigation, MapPin, CheckCircle2, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { calculateDistance, isWithinGeofence } from '../../utils/geoUtils';
import { soundEffects } from '../../utils/soundEffects';

export default function GpsCompass({ targetLat, targetLng, targetName, hintRadius = 40, onArrival }) {
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isInside, setIsInside] = useState(false);
  const [simulated, setSimulated] = useState(false);
  const [gpsError, setGpsError] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // Request actual browser geolocation
  const handleGetLocation = () => {
    setIsLocating(true);
    setGpsError(null);
    soundEffects.playClick();

    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported on this device. Use Virtual Simulation mode below.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        const dist = calculateDistance(latitude, longitude, targetLat, targetLng);
        setDistance(dist);
        setIsLocating(false);

        if (dist <= hintRadius) {
          setIsInside(true);
          soundEffects.playArrival();
          onArrival();
        }
      },
      (err) => {
        setGpsError('Could not get GPS location. Switch to Virtual Explorer Mode below.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Simulate arrival for virtual explorers / classroom demo
  const handleSimulateArrival = () => {
    soundEffects.playArrival();
    setSimulated(true);
    setIsInside(true);
    setDistance(5);
    onArrival();
  };

  return (
    <div className="bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-500/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Compass className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
          <h3 className="font-serif font-bold text-amber-200 text-base md:text-lg">
            Step 1: Reach {targetName}
          </h3>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
          GPS Radar
        </span>
      </div>

      {/* Target coordinates display */}
      <div className="p-4 bg-stone-950/80 rounded-2xl border border-stone-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-stone-400">
          <span className="font-semibold uppercase">Monument Target Coords</span>
          <span className="font-mono text-amber-400">{targetLat.toFixed(5)}° N, {targetLng.toFixed(5)}° E</span>
        </div>
        <div className="text-sm font-semibold text-stone-200">
          Target Destination: <span className="text-amber-300 font-bold">{targetName}</span>
        </div>
      </div>

      {/* Radar Animation / Visual Tracker */}
      <div className="relative py-8 flex flex-col items-center justify-center">
        <div className="relative w-40 h-40 rounded-full border-2 border-dashed border-amber-500/40 flex items-center justify-center bg-amber-950/20">
          <div className="w-28 h-28 rounded-full border border-amber-500/30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center animate-pulse">
              <Navigation className="w-8 h-8 text-amber-400" />
            </div>
          </div>
        </div>

        {distance !== null && (
          <div className="mt-4 text-center">
            <div className="text-2xl font-black text-amber-300 font-mono">
              {distance < 1000 ? `${Math.round(distance)} meters` : `${(distance / 1000).toFixed(1)} km`}
            </div>
            <div className="text-xs text-stone-400 font-medium">Estimated distance to checkpoint</div>
          </div>
        )}
      </div>

      {/* GPS Error gentle prompt */}
      {gpsError && (
        <div className="p-3 bg-amber-950/50 border border-amber-500/30 rounded-xl text-amber-300 text-xs font-medium flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{gpsError}</span>
        </div>
      )}

      {/* Action Controls */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleGetLocation}
          disabled={isLocating}
          className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 active:scale-95 text-amber-200 font-bold text-sm rounded-2xl border border-amber-500/40 transition-all flex items-center justify-center space-x-2 shadow"
        >
          <RefreshCw className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{isLocating ? 'Locating Your Position...' : 'Acquire GPS Position'}</span>
        </button>

        {/* Virtual Explorer Simulator Mode */}
        <div className="p-4 bg-amber-950/30 border border-amber-500/20 rounded-2xl text-center space-y-2">
          <div className="text-xs text-amber-300 font-semibold">
            🎓 Classroom / Virtual Explorer Simulator
          </div>
          <p className="text-[11px] text-stone-400">
            Playing remotely or from home? Click below to virtually arrive at the checkpoint.
          </p>
          <button
            onClick={handleSimulateArrival}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 active:scale-95 text-stone-950 font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-stone-950" />
            <span>Simulate Arrival at Checkpoint (Virtual Mode)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
