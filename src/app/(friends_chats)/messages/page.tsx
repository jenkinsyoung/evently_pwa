'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import styles from '@/styles/pages/MessagesPage.module.css'
import SearchBar from '@/components/common/SearchBar'

function MessagesPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  return (
    <div className={styles.messages_page}>
      <div className={styles.header}>
        <div className={styles.page_title}>
          <h1>Сообщения</h1>
        </div>
        <SearchBar />
      </div>
      
      <div className={styles.messages}>
        {/* Контент страницы сообщений */}
        <p>Здесь будут сообщения...</p>
      </div>
    </div>
  )
}

export default MessagesPage