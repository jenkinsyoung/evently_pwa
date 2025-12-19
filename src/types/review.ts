import { User } from "./user";
import { v4 as uuidv4 } from 'uuid';
export interface Review{
    id: string
    user: User
    rating: number // 1–5
    text: string
    createdAt: string
}

const generateDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const sampleUsers: User[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'alex.petrov@example.com',
    phone: '+79161234567',
    firstName: 'Алексей',
    lastName: 'Петров',
    gender: 'male' as const,
    role: 'user' as const,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'Любитель активного отдыха и путешествий',
    location: 'Москва',
    socialMedia: {
      instagram: '@alex_petrov',
      twitter: '@alex_p',
    },
    organizedEvents: [],
    registeredEvents: [],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-03-10'),
  },
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    email: 'maria.ivanova@example.com',
    phone: '+79031234567',
    firstName: 'Мария',
    lastName: 'Иванова',
    gender: 'female' as const,
    role: 'user' as const,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    bio: 'Организатор культурных мероприятий',
    location: 'Санкт-Петербург',
    socialMedia: {
      instagram: '@maria_ivanova',
    },
    organizedEvents: [],
    registeredEvents: [],
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2024-02-28'),
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'admin@evently.com',
    firstName: 'Администратор',
    lastName: 'Системы',
    gender: 'male' as const,
    role: 'admin' as const,
    isActive: true,
    organizedEvents: [],
    registeredEvents: [],
    createdAt: new Date('2022-11-01'),
    updatedAt: new Date('2024-03-15'),
  },
];

// Сгенерированные отзывы
export const sampleReviews: Review[] = [
  {
    id: uuidv4(),
    user: sampleUsers[0],
    rating: 5,
    text: 'Отличное мероприятие! Организация на высшем уровне, интересные спикеры и прекрасная атмосфера. Обязательно приду еще раз.',
    createdAt: generateDate(2),
  },
  {
    id: uuidv4(),
    user: sampleUsers[1],
    rating: 4,
    text: 'Хороший ивент, понравилось общение с участниками. Единственное - было немного тесно в главном зале. В остальном все супер!',
    createdAt: generateDate(5),
  },
  {
    id: uuidv4(),
    user: sampleUsers[0],
    rating: 3,
    text: 'Мероприятие неплохое, но ожидал больше практической информации. Спикеры слишком много времени уделяли теории.',
    createdAt: generateDate(10),
  },
  {
    id: uuidv4(),
    user: sampleUsers[1],
    rating: 5,
    text: 'Потрясающая энергетика! Отличная организация, вкусный фуршет и полезные нетворкинг-сессии. Рекомендую всем!',
    createdAt: generateDate(15),
  },
  {
    id: uuidv4(),
    user: sampleUsers[2],
    rating: 2,
    text: 'Разочарован. Обещали известных спикеров, но приехали их ассистенты. Организация хромает, постоянно что-то ломалось.',
    createdAt: generateDate(20),
  },
  {
    id: uuidv4(),
    user: sampleUsers[0],
    rating: 4,
    text: 'Солидное мероприятие для профессионалов. Много полезных контактов, качественный контент. Буду рекомендовать коллегам.',
    createdAt: generateDate(25),
  },
  {
    id: uuidv4(),
    user: sampleUsers[1],
    rating: 5,
    text: 'Лучший ивент в этой сфере! Все продумано до мелочей: от регистрации до закрытия. Особенно понравились воркшопы.',
    createdAt: generateDate(30),
  },
  {
    id: uuidv4(),
    user: sampleUsers[2],
    rating: 1,
    text: 'Полная катастрофа. Перенесли время в последний момент, отменили половину секций, а обещанные материалы так и не прислали.',
    createdAt: generateDate(35),
  },
];