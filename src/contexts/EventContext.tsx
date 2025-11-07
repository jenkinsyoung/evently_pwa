'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Event, EventFilters } from '@/types'

interface EventContextType {
  events: Event[]
  loading: boolean
  error: string | null
  filters: EventFilters
  setFilters: (filters: EventFilters) => void
  refetch: () => void
}

const EventContext = createContext<EventContextType | undefined>(undefined)

export const useEvent = () => {
  const context = useContext(EventContext)
  if (context === undefined) {
    throw new Error('useEvent must be used within an EventProvider')
  }
  return context
}

interface EventProviderProps {
  children: ReactNode
}

export default function EventProvider({ children }: EventProviderProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<EventFilters>({})

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const queryParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value.toString())
        }
      })

      const response = await fetch(`https://raw.githubusercontent.com/jenkinsyoung/database-json/refs/heads/main/evently.json`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }

      const data = await response.json()
      setEvents(data.events || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [filters])

  const value: EventContextType = {
    events,
    loading,
    error,
    filters,
    setFilters,
    refetch: fetchEvents
  }

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  )
}