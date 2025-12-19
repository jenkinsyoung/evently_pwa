'use client'

import { Review } from '@/types'
import { ReviewForm } from './ReviewForm'

interface Props {
  eventId: string
  reviews: Review[]
  isAuth: boolean
}

export function ReviewsSection({ eventId, reviews, isAuth }: Props) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Отзывы</h2>

      <ReviewForm eventId={eventId} isAuth={isAuth} />

      <ul className="mt-8 space-y-6">
        {reviews.map((review) => (
          <li key={review.id} className="border-b pb-4">
            <p className="font-medium">{review.user.firstName}</p>
            <p className="text-sm text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
            <p className="mt-2">{review.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
