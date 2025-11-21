import styles from '@/styles/pages/EventsPage.module.css'
import { getEvents } from '@/lib/api/event-api'
import EventsClient from "@/components/events/EventsClient"

export default async function EventsPage() {
  const result = await getEvents();

  if (!result.ok) {
    return (
      <div className={styles.event_page}>
        <div className={styles.image}>
          <h1>Давай выбирать</h1>
        </div>

        <div className={styles.card_list}>
          Ошибка загрузки: {result.error.message}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.event_page}>
      <div className={styles.image}>
        <h1>Давай выбирать</h1>
      </div>

      <div className={styles.card_list}>
        <EventsClient events={result.data} />;
      </div>
    </div>
  );
}
