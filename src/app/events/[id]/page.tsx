import React from 'react'
import { sampleEvents } from '@/types';
import { sampleReviews } from '@/types';

import { getEventByID } from '@/lib/api/event-api'
import { EventHeader } from '@/components/events/EventHeader'
import { ReviewsSection } from '@/components/events/ReviewSection'
import { getSession } from '@/lib//api/auth'


interface PageProps {
params: { id: string }
}


export default async function EventPage({ params }: PageProps) {
const session = await getSession()
// const event = await getEventById(params.id)
// const reviews = await getReviews(params.id)
const reviews = sampleReviews
const event = sampleEvents[0]
return (
<main className="container mx-auto px-6 py-8">
<EventHeader event={event} isAuth={!!session} />
<ReviewsSection
eventId={event.id}
reviews={reviews}
isAuth={!!session}
/>
</main>
)
}