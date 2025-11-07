'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationItems } from '@/types/navigation';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Навигационные ссылки
  const navItems: NavigationItems = [
    { id: 'home', label: 'мероприятия', href: '/events' },
    { id: 'about', label: 'карта', href: '/map' },
    { id: 'services', label: 'друзья', href: '/friends' },
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
              <div className='w-10 h-10 rounded-xl bg-[#D9D9D9]'></div>
              <div className='w-10 h-10 rounded-xl bg-[#D9D9D9]'></div>
          
            </div>
          </nav>

          {/* Кнопка мобильного меню */}
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
