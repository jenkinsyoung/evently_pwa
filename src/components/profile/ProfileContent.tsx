"use client"

import styles from '@/styles/pages/ProfilePage.module.css'
import {User} from '@/types'
import { useState, useEffect } from 'react'
import EventCard from '@/components/events/EventCard'
import { Event } from '@/types'
import Button from '@/components/common/btn/Button'
interface Props {
  user: User
}

export function ProfileContent({ user }: Props){
    return(
        <div className={styles.content}>
            <div className={styles.about}>
                <div className={styles.main_info}>
                    <div className={styles.avatar} style={{backgroundImage: `url(${user.avatar})`}}/>
                    <div >
                        <div className={styles.nickname}>
                        {user.firstName} {user.lastName}
                        </div>
                        <div className={styles.location}>
                            {user.location}
                        </div>
                        <div className={styles.followers}>
                            {0} подписчиков ● {0} подписок
                        </div>
                    </div>
                </div>
                <div className={styles.act_btns}>
                    <Button name = 'Подписаться' func_type = 'create_event' style='gray'/>
                    <Button name = 'Отправить сообщение' func_type = 'edit_profile'/>
                </div>
                <div className={styles.about_info}>
                    {user.bio} 
                </div>
            </div>
            <EventsInProfile />

        </div>
    )
}

function EventsInProfile(){
    return(
        <div>
            <EventNavigation />
        </div>
    )
}

const fetchEvents = async (category: string): Promise<Event[]> => {
const res = await fetch(`/api/events?category=${category}`);
return res.json();
};


function EventNavigation() {
    const [activeTab, setActiveTab] = useState("my");
    const [events, setEvents] = useState<Event[]>([]);


    useEffect(() => {
    fetchEvents(activeTab).then(setEvents);
    }, [activeTab]);


    return (
        <div className="w-full p-6">
            <div className="flex justify-center gap-10 mb-6 text-lg font-semibold">
            <button
            className={activeTab === "my" ? "text-purple-600" : "text-gray-500"}
            onClick={() => setActiveTab("my")}
            >
            Мои мероприятия
            </button>
            <button
            className={activeTab === "going" ? "text-purple-600" : "text-gray-500"}
            onClick={() => setActiveTab("going")}
            >
            Я иду
            </button>
            <button
            className={activeTab === "past" ? "text-purple-600" : "text-gray-500"}
            onClick={() => setActiveTab("past")}
            >
            Прошедшие события
            </button>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
            <EventCard event={event} key={event.id} />
            ))}
            </div>
        </div>
    );
}