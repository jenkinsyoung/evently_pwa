'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Event } from '@/types/event'
import { AuthModal } from './AuthModal'
import Link from 'next/link'
import styles from '@/styles/pages/EventIdPage.module.css'

interface Props {
  event: Event
  isAuth: boolean
}

export function EventHeader({ event, isAuth }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleAttend = () => {
    if (!isAuth) {
      setIsOpen(true)
      return
    }

    // TODO: POST /events/:id/attend
  }

  return (
    <section className="space-y-6">
      <div className={styles.nav_container}>
        <Link href='/events'>События</Link> 
        <p>/</p>
        <h1 className="text-3xl font-semibold">{event.title}</h1>
      </div>
      <div className="relative h-[420px] rounded-2xl overflow-hidden">
        <div style={{backgroundImage: `url(${event.image})`}} />
      </div>

      <div className="flex flex-wrap gap-3">
        <span className="badge">#{event.category}</span>
        <span className="badge">📍 {event.location}</span>
        <span className="badge">📅 {event.date.getDate()}</span>
        <span className="badge">⏰ {event.date.getTime()}</span>
      </div>

      <p className="max-w-3xl text-gray-600">{event.description}</p>

      <button
        onClick={handleAttend}
        className="bg-purple-600 text-white px-6 py-3 rounded-xl"
      >
        Я иду
      </button>

      <AuthModal open={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  )
}
