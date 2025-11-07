'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import EventList from '@/components/events/EventList'
import { Event } from '@/types/event'

function MyEventsContent() {
  const { user } = useAuth()
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([])

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/users/${user.id}/events`)
          const data: Event[] = await response.json()
          setRegisteredEvents(data)
        } catch (error) {
          console.error('Ошибка загрузки мероприятий:', error)
        }
      }
    }

    fetchRegisteredEvents()
  }, [user])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Мои мероприятия</h1>
        <p className="text-gray-600">События, на которые вы зарегистрировались</p>
      </div>

      {registeredEvents.length > 0 ? (
        <EventList events={registeredEvents} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Вы еще не зарегистрировались ни на одно мероприятие</p>
        </div>
      )}
    </div>
  )
}

export default function MyEventsPage() {
  return (
    <ProtectedRoute>
      <MyEventsContent />
    </ProtectedRoute>
  )
}