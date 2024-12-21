import React, { useState, useRef } from 'react';
import { MapLayerMouseEvent } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import MapComponent from '../components/MapComponent';

export default function MapDemo() {
  const [markers, setMarkers] = useState<Array<{
    latitude: number;
    longitude: number;
    color?: string;
    fill?: boolean;
    label?: string;
  }>>([]);
  const [showingAnswers, setShowingAnswers] = useState(false);
  const mapRef = useRef<any>(null);

  // Example location (Eiffel Tower)
  const correctLocation = {
    latitude: 48.8584,
    longitude: 2.2945
  };

  const handleMapClick = (e: MapLayerMouseEvent) => {
    if (showingAnswers) return;
    
    const lng = e.lngLat?.lng;
    const lat = e.lngLat?.lat;
    
    if (typeof lng === 'number' && typeof lat === 'number') {
      setMarkers([{
        longitude: lng,
        latitude: lat,
        color: 'text-blue-500',
        fill: true,
        label: 'Your Guess'
      }]);
    }
  };

  const handleReveal = async () => {
    if (!markers.length) return;

    setShowingAnswers(true);
    
    // Add correct location marker
    setMarkers(prev => [
      ...prev,
      {
        latitude: correctLocation.latitude,
        longitude: correctLocation.longitude,
        color: 'text-green-500',
        fill: true,
        label: 'Correct Location (Eiffel Tower)'
      }
    ]);

    // Animate to show both markers
    if (mapRef.current) {
      const bounds = new mapboxgl.LngLatBounds()
        .extend([markers[0].longitude, markers[0].latitude])
        .extend([correctLocation.longitude, correctLocation.latitude]);

      mapRef.current.fitBounds(bounds, {
        padding: 100,
        duration: 2000
      });
    }
  };

  const handleReset = () => {
    setMarkers([]);
    setShowingAnswers(false);
    
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [0, 20],
        zoom: 1.5,
        duration: 1000
      });
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">Map Demo</h1>
          </div>
          <p className="text-gray-300 mb-4">
            Click anywhere on the map to make a guess for the location of the Eiffel Tower.
            Then click "Reveal Answer" to see how close you were!
          </p>
          
          <div className="h-[500px] rounded-xl overflow-hidden mb-4">
            <MapComponent
              ref={mapRef}
              onMapClick={!showingAnswers ? handleMapClick : undefined}
              markers={markers}
              showLabels={showingAnswers}
              showMarkerLabels={showingAnswers}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleReveal}
              disabled={!markers.length || showingAnswers}
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 
                       disabled:bg-blue-800 disabled:cursor-not-allowed
                       text-white rounded-lg font-medium transition-colors"
            >
              Reveal Answer
            </button>
            
            <button
              onClick={handleReset}
              className="flex-1 py-3 px-4 bg-gray-600 hover:bg-gray-700 
                       text-white rounded-lg font-medium transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}