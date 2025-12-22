'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { NavigationItems } from '@/types/navigation';
import NotificationDropdown from '../Notification';
import { LogOut, User, ChevronDown } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Проверка авторизации
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    
    setIsAuthenticated(!!token);
  }, []);

  // Закрытие меню при смене пути
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    // Удаляем токен из cookies и localStorage
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.removeItem('token');
    
    // Закрываем все меню
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    
    // Редирект на главную
    router.push('/events');
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navItems: NavigationItems = [
    { id: 'home', label: 'мероприятия', href: '/events' },
    { id: 'about', label: 'карта', href: '/map' },
    { id: 'services', label: 'друзья', href: '/friends' }
  ];

  return (
    <header className="bg-white px-2 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <Link href="/" className="flex">
            <div className="text-2xl font-bold text-[#A312ED]">Evently</div>
          </Link>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center space-x-8">
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
            
            {/* Десктопный профиль */}
            <div className="relative">
              <div 
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-[#F0E8F5] cursor-pointer transition-all duration-200 group"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <ChevronDown 
                  className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                    isProfileOpen ? 'rotate-180' : ''
                  }`} 
                />
                <span className="text-sm font-medium text-[#1F1F1F] hidden lg:inline">
                  Профиль
                </span>
              </div>

              {/* Десктоп дропдаун */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <Link 
                    href="/account" 
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#F0E8F5] rounded-xl transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Мой профиль
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Выйти
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Мобильная панель */}
          <div className="md:hidden flex items-center gap-2">
            <NotificationDropdown />
            <button
              className="p-2 rounded-xl text-[#1F1F1F] hover:text-[#A312ED] hover:bg-[#F0E8F5]"
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
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t-3 border-[#F0E8F5]">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`block px-3 py-3 text-base font-medium transition-colors duration-200 rounded-xl ${
                  isActive(item.href)
                    ? 'text-[#A312ED] bg-[#F0E8F5]'
                    : 'text-[#1F1F1F] hover:text-[#A312ED] hover:bg-[#F0E8F5]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Мобильный профиль */}
            {isAuthenticated && (
              <div className="pt-2 border-t border-gray-200">
                <div 
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F0E8F5] cursor-pointer transition-all duration-200 group"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1F1F1F]">Профиль</p>
                    <p className="text-xs text-gray-500">Мой аккаунт</p>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-600 ml-auto transition-transform duration-200 ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </div>

                {/* Мобильный дропдаун профиля */}
                {isProfileOpen && (
                  <div className="px-3 mt-2 space-y-2 bg-gray-50 rounded-2xl py-3">
                    <Link 
                      href="/account" 
                      className="flex items-center gap-3 px-4 py-3 text-sm bg-white rounded-xl hover:bg-[#F0E8F5] transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsProfileOpen(false);
                      }}
                    >
                      <User className="w-4 h-4" />
                      Мой профиль
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 bg-white hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Выйти
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
