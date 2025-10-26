"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

interface GoogleMapProps {
  latitude?: string;
  longitude?: string;
  location?: string;
}

export default function GoogleMap({
  latitude = "38.7223",
  longitude = "-9.1393",
  location = "Lisboa, Portugal",
}: GoogleMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Construct Google Maps Embed URL with coordinates
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&hl=pt-PT&z=15&output=embed`;

  // Alternative: Use Google Maps search URL for opening in new tab
  const searchUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-10">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-4 animate-pulse" />
            <p className="text-sm font-medium">A carregar mapa...</p>
          </div>
        </div>
      )}

      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Fallback: Open in new tab */}
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 px-4 py-2 bg-white rounded-full shadow-lg text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-2 z-20"
      >
        <MapPin size={16} />
        Ver no Google Maps
      </a>
    </div>
  );
}
