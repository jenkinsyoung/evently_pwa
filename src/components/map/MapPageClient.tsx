// components/map/MapPageClient.tsx
"use client";

import { useEffect, useState } from "react";
import type { Event } from "@/types/event";
import EventsMap from "./EventsMap";

export default function MapPageClient() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:8000/event");
        const data = await res.json();
        setEvents(
          data.map((e: Event) => ({
            id: e.id,
            title: e.title,
            description: e.description,
            startDate: e.startDate,
            endDate: e.endDate,
            location: e.location,
            coordinates: e.coordinates,
            categories: e.categories ?? [],
            price: e.price,
            image: e.image ?? "",
            organizerID: e.organizerID,
            capacity: e.capacity,
            status: e.status,
            rating: e.rating ?? 0,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
            ageRestriction: e.ageRestriction,
          }))
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="w-full h-[calc(100vh-64px)] flex flex-col">
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-[#1F1F1F]">
          Карта мероприятий
        </h1>
        <p className="text-sm text-gray-500">
          Нажмите на кружок, чтобы открыть событие
        </p>
      </div>

      <div className="flex-1 px-4 pb-4">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Загрузка карты...
          </div>
        ) : (
          <EventsMap events={events} />
        )}
      </div>
    </div>
  );
}
