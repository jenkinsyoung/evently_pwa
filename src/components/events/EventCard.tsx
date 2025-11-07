'use client'

import { Event } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import styles from './EventCard.module.css'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`}>
      <div className={styles.card}>
        <div className={styles.creator_info}>
          <div className={styles.avatar} />
          <div className={styles.user_name}>
            {/* user name */}
            {event.organizer.firstName} 
          </div>
        </div>
        <div className={styles.categories_info}>
          {event.category.map((tag, index) => <div key={tag} className={styles.category_info}>
            {index != 0 ? <div style={{marginRight: "11px"}}><Image
              src='/images/category.png'
              width={7}
              height={7}
              alt=""
            /></div> : <></>}   
            <div className={styles.category}>{tag}</div>
            </div>)}
        </div>
        <div className={styles.title}>
          {event.title}
        </div>
        <div className={styles.date_info}>
{/* TO DO FUNCTION */} ВРЕМЯ СДЕЛАТЬ ФУНКЦИЮ
        </div>
        <div className={styles.location_info}>
            {event.location}
        </div>
        <div className={styles.image_event} style={{backgroundImage: `url(${event.image})`}} />
        <div className={styles.addition_info}>
          <div className={styles.rating_block}>
            <div className={styles.star} />
            <div className={styles.rating}>
              {event.rating}
            </div>
          </div>
          <div className={styles.capacity_block}>
            <div className={styles.people}/>
            <div className={styles.num_people}>
              1000/10 TD
            </div>
          </div>
          <div className={styles.price_block}>
            <div className={styles.price}>
              {event.price} ₽
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}