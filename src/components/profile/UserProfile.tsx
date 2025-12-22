"use client";

import { useState } from 'react';
import styles from '@/styles/pages/ProfilePage.module.css';
import { User } from '@/types';
import Button from '@/components/common/btn/Button';
import CreateEventModal from './CreateEventModal';
import EventNavigation from './EventNavigation';

interface Props {
  user: User;     // ✅ Данные профиля из Server Component
  userId: string; // ✅ ID из токена
  isOwner: boolean; // ✅ Флаг владельца
}

export default function UserProfileContent({ user, userId, isOwner }: Props) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className={styles.content}>
      <div className={styles.about}>
        <div className={styles.main_info}>
          <div 
            className={styles.avatar} 
            style={{ 
              backgroundImage: `url(${user.avatar || '/default-avatar.png'})` 
            }}
          />
          <div>
            <div className={styles.nickname}>
              {user.firstName || user.email || ''} {user.lastName}
            </div>
            <div className={styles.location}>
              {user.location || 'Не указан'}
            </div>
            <div className={styles.followers}>
              0 подписчиков ● 0 подписок
            </div>
          </div>
        </div>
        
        {isOwner && (
          <div className={styles.act_btns}>
            <Button 
              name="Создать событие" 
              func_type="create_event" 
              style="purple"
              onClick={() => setShowCreateModal(true)}
            />
            <Button name="Редактировать профиль" func_type="edit_profile" style="gray"/>
          </div>
        )}
        
        {user.bio && (
          <div className={styles.about_info}>
            {user.bio}
          </div>
        )}
      </div>
      
      <EventNavigation userId={userId} isOwner={isOwner} />
      
      {isOwner && showCreateModal && (
        <CreateEventModal 
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {}} // ✅ Пустая функция
        />
      )}
    </div>
  );
}
