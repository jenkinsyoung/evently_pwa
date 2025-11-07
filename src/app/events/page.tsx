'use client'

import EventCard from '@/components/events/EventCard'
import styles from '@/styles/pages/EventsPage.module.css'
import React, { useEffect, useState } from 'react'
import { Event } from '@/types/event'
import { URL } from '@/utils/api'

function EventsPage(){
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

   
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setEvents(data);
    } catch (err) {      
      // Логирование ошибки
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading events...</div>
  }

  if (!events || events.length === 0) {
    return <div className="empty-state">No events found</div>
  }
  
  return (
    <div className={styles.event_page}>
      <div className={styles.image}>
        <h1>Давай выбирать</h1>
      </div>
      <div className={styles.card_list}>
        {events.map((event) => <EventCard key={event.id} event={event}/> )}
      </div>
    </div>
  )
}

export default EventsPage