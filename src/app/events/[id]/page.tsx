"use client"
import React from 'react'
import { event } from '@/types';
import styles from '@/styles/pages/EventIdPage.module.css'
import Link from 'next/link';
import Button from '@/components/common/Button';


function EventIdPage() {
  return (
    <div className={styles.container}>
      <div className={styles.nav_container}>
        <Link href='/events'>События</Link> 
        <p>/</p>
        <div className={styles.title_nav}>{event.title}</div>
      </div>

      <div className={styles.title}>{event.title}</div>
      <div className={styles.image} style={{backgroundImage: `url(${event.image})`}}/>

      <div className={styles.desc_act}>
        <h3>Описание</h3>
        <Button name='Я иду' func_type='submit' style='purple'/>
        <Button name='Поделиться' func_type='submit' style='gray' />
      </div>
    </div>
  )
}

export default EventIdPage