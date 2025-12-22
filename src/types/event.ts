import { UUID } from "crypto";
import { Category } from "./category";
export interface Event {
  id: UUID;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  categories: Category[];
  price: number;
  image: string;
  organizerID: UUID;
  capacity: number;
  status: 'pending' | 'approved' | 'finished' | 'canceled';
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  ageRestriction: number;
}

export interface EventFilters {
  category?: string;
  date?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface CreateEventRequest{
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  price: number;
  capacity: number;
  ageRestriction: number;
  categoryIds: string[];
}

// const sampleOrganizers: User[] = [
//   {
//     id: '550e8400-e29b-41d4-a716-446655440001',
//     email: 'techcommunity@example.com',
//     firstName: 'Tech',
//     lastName: 'Community',
//     gender: 'male' as const,
//     role: 'user' as const,
//     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechOrg',
//     bio: 'Организуем IT-мероприятия в Москве',
//     location: 'Москва',
//     socialMedia: {
//       instagram: '@techcommunity_msk',
//       twitter: '@tech_msk',
//     },
//     organizedEvents: [],
//     registeredEvents: [],
//     createdAt: new Date('2022-05-10'),
//     updatedAt: new Date('2024-02-15'),
//   },
//   {
//     id: '6ba7b810-9dad-11d1-80b4-00c04fd430c9',
//     email: 'artgallery@example.com',
//     firstName: 'Арт',
//     lastName: 'Галерея',
//     gender: 'female' as const,
//     role: 'user' as const,
//     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArtGallery',
//     bio: 'Современное искусство и выставки',
//     location: 'Санкт-Петербург',
//     socialMedia: {
//       instagram: '@artgallery_spb',
//       facebook: 'artgallery.spb',
//     },
//     organizedEvents: [],
//     registeredEvents: [],
//     createdAt: new Date('2021-11-20'),
//     updatedAt: new Date('2024-03-01'),
//   },
//   {
//     id: '123e4567-e89b-12d3-a456-426614174003',
//     email: 'sportevents@example.com',
//     firstName: 'Спорт',
//     lastName: 'Экспо',
//     gender: 'male' as const,
//     role: 'user' as const,
//     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SportExpo',
//     bio: 'Спортивные мероприятия по всей России',
//     location: 'Казань',
//     socialMedia: {
//       instagram: '@sportexpo_rus',
//       twitter: '@sportexpo',
//     },
//     organizedEvents: [],
//     registeredEvents: [],
//     createdAt: new Date('2023-01-15'),
//     updatedAt: new Date('2024-02-28'),
//   },
//   {
//     id: '123e4567-e89b-12d3-a456-426614174004',
//     email: 'startupweekend@example.com',
//     firstName: 'Стартап',
//     lastName: 'Уикенд',
//     gender: 'male' as const,
//     role: 'moderator' as const,
//     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=StartupWeekend',
//     bio: 'Крупнейшие стартап-мероприятия в СНГ',
//     location: 'Минск',
//     organizedEvents: [],
//     registeredEvents: [],
//     createdAt: new Date('2020-08-05'),
//     updatedAt: new Date('2024-03-10'),
//   },
// ];

// Сгенерированные мероприятия
// export const sampleEvents: Event[] = [
//   {
//     id: uuid(),
//     title: 'Frontend Conf 2024',
//     description: 'Крупнейшая конференция по фронтенд-разработке в России. Доклады от ведущих специалистов, воркшопы, нетворкинг.',
//     date: new Date('2024-06-15T10:00:00'),
//     location: 'Москва, КВЦ "Сокольники", павильон 4',
//     coordinates: {
//       lat: 55.7938,
//       lng: 37.6764,
//     },
//     category: ['IT', 'Конференция', 'Разработка'],
//     price: 5000,
//     image: 'https://thumbs.dreamstime.com/b/watercolor-painting-depicting-nativity-scene-under-starry-night-sky-watercolor-painting-showing-nativity-scene-387832667.jpg',
//     organizer: sampleOrganizers[0],
//     capacity: 500,
//     status: 'approved',
//     rating: 4.8,
//     createdAt: new Date('2023-12-01'),
//     updatedAt: new Date('2024-02-20'),
//   },
//   {
//     id: 'event-002',
//     title: 'Выставка современного искусства "Новые горизонты"',
//     description: 'Экспозиция работ молодых художников и скульпторов. Интерактивные инсталляции, лекции об искусстве.',
//     date: new Date('2024-05-20T12:00:00'),
//     location: 'Санкт-Петербург, Невский проспект, 45',
//     coordinates: {
//       lat: 59.9343,
//       lng: 30.3351,
//     },
//     category: ['Искусство', 'Выставка', 'Культура'],
//     price: 300,
//     image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w-800&auto=format&fit=crop',
//     organizer: sampleOrganizers[1],
//     capacity: 200,
//     status: 'approved',
//     rating: 4.5,
//     createdAt: new Date('2024-01-15'),
//     updatedAt: new Date('2024-03-05'),
//   },
//   {
//     id: 'event-003',
//     title: 'Марафон "Белая ночь"',
//     description: 'Ежегодный ночной марафон по центру города. Дистанции 5км, 10км, 21км. Фестиваль бега для всех возрастов.',
//     date: new Date('2024-06-22T20:00:00'),
//     location: 'Казань, Кремлевская набережная',
//     coordinates: {
//       lat: 55.7961,
//       lng: 49.1064,
//     },
//     category: ['Спорт', 'Бег', 'Марафон'],
//     price: 1500,
//     image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
//     organizer: sampleOrganizers[2],
//     capacity: 3000,
//     status: 'pending',
//     rating: 4.7,
//     createdAt: new Date('2024-02-10'),
//     updatedAt: new Date('2024-03-12'),
//   },
//   {
//     id: 'event-004',
//     title: 'Стартап Weekend: Финансы и Финтех',
//     description: '48-часовой хакатон для создания финансовых стартапов. Призы от инвесторов, менторская поддержка.',
//     date: new Date('2024-04-12T09:00:00'),
//     location: 'Минск, ул. Кульман, 1, Коворкинг "Imaguru"',
//     coordinates: {
//       lat: 53.9045,
//       lng: 27.5615,
//     },
//     category: ['Стартапы', 'Финтех', 'Хакатон'],
//     price: 0,
//     image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop',
//     organizer: sampleOrganizers[3],
//     capacity: 150,
//     status: 'approved',
//     rating: 4.9,
//     createdAt: new Date('2023-11-20'),
//     updatedAt: new Date('2024-02-25'),
//   },
//   {
//     id: 'event-005',
//     title: 'Мастер-класс по итальянской кухне',
//     description: 'Учимся готовить настоящую пиццу и пасту от шеф-повара из Италии. Все ингредиенты включены в стоимость.',
//     date: new Date('2024-03-30T18:00:00'),
//     location: 'Москва, ул. Тверская, 25, Кулинарная студия "Вкусно"',
//     coordinates: {
//       lat: 55.7616,
//       lng: 37.6095,
//     },
//     category: ['Кулинария', 'Мастер-класс', 'Развлечение'],
//     price: 2500,
//     image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&auto=format&fit=crop',
//     organizer: sampleOrganizers[0],
//     capacity: 20,
//     status: 'finished',
//     rating: 4.6,
//     createdAt: new Date('2024-01-10'),
//     updatedAt: new Date('2024-03-01'),
//   },
//   {
//     id: 'event-006',
//     title: 'Йога в парке: Весенняя серия',
//     description: 'Еженедельные занятия йогой на свежем воздухе для всех уровней подготовки. Коврики предоставляются.',
//     date: new Date('2024-04-07T08:00:00'),
//     location: 'Санкт-Петербург, Летний сад',
//     category: ['Спорт', 'Йога', 'Здоровье'],
//     price: 500,
//     image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop',
//     organizer: sampleOrganizers[1],
//     capacity: 50,
//     status: 'approved',
//     rating: 4.4,
//     createdAt: new Date('2024-02-20'),
//     updatedAt: new Date('2024-03-08'),
//   },
//   {
//     id: 'event-007',
//     title: 'Фестиваль электронной музыки "Pulse"',
//     description: 'Масштабный фестиваль с участием мировых диджеев. 3 сцены, лазерное шоу, арт-инсталляции.',
//     date: new Date('2024-07-20T22:00:00'),
//     location: 'Москва, Лужники, Большая спортивная арена',
//     coordinates: {
//       lat: 55.7158,
//       lng: 37.5538,
//     },
//     category: ['Музыка', 'Фестиваль', 'Развлечение'],
//     price: 3500,
//     image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop',
//     organizer: sampleOrganizers[3],
//     capacity: 10000,
//     status: 'pending',
//     rating: 4.3,
//     createdAt: new Date('2023-12-15'),
//     updatedAt: new Date('2024-03-10'),
//   },
//   {
//     id: 'event-008',
//     title: 'Бизнес-завтрак: Digital Marketing 2024',
//     description: 'Обсуждение трендов цифрового маркетинга с экспертами рынка. Нетворкинг за завтраком.',
//     date: new Date('2024-03-25T09:00:00'),
//     location: 'Казань, ул. Баумана, 30, Отель "Корстон"',
//     coordinates: {
//       lat: 55.7905,
//       lng: 49.1215,
//     },
//     category: ['Бизнес', 'Маркетинг', 'Нетворкинг'],
//     price: 2000,
//     image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop',
//     organizer: sampleOrganizers[2],
//     capacity: 80,
//     status: 'canceled',
//     rating: 0,
//     createdAt: new Date('2024-01-30'),
//     updatedAt: new Date('2024-03-15'),
//   },
//   {
//     id: 'event-009',
//     title: 'Воркшоп по цифровой иллюстрации',
//     description: 'Практическое занятие по созданию иллюстраций в Procreate и Photoshop. Для начинающих и продолжающих.',
//     date: new Date('2024-05-05T14:00:00'),
//     location: 'Минск, пр-т Независимости, 58, Креативное пространство "OK16"',
//     coordinates: {
//       lat: 53.9172,
//       lng: 27.5990,
//     },
//     category: ['Дизайн', 'Обучение', 'Творчество'],
//     price: 1800,
//     image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&auto=format&fit=crop',
//     organizer: sampleOrganizers[3],
//     capacity: 30,
//     status: 'approved',
//     rating: 4.7,
//     createdAt: new Date('2024-02-05'),
//     updatedAt: new Date('2024-03-03'),
//   },
//   {
//     id: 'event-010',
//     title: 'Благотворительный забег "Дети вместо цветов"',
//     description: 'Забег в поддержку детского хосписа. Все собранные средства пойдут на помощь тяжелобольным детям.',
//     date: new Date('2024-09-01T11:00:00'),
//     location: 'Москва, Парк Горького',
//     coordinates: {
//       lat: 55.7289,
//       lng: 37.6027,
//     },
//     category: ['Благотворительность', 'Спорт', 'Социальное'],
//     price: 0,
//     image: 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=800&auto=format&fit=crop',
//     organizer: sampleOrganizers[0],
//     capacity: 1000,
//     status: 'pending',
//     rating: 5.0,
//     createdAt: new Date('2023-10-15'),
//     updatedAt: new Date('2024-02-28'),
//   },
// ];