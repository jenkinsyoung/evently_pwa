// components/events/ReviewsSection.tsx
"use client";

import { useMemo, useState } from "react";
import { Star } from "lucide-react";

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  createdAt: string;
}

interface ReviewsSectionProps {
  eventId: string;
  reviews: Review[];
  isAuth: boolean;
}

export function ReviewsSection({ eventId, reviews, isAuth }: ReviewsSectionProps) {
  const { avgRating, counts, total } = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>;
    reviews.forEach(r => {
      if (r.rating >= 1 && r.rating <= 5) counts[r.rating]++;
    });
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = total ? sum / total : 0;
    return { avgRating: avg, counts, total };
  }, [reviews]);

  const [myRating, setMyRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const displayRating = (i: number) =>
    hoverRating ? i <= hoverRating : i <= myRating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!myRating || !comment.trim()) {
      setError("Поставьте оценку и напишите отзыв");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      // TODO: реальный POST /event/:id/reviews
      await fetch(`http://localhost:8000/event/${eventId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "" },
        body: JSON.stringify({ rating: myRating, comment }),
      });
      setMyRating(0);
      setHoverRating(0);
      setComment("");
      // опционально: обновить список отзывов через колбэк/перезагрузку
    } catch {
      setError("Не удалось отправить отзыв. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-[#F0E8F5] space-y-6">
      <h2 className="text-lg font-semibold text-[#1F1F1F]">
        Отзывы и рейтинг
      </h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* слева — рейтинг и график */}
        <div className="lg:w-1/3 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
          <div className="text-4xl font-bold text-[#1F1F1F]">
            {avgRating.toFixed(1)}
          </div>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.round(avgRating);
              return (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    filled ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              );
            })}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {total} отзывов
          </div>
        </div>

        <div className="lg:w-2/3 flex flex-col gap-4">
          {[5, 4, 3, 2, 1].map(star => {
            const count = counts[star];
            const percent = total ? (count / total) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3">
                <div className="flex items-center w-10">
                  <span className="text-xs text-gray-700 mr-1">{star}</span>
                  <Star className="w-3 h-3 text-gray-500" />
                </div>
                <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#A312ED] to-[#E03BFF] transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="w-10 text-xs text-right text-gray-500">
                  {count}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* форма отзыва */}
      {isAuth && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 border-t border-gray-100 pt-4 space-y-3"
        >
          <p className="text-sm font-medium text-[#1F1F1F]">
            Оцените событие и поделитесь впечатлением
          </p>

          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => {
              const index = i + 1;
              return (
                <button
                  key={index}
                  type="button"
                  onMouseEnter={() => setHoverRating(index)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setMyRating(index)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-7 h-7 ${
                      displayRating(index)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Расскажите, что вам понравилось или нет..."
            className="w-full min-h-[80px] rounded-2xl border border-[#E4D9F3] px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#A312ED] focus:border-transparent resize-vertical"
          />

          {error && (
            <p className="text-xs text-red-500">
              {error}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 rounded-xl bg-[#A312ED] text-white text-sm font-semibold hover:bg-[#8610c3] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Отправляем..." : "Отправить отзыв"}
            </button>
          </div>
        </form>
      )}

      {/* список отзывов */}
      <div className="mt-4 space-y-4 max-h-80 overflow-y-auto pr-1">
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500">
            Отзывов пока нет. Будьте первым!
          </p>
        ) : (
          reviews.map(review => (
            <div
              key={review.id}
              className="border border-gray-100 rounded-2xl p-4 bg-white/80"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString("ru-RU")}
                </span>
              </div>
              <p className="text-sm text-gray-800">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
