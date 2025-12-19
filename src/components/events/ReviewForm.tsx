'use client'

import { useState } from 'react'
import { AuthModal } from './AuthModal'

interface Props {
  eventId: string
  isAuth: boolean
}

export function ReviewForm({ eventId, isAuth }: Props) {
  const [rating, setRating] = useState<number>(5)
  const [text, setText] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const submit = async () => {
    if (!isAuth) {
      setOpen(true)
      return
    }

    await fetch(`/api/events/${eventId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, text }),
    })

    setText('')
  }

  return (
    <div className="border rounded-xl p-4">
      <h3 className="font-medium mb-3">Оставить отзыв</h3>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border rounded p-2 mb-2"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded p-2"
        placeholder="Ваш отзыв"
      />

      <button
        onClick={submit}
        className="mt-3 bg-purple-600 text-white px-4 py-2 rounded"
      >
        Отправить
      </button>

      <AuthModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
