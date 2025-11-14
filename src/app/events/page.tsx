import EventCard from '@/components/events/EventCard'
import styles from '@/styles/pages/EventsPage.module.css'
import { getEvents } from '@/lib/api/event-api'

export default async function EventsPage(){
  const result =await getEvents();
   
  if (!result.ok){
    return  <div className={styles.event_page}>
      <div className={styles.image}>
        <h1>Давай выбирать</h1>
      </div>
      <div className={styles.card_list}>
       Ошибка загрузки: {result.error.message}
      </div>
    </div>
  }
  
  return (
    <div className={styles.event_page}>
      <div className={styles.image}>
        <h1>Давай выбирать</h1>
      </div>
      <div className={styles.card_list}>
        {result.data.map((event) => <EventCard key={event.id} event={event}/> )}
      </div>
    </div>
  )
}
