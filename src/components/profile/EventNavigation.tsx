"use client";

import { useState, useEffect, useCallback } from 'react';
import { CalendarClock, Clock, CheckCircle } from 'lucide-react';
import EventCardInProfile from './EventCardInProfile';
// import { getMyEvents, getMyAttendance } from '@/lib/api/event-api';
import { Event } from '@/types';
import styles from '@/styles/pages/EventNavigation.module.css';

interface Props {
  userId: string;
  isOwner: boolean;
}

export default function EventNavigation({ userId, isOwner }: Props) {
  const [activeTab, setActiveTab] = useState<'my' | 'going' | 'past'>('my');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
    //   let fetchedEvents: Event[] = [];
      
      if (activeTab === 'my') {
        // Мои мероприятия (организатор)
        // fetchedEvents = await getMyEvents();
      } else {
        // Я иду / Прошедшие
        // const attendanceEvents = await getMyAttendance();
        
        if (activeTab === 'going') {
          // Будущие события
          const now = new Date();
        //   fetchedEvents = attendanceEvents.filter(event => 
        //     new Date(event.startDate) > now
        //   );
        } else {
          // Прошедшие события
        //   const now = new Date();
        //   fetchedEvents = attendanceEvents.filter(event => 
        //     new Date(event.endDate) < now
        //   );
        }
      }
      
    //   setEvents(fetchedEvents);
    } catch (err) {
      setError('Ошибка загрузки событий');
      console.error('Event fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const tabs = [
    { id: 'my', label: 'Мои мероприятия', icon: CheckCircle },
    { id: 'going', label: 'Я иду', icon: CalendarClock },
    { id: 'past', label: 'Прошедшие', icon: Clock }
  ];

  return (
    <div className={styles.container}>
      {/* Табы навигации */}
      <div className={styles.tabs}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id as 'my' | 'going' | 'past')}
            >
              <Icon className={styles.tabIcon} size={20} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Состояние загрузки */}
      {loading && (
        <div className={styles.loading}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Загрузка событий...</p>
        </div>
      )}

      {/* Ошибка */}
      {error && !loading && (
        <div className={styles.error}>
          <p>{error}</p>
          <button 
            onClick={fetchEvents}
            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
          >
            Попробовать снова
          </button>
        </div>
      )}

      {/* Список событий */}
      {!loading && !error && events.length === 0 ? (
        <div className={styles.empty}>
          <CalendarClock className={styles.emptyIcon} size={48} />
          <h3 className={styles.emptyTitle}>
            {activeTab === 'my' ? 'Нет созданных событий' : 
             activeTab === 'going' ? 'Не записаны на события' : 
             'Нет прошедших событий'}
          </h3>
          <p className={styles.emptyText}>
            {activeTab === 'my' && isOwner 
              ? 'Создайте своё первое мероприятие!'
              : 'Запишитесь на интересные события'
            }
          </p>
        </div>
      ) : (
        <div className={styles.eventsGrid}>
          {events.map((event) => (
            <EventCardInProfile 
              key={event.id} 
              event={event}
              isOwner={isOwner && activeTab === 'my'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
