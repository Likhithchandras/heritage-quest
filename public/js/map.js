const MapEngine = {
  map: null,
  markers: [],
  playerMarker: null,
  radiusCircle: null,
  watchId: null,
  userLocation: { lat: 15.3350, lng: 76.4600 },
  hasRealGPS: false,

  init(containerId = 'leafletMap') {
    if (this.map) return;
    if (!window.L) {
      console.warn('Leaflet library not loaded.');
      return;
    }

    try {
      this.map = L.map(containerId, {
        center: [15.3350, 76.4600],
        zoom: 16,
        zoomControl: true
      });

      // Dark Matter CartoDB tiles for ancient atmosphere
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(this.map);

      // In demo mode or clicking on map, set player coords
      this.map.on('click', (e) => {
        if (window.AppState && window.AppState.demoMode) {
          this.setUserLocation(e.latlng.lat, e.latlng.lng, true);
          if (window.showToast) window.showToast(`[Demo] Simulating location at marker`);
        }
      });

      this.startGPS();
    } catch (e) {
      console.error('Error initializing Leaflet map:', e);
    }
  },

  startGPS() {
    if ('geolocation' in navigator) {
      this.watchId = navigator.geolocation.watchPosition(
        (pos) => {
          this.hasRealGPS = true;
          this.setUserLocation(pos.coords.latitude, pos.coords.longitude);
        },
        (err) => {
          console.log('GPS watchPosition fallback to default center:', err.message);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    }
  },

  setUserLocation(lat, lng, isSimulated = false) {
    this.userLocation = { lat, lng };
    if (!this.map || !window.L) return;

    if (!this.playerMarker) {
      const playerIcon = L.divIcon({
        className: 'player-radar-icon',
        html: '<div class="radar-pulse"></div><div style="font-size:16px; transform:translate(6px,-18px);">🧭</div>',
        iconSize: [24, 24]
      });
      this.playerMarker = L.marker([lat, lng], { icon: playerIcon }).addTo(this.map);
    } else {
      this.playerMarker.setLatLng([lat, lng]);
    }
  },

  renderQuestCheckpoints(quest, currentCpIndex, solvedArray) {
    if (!this.map || !window.L || !quest || !quest.checkpoints) return;

    // Clear old markers
    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];
    if (this.radiusCircle) this.map.removeLayer(this.radiusCircle);

    const latLngs = [];

    quest.checkpoints.forEach((cp, idx) => {
      if (cp.lat && cp.lng) {
        latLngs.push([cp.lat, cp.lng]);
        const isSolved = solvedArray && solvedArray[idx];
        const isCurrent = idx === currentCpIndex;

        let iconColor = isSolved ? '#7a9b6e' : (isCurrent ? '#e8934a' : '#8f879c');
        let iconEmoji = isSolved ? '✓' : (idx + 1);

        const customIcon = L.divIcon({
          className: 'cp-marker',
          html: `<div style="background:${iconColor}; color:#14121a; font-weight:bold; font-family:monospace; border-radius:50%; width:28px; height:28px; display:flex; align-items:center; justify-content:center; border:2px solid #ece4d3; box-shadow:0 0 10px ${iconColor};">${iconEmoji}</div>`,
          iconSize: [28, 28]
        });

        const marker = L.marker([cp.lat, cp.lng], { icon: customIcon })
          .bindPopup(`<b>${cp.name}</b><br><small>${cp.gate_type.toUpperCase()} Gate · ${cp.radius_meters || 40}m Geofence</small>`)
          .addTo(this.map);

        this.markers.push(marker);

        // Highlight current checkpoint radius
        if (isCurrent) {
          this.radiusCircle = L.circle([cp.lat, cp.lng], {
            color: '#e8934a',
            fillColor: '#e8934a',
            fillOpacity: 0.15,
            radius: cp.radius_meters || 40
          }).addTo(this.map);
        }
      }
    });

    if (latLngs.length > 0) {
      if (quest.lat && quest.lng) {
        this.map.setView([quest.lat, quest.lng], 16);
      } else {
        this.map.fitBounds(latLngs, { padding: [40, 40] });
      }
    }
  },

  invalidateSize() {
    if (this.map) {
      setTimeout(() => this.map.invalidateSize(), 200);
    }
  }
};
