import { UUID } from "crypto";

export interface User {
  id: UUID;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  role: 'moderator' | 'user' | 'admin';
  avatar?: string;
  bio?: string;
  location?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
  isDeleted?: boolean;
  isActive?: boolean;
  organizedEvents: UUID[];
  registeredEvents: UUID[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscriprion {
  subscriberId: UUID;
  subscribedToId: UUID;
  createdAt: Date;
}


export const user: User = {
    id: '9c4f4801-b940-41de-be1c-5c710b811516',
    email: '123@mail.ru',
    firstName: 'Sophia',
    lastName: 'Bennett',
    gender: 'female',
    role: 'user',
    avatar: 'https://i.pinimg.com/736x/66/bf/e2/66bfe22533e51f7ee05d7dd8c431a0a6.jpg',
    bio: 'Event enthusiast and explorer. Always up for new adventures and meeting new people. Lets make some memories!',
    location: 'San Francisco, CA',
    organizedEvents: ['2bbdb11b-50e7-4a97-a1f7-dbafa9d1f299'],
    registeredEvents: ['2bbdb11b-50e7-4a97-a1f7-dbafa9d1f299'],
    createdAt: new Date(),
    updatedAt: new Date()
}