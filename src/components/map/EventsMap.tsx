// components/map/EventsMap.tsx
"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Event } from "@/types/event";
import { useMemo } from "react";

interface EventsMapProps {
  events: Event[];
}

export default function EventsMap({ events }: EventsMapProps) {
  const center = useMemo<[number, number]>(() => {
    const withCoords = events.filter(e => e.coordinates);
    if (!withCoords.length) return [55.751244, 37.618423];

    const latSum = withCoords.reduce((acc, e) => acc + (e.coordinates!.lat), 0);
    const lngSum = withCoords.reduce((acc, e) => acc + (e.coordinates!.lng), 0);
    return [latSum / withCoords.length, lngSum / withCoords.length];
  }, [events]);

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg border border-[#F0E8F5]">
      <MapContainer
        center={center}
        zoom={11}
        scrollWheelZoom
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {events.map(event => {
          if (!event.coordinates) return null;
          return (
            <CircleMarker
              key={event.id}
              center={[event.coordinates.lat, event.coordinates.lng]}
              pathOptions={{
                color: "#A312ED",
                fillColor: "#A312ED",
                fillOpacity: 0.9,
              }}
            >
              <Popup>
                <div className="space-y-1">
                  <div className="font-semibold text-sm text-[#1F1F1F]">
                    {event.title}
                  </div>
                  <div className="text-xs text-gray-600">
                    {new Date(event.startDate).toLocaleString("ru-RU", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="text-xs text-gray-500">
                    {event.location}
                  </div>
                  <a
                    href={`/events/${event.id}`}
                    className="inline-flex mt-2 px-3 py-1 rounded-full bg-[#A312ED] text-white text-xs font-medium hover:bg-[#8610c3] transition"
                  >
                    Открыть событие
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
