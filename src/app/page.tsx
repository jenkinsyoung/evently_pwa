'use client'

import styles from '@/styles/pages/HomePage.module.css'
import { Description } from '@/components/common/DescBox'
import DescBox from '@/components/common/DescBox';
import Button from '@/components/common/btn/Button';

const events: Description[] = [
  {
    icon: 'm21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
    name: 'Поиск событий',
    description: 'Легко ищите местные события по вашим интересам, местоположению и дате'
  },
  {
    icon: 'M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z',
    name: 'Общайтесь с друзьями',
    description: 'Общайтесь с друзьями, делитесь своими планами и объединяйтесь для участия'
  },
  {
    icon: 'M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
    name: 'Управление профилем',
    description: 'Создавайте свои мероприятия, управляйте предпочтениями и историей событий'
  },
];


export default function Home() {
  
  return (
    <div className={styles.home_page}>
      <div className={styles.img_title}>
        <div className={styles.title}>Ку! Куда? - поиск локальных мероприятий и компании друзей</div>
        <div className={styles.description}>
          Найдите интересные события, происходящие рядом с вами, и общайтесь с друзьями, которые разделяют ваши интересы.
        </div>

        <div style={{marginTop: '40px'}}><Button name="Найти мероприятие" func_type="link_type" href_btn="/events" /></div>
      </div>

      <div className={styles.info_block}>
        {events.map((event, index) => (
        <div key={index}>
          <DescBox desc={event}></DescBox>
        </div>
      ))}
     </div>

      <div className={styles.slogan}>
          <h1>Готовы присоединиться?</h1>
          <div style={{marginTop: '19px', width: '279px'}}><Button name="Зарегистрироваться сейчас" func_type="link_type" href_btn="/register" /></div>
      </div>
      <div className={styles.popular}>Самые популярные события недели</div>
      <div className={styles.list_popular_events}>
        {events.map((event, index)=><div key={index}>
          <DescBox desc={event}></DescBox>
        </div>)}
      </div>
    </div>
  )
}