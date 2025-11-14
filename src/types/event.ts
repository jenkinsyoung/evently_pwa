import { User } from "./user";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  category: string[];
  price: number;
  image: string;
  organizer: User;
  capacity: number;
  status: 'pending' | 'approved' | 'finished' | 'canceled';
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventFilters {
  category?: string;
  date?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const event: Event = {
  id: '2bbdb11b-50e7-4a97-a1f7-dbafa9d1f299',
  title: 'Концерт рок-группы',
  description: 'Мощный концерт известной рок-группы',
  date: new Date('2024-10-15T19:00:00'),
  location: 'Москва, Крокус Сити Холл',
  coordinates: {
    lat: 55.7558,
    lng: 37.6173
  },
  price: 2500,
  image: 'https://png.pngtree.com/thumb_back/fh260/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg',
  organizer: {
    id: '9c4f4801-b940-41de-be1c-5c710b811516',
    firstName: 'Иван',
    lastName: 'Иванов',
    gender: 'male',
    role: 'user',
    email: 'ivan@example.com',
    organizedEvents: ['2bbdb11b-50e7-4a97-a1f7-dbafa9d1f299'],
    registeredEvents: ['2bbdb11b-50e7-4a97-a1f7-dbafa9d1f299'], 
    createdAt: new Date(),
    updatedAt: new Date()
  },
  capacity: 1000,
  category: ['рок', 'музыка', 'концерт'],
  status: 'approved',
  rating: 4.5,
  createdAt: new Date(),
  updatedAt: new Date()
};