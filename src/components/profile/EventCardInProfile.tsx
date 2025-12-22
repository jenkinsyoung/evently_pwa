"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Event } from '@/types';
import { Edit3, Calendar, MapPin, Users, DollarSign, Ticket } from 'lucide-react';
import styles from '@/components/events/EventCard.module.css';

interface Props {
  event: Event;
  isOwner?: boolean;
}

export default function EventCardInProfile({ event, isOwner = false }: Props) {
  const startDate = new Date(event.startDate);
  const isPast = new Date(event.endDate) < new Date();
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Link href={`/events/${event.id}`} className={styles.card}>
      {/* Изображение */}
      <div className={styles.imageContainer}>
        <Image
          src={event.image || '/event-placeholder.jpg'}
          alt={event.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {isPast && (
          <div className={styles.pastBadge}>
            Прошло
          </div>
        )}
      </div>

      {/* Контент */}
      <div className={styles.content}>
        {/* Заголовок и статус */}
        <div className={styles.header}>
          <h3 className={styles.title}>{event.title}</h3>
          
          {isOwner && (
            <div className={styles.ownerActions}>
              <button className={styles.editBtn}>
                <Edit3 size={16} />
                <span>Редактировать</span>
              </button>
            </div>
          )}
        </div>

        {/* Дата и время */}
        <div className={styles.dateRow}>
          <Calendar size={16} className={styles.icon} />
          <span className={styles.date}>{formatDate(startDate)}</span>
        </div>

        {/* Место */}
        <div className={styles.locationRow}>
          <MapPin size={16} className={styles.icon} />
          <span className={styles.location}>{event.location}</span>
        </div>

        {/* Категории */}
        {event.categories && event.categories.length > 0 && (
          <div className={styles.categories}>
            {event.categories.slice(0, 2).map((cat, index) => (
              <span key={cat.id} className={styles.category}>
                {cat.name}
                {index < 1 && event.categories!.length > 1 && <span className={styles.categorySeparator}>●</span>}
              </span>
            ))}
            {event.categories.length > 2 && (
              <span className={styles.categoryMore}>+{event.categories.length - 2}</span>
            )}
          </div>
        )}

        {/* Нижняя панель */}
        <div className={styles.footer}>
          <div className={styles.priceCapacity}>
            <div className={styles.price}>
              <DollarSign size={14} />
              <span>{event.price ? `${event.price}₽` : 'Бесплатно'}</span>
            </div>
            <div className={styles.capacity}>
              <Users size={14} />
              <span>{event.capacity} мест</span>
            </div>
          </div>
          
          {isOwner ? (
            <div className={styles.ownerStatus}>
              <span className={styles.status}>Организатор</span>
            </div>
          ) : (
            <div className={styles.action}>
              <Ticket size={16} />
              <span>Записаться</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
