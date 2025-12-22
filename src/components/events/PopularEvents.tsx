import React from 'react'
import styles from '@/styles/pages/EventsPage.module.css'
import { getEvents } from '@/lib/api/event-api'
import EventCard from './EventCard';
export default async function PopularEvents() {
    const result = await getEvents();

  if (!result.ok) {
    return (
      <div className={styles.event_page}>
        <div className={styles.image}>
          <h1>Давай выбирать</h1>
        </div>

        <div className={styles.card_list}>
          Ошибка загрузки: {result.error.message}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-6 mt-6 m-auto justify-center">
            {result.data.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))}
    </div>
  )
}

