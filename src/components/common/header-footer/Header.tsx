'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationItems } from '@/types/navigation';
import NotificationDropdown from '../Notification';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Навигационные ссылки
  const navItems: NavigationItems = [
    { id: 'home', label: 'мероприятия', href: '/events' },
    { id: 'about', label: 'карта', href: '/map' },
    { id: 'services', label: 'друзья', href: '/friends' }
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white px-2 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <Link href="/" className="flex">
            <div className="text-2xl font-bold text-[#A312ED]">КуКуда</div>
          </Link>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-[#A312ED]'
                    : 'text-[#1F1F1F] hover:text-[#A312ED]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className='flex space-x-2'>
              {/* <Link href='/messages' className='w-10 h-10 rounded-xl'>
                <svg className="w-8 h-8 text-gray-800" width={40} height={40} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth={1} d='M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z' />
              </svg>
              </Link> */}
              <NotificationDropdown />
              <Link href='/account' className='w-10 h-10 rounded-xl'>
              <svg className="w-10 h-10 text-gray-800" width={40} height={40} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} d='M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
              </svg>
              </Link>
          
            </div>
          </nav>

          {/* Кнопка мобильного меню */}
          <div className="md:hidden">
          <NotificationDropdown />
          <button
            className="md:hidden p-2 rounded-md text-[#1F1F1F] hover:text-[#A312ED]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          </div>
          

          
        </div>
              
        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t-3 border-[#F0E8F5]">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-[#A312ED] border-l-4 border-[#F0E8F5]'
                      : 'text-[#1F1F1F] hover:text-[#A312ED] hover:bg-[#F0E8F5]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
