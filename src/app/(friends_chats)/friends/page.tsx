'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import styles from '@/styles/pages/FriendsPage.module.css'
import SearchBar from '@/components/common/SearchBar'

function FriendsPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  return (
    <div className={styles.friends_page}>
      <div className={styles.header}>
        <div className={styles.page_title}>
          <h1>Друзья</h1>
        </div>
        <SearchBar />
      </div>
      
      <div className={styles.friends}>
        {/* Контент страницы друзей */}
        <p>Здесь будет список друзей...</p>
        
        {/* {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <FriendsList friends={friends} searchQuery={searchQuery} />
        )} */}
      </div>
    </div>
  )
}

export default FriendsPage