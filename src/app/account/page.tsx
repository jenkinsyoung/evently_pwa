import React from 'react';
import UserProfileContent from '@/components/profile/UserProfile';
import { getUserByID } from '@/lib/api/user-api';
import { cookies } from 'next/headers';
import { Link } from 'lucide-react';

async function getCurrentUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  } catch {
    return null;
  }
}

export default async function AccountPage() {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Войдите в аккаунт</h1>
          <a href="/auth/login" className="bg-purple-600 text-white px-6 py-2 rounded-xl">
            Войти
          </a>
        </div>
      </div>
    );
  }

  const result = await getUserByID(userId);
  
  if (!result.ok || !result.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Профиль не найден</h1>
          id = {userId}
          <Link href="/events" className="bg-gray-600 text-white px-6 py-2 rounded-xl">
            На главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <UserProfileContent 
      user={result.data}    // ✅ Готовые данные
      userId={userId}       // ✅ ID из токена
      isOwner={true}        // ✅ Всегда свой профиль
    />
  );
}
