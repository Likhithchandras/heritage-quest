import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { heritageHunts } from '../../data/heritageHuntsData';
import { Compass, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGameProgress } from '../../context/GameProgressContext';

export default function IndiaHeritageMap({ selectedState = 'ALL' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const navigate = useNavigate();
  const { completedHunts } = useGameProgress();

  // Initialize Dark Aesthetic Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [21.5, 78.9],
      zoom: 5,
      minZoom: 4,
      maxZoom: 12,
      scrollWheelZoom: false,
      attributionControl: false
    });

    // Dark Matter Minimalist Basemap (shows clean state borders & coasts in sleek dark mode)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Subtle Boundary Line Layer on top
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
      opacity: 0.75
    }).addTo(map);

    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers & Pan
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    const filteredHunts = selectedState === 'ALL'
      ? heritageHunts
      : heritageHunts.filter(h => h.state.toLowerCase() === selectedState.toLowerCase());

    filteredHunts.forEach((hunt) => {
      const isDone = completedHunts && completedHunts.includes(hunt.id);
      const glowColor = isDone ? '#10b981' : '#f59e0b';
      const borderGlow = isDone ? 'rgba(16, 185, 129, 0.6)' : 'rgba(245, 158, 11, 0.6)';

      // Aesthetic glowing dark pin
      const customIcon = L.divIcon({
        html: `
          <div style="
            position: relative;
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: ${glowColor};
              opacity: 0.25;
              animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
            "></div>
            <div style="
              position: relative;
              background: #090d16;
              border: 2px solid ${glowColor};
              box-shadow: 0 0 16px ${borderGlow};
              width: 30px;
              height: 30px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              cursor: pointer;
            ">
              ${isDone ? '✨' : '🏛️'}
            </div>
          </div>
        `,
        className: 'custom-dark-pin',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -20]
      });

      const marker = L.marker([hunt.lat, hunt.lng], { icon: customIcon });

      const popupContent = document.createElement('div');
      popupContent.style.background = '#0a0f1d';
      popupContent.style.color = '#f8fafc';
      popupContent.style.padding = '12px';
      popupContent.style.borderRadius = '16px';
      popupContent.style.border = '1px solid rgba(245, 158, 11, 0.4)';
      popupContent.style.boxShadow = '0 10px 25px rgba(0,0,0,0.8)';
      popupContent.style.minWidth = '220px';

      popupContent.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="background:rgba(245,158,11,0.2); color:#fbbf24; font-size:10px; font-weight:800; padding:2px 8px; border-radius:999px; text-transform:uppercase; border:1px solid rgba(245,158,11,0.4);">
            ${hunt.state}
          </span>
          ${isDone ? '<span style="color:#34d399; font-weight:bold; font-size:11px;">✓ Solved</span>' : ''}
        </div>
        <h4 style="font-weight:900; font-size:15px; color:#fef3c7; margin:0 0 4px 0; font-family:serif;">
          ${hunt.name}
        </h4>
        <p style="font-size:12px; color:#94a3b8; margin:0 0 8px 0; line-height:1.4;">
          <strong>Quest:</strong> ${hunt.huntIdea}
        </p>
        <div style="display:flex; justify-content:space-between; font-size:11px; color:#cbd5e1; padding-top:6px; border-top:1px solid rgba(255,255,255,0.1); margin-bottom:8px;">
          <span>📍 ${hunt.checkpoints.length} Checkpoints</span>
          <span>⏱️ ${hunt.estimatedDuration}</span>
        </div>
        <button id="btn-map-hunt-${hunt.id}" style="
          width:100%;
          padding:7px 12px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color:#090d16;
          border:none;
          border-radius:10px;
          font-weight:900;
          font-size:12px;
          cursor:pointer;
          box-shadow: 0 4px 10px rgba(245,158,11,0.3);
        ">
          Start Expedition →
        </button>
      `;

      marker.bindPopup(popupContent, {
        className: 'dark-heritage-popup'
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-map-hunt-${hunt.id}`);
        if (btn) {
          btn.onclick = () => {
            navigate(`/hunt/${hunt.id}`);
          };
        }
      });

      markersLayer.addLayer(marker);
    });

    // Camera transitions
    if (selectedState === 'Karnataka') {
      map.flyTo([14.5, 75.8], 7, { duration: 1.2 });
    } else if (selectedState === 'Rajasthan') {
      map.flyTo([26.5, 74.0], 7, { duration: 1.2 });
    } else if (selectedState === 'Maharashtra') {
      map.flyTo([19.5, 75.5], 7, { duration: 1.2 });
    } else if (selectedState === 'Tamil Nadu') {
      map.flyTo([10.8, 79.1], 8, { duration: 1.2 });
    } else if (selectedState === 'Odisha') {
      map.flyTo([19.9, 86.1], 8, { duration: 1.2 });
    } else if (selectedState === 'Uttar Pradesh') {
      map.flyTo([27.2, 78.0], 8, { duration: 1.2 });
    } else if (selectedState === 'Gujarat') {
      map.flyTo([23.8, 72.1], 8, { duration: 1.2 });
    } else if (selectedState === 'Telangana') {
      map.flyTo([17.4, 78.4], 8, { duration: 1.2 });
    } else {
      map.flyTo([21.5, 78.9], 5, { duration: 1.2 });
    }
  }, [selectedState, completedHunts, navigate]);

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-3xl overflow-hidden border-2 border-amber-500/30 shadow-[0_0_40px_rgba(0,0,0,0.8)] bg-[#070b14]">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Dark Mode Legend */}
      <div className="absolute bottom-4 left-4 z-[400] bg-[#070b14]/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-amber-500/30 text-amber-100 text-xs space-y-1.5 shadow-2xl pointer-events-none">
        <div className="font-bold text-amber-300 flex items-center space-x-1.5">
          <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>India Dark Realm Map</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-[0_0_8px_#f59e0b]"></span>
          <span>Ancient Landmark (Ready)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_#10b981]"></span>
          <span>Mastered Monument</span>
        </div>
      </div>
    </div>
  );
}
