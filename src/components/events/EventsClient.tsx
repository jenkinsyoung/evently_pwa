"use client";

import { useState } from "react";
import EventFilters from "./EventFilters";
import EventCard from "./EventCard";
import type { Event } from "@/types";

interface Props {
  events: Event[];
}

export default function EventsClient({ events }: Props) {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);

  return (
    <div className="p-6 w-full flex flex-col items-center">

      <EventFilters events={events} onFiltered={setFilteredEvents} />

      <div className="flex flex-wrap gap-6 mt-6 m-auto justify-center">
        {filteredEvents.map((ev) => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </div>

    </div>
  );
}
