"use client";

import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

interface MapProps {
  lat: number;
  lng: number;
  apiKey?: string;
}

export default function GoogleMap({ lat, lng }: MapProps) {
  const position = { lat: Number(lat), lng: Number(lng) };

  return (
    <div className="w-full h-[320px] lg:h-full min-h-[400px] rounded-xl overflow-hidden shadow-md">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Map
          defaultCenter={position}
          defaultZoom={15}
          mapId="MAP_ID"
          gestureHandling={'greedy'}
          disableDefaultUI={false}
        >
          <AdvancedMarker position={position}>
            <Pin background={'#var(--primary-color)'} glyphColor={'#fff'} borderColor={'#000'} />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
}