'use client'

import { Event } from '@/types'
import EventCard from './EventCard'

interface EventListProps {
  events?: Event[]
  searchQuery?: string
  filters?: {
    category?: string
    date?: string
    location?: string
    price?: string
  }
}

export default function EventList({ events = [], searchQuery = '', filters }: EventListProps) {
  // Фильтрация событий по поисковому запросу и фильтрам
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = !filters?.category || event.category === filters.category
    const matchesLocation = !filters?.location || event.location.includes(filters.location)
    
    return matchesSearch && matchesCategory && matchesLocation
  })

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Мероприятия не найдены</p>
        <p className="text-gray-400">Попробуйте изменить параметры поиска</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredEvents.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}