// app/events/[id]/page.tsx
import { cookies } from "next/headers";
import Link from "next/link";
import { getEventByID } from "@/lib/api/event-api";
import { getReviewsByEventId } from "@/lib/api/review-api";
import { EventHeader } from "@/components/events/EventHeader";
import { ReviewsSection } from "@/components/events/ReviewSection";

interface PageProps {
  params: { id: string };
}

async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return !!token;
}

export default async function EventPage({ params }: PageProps) {
  const session = await getSession();
  const { id } = params;

  const eventResult = await getEventByID(id);
  if (!eventResult.ok || !eventResult.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Событие не найдено
          </h2>
          <p className="text-gray-600 mb-6">
            Ошибка: {eventResult.error?.message || "Неизвестная ошибка"}
          </p>
          <Link
            href="/events"
            className="inline-block bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition-colors"
          >
            К событиям
          </Link>
        </div>
      </div>
    );
  }

  const reviewsResult = await getReviewsByEventId(id);

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen space-y-10">
      <EventHeader event={eventResult.data} isAuth={session} />

      <ReviewsSection
        eventId={eventResult.data.id}
        reviews={reviewsResult.ok ? reviewsResult.data : []}
        isAuth={session}
      />
    </main>
  );
}
