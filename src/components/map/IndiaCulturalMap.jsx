import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_LOCATIONS_DATA } from '@/data/mapLocationsData';
import { MapPin, Sparkles, Compass, ArrowRight, X } from 'lucide-react';
import Button from '@/components/common/Button';

export const IndiaCulturalMap = ({ onSelectLocation, selectedLocationId }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const [activeLocation, setActiveLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // initialize once

    // Initialize Leaflet Map centered on India
    const map = L.map(mapContainerRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      minZoom: 4,
      maxZoom: 10,
      zoomControl: false,
    });

    // Elegant CartoDB Positron / Voyage light tiles matching our warm heritage theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    mapInstanceRef.current = map;

    // Add Custom Marker Pins
    MAP_LOCATIONS_DATA.forEach((loc) => {
      const customIcon = L.divIcon({
        className: 'custom-heritage-pin',
        html: `
          <div class="relative group cursor-pointer flex items-center justify-center">
            <div class="w-8 h-8 rounded-full bg-[#1C1917] border-2 border-[#C5A059] shadow-lg flex items-center justify-center text-xs text-white transform transition-transform hover:scale-125 duration-200">
              🏛️
            </div>
            <span class="absolute -top-1 -right-1 w-3 h-3 bg-[#C86D51] rounded-full border border-white"></span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(loc.coordinates, { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setActiveLocation(loc);
        if (onSelectLocation) onSelectLocation(loc);
        map.flyTo(loc.coordinates, 7, { duration: 1.2 });
      });

      markersRef.current[loc.id] = marker;
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [onSelectLocation]);

  useEffect(() => {
    if (selectedLocationId && markersRef.current[selectedLocationId] && mapInstanceRef.current) {
      const loc = MAP_LOCATIONS_DATA.find((l) => l.id === selectedLocationId);
      if (loc) {
        setActiveLocation(loc);
        mapInstanceRef.current.flyTo(loc.coordinates, 7, { duration: 1.2 });
      }
    }
  }, [selectedLocationId]);

  return (
    <div className="relative w-full h-[580px] rounded-3xl overflow-hidden border border-[#C5A059]/30 shadow-lg bg-[#FAF7F2]">
      
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Top Map Header Pill */}
      <div className="absolute top-4 left-4 z-20 bg-[#FFFDF9]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#C5A059]/30 shadow-md flex items-center gap-2">
        <Compass className="w-4 h-4 text-[#C86D51]" />
        <span className="text-xs font-bold text-[#1C1917] font-serif-title">
          Interactive Archaeological Cartography
        </span>
      </div>

      {/* Selected Location Overlay Card Drawer */}
      {activeLocation && (
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-30 bg-[#FFFDF9]/95 backdrop-blur-md border border-[#C5A059]/40 rounded-3xl p-5 shadow-2xl transition-all duration-300">
          <div className="relative">
            {/* Close button */}
            <button
              onClick={() => setActiveLocation(null)}
              className="absolute -top-2 -right-2 p-1 rounded-full bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] border border-[#EADCC9]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C86D51]/10 text-[#C86D51]">
                {activeLocation.state}
              </span>
              {activeLocation.unescoStatus && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C5A059]/20 text-[#9E7D3B]">
                  ★ UNESCO Heritage
                </span>
              )}
            </div>

            <h3 className="font-serif-title font-bold text-lg text-[#1C1917] mb-1">
              {activeLocation.name}
            </h3>

            <p className="text-xs font-medium text-[#C5A059] mb-2 font-mono">
              {activeLocation.period} • {activeLocation.civilization}
            </p>

            <img
              src={activeLocation.coverImage}
              alt={activeLocation.name}
              className="w-full h-32 object-cover rounded-2xl mb-3 border border-[#EADCC9]"
            />

            <p className="text-xs text-[#57534E] leading-relaxed mb-4">
              {activeLocation.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[#EADCC9]">
              <div className="text-[11px] font-medium text-[#5E7A68]">
                {activeLocation.availableGamesCount} Expeditions Available
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/library')}
              >
                Launch Quest
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndiaCulturalMap;
