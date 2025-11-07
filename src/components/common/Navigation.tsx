'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './Navigation.module.css'
import { user } from '@/types'
const navItems = [
  { id: 'home', label: 'Главная страница', href: '/events', img: 'm4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5' },
  { id: 'my_events', label: 'Мои мероприятия', href: '/my-events', img: 'M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z' },
  { id: 'friends', label: 'Друзья', href: '/friends', img: 'M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' },
  { id: 'messages', label: 'Сообщения', href: '/messages', img: 'M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z' },
  { id: 'my_profile', label: 'Профиль', href: '/account', img: 'M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' },
];

export default function Navigation() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

  return (
    <>
      {/* Десктопная навигация */}
      <nav className={styles.desktop_nav}>
        <div className={styles.profile}>
          <div className={styles.img_user} style={{backgroundImage: `url(${user.avatar})`}} />
          <div className={styles.user_name}>{user.firstName} {user.lastName}</div>
        </div>
        {navItems.map((item) => (
          <Link key={item.id} href={item.href}>
            <div className={`${styles.desktop_nav_elem} ${
              isActive(item.href)
                ? 'rounded-[12px] bg-[rgba(242,240,245,1)]'
                : 'hover:bg-[rgba(242,240,245,1)] hover:rounded-[12px]'
            }`}>
              <svg className="w-6 h-6 text-gray-800" width={24} height={24} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth={1} d={item.img} />
              </svg>
              <div className={styles.nav_elem}>{item.label}</div>
            </div>
          </Link>
        ))}
      </nav>

      {/* Мобильное меню */}
      <div className={styles.mobile_menu}>
        <button
          className="md:hidden  rounded-md text-[#1F1F1F] hover:text-[#A312ED]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
           
          </svg>
        </button>
        <div className={styles.page_title}>
          <h1>{pathname}</h1>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white z-50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className={styles.profile}>
                    <button
                        className="md:hidden p-2 rounded-md text-[#1F1F1F] hover:text-[#A312ED]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                <div className={styles.img_user} style={{backgroundImage: `url(${user.avatar})`}} />
                <div className={styles.user_name}>{user.firstName} {user.lastName}</div>
              </div>
              {navItems.map((item) => (
                <Link key={item.id} href={item.href} onClick={() => setIsMenuOpen(false)}>
                  <div className={`${styles.desktop_nav_elem} ${
                    isActive(item.href)
                      ? 'rounded-[12px] bg-[rgba(242,240,245,1)]'
                      : 'hover:bg-[rgba(242,240,245,1)] hover:rounded-[12px]'
                  }`}>
                    <svg className="w-6 h-6 text-gray-800" width={24} height={24} fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth={1} d={item.img} />
                    </svg>
                    <div className={styles.nav_elem}>{item.label}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}