// components/events/EventHeader.tsx
"use client";

import { Calendar, MapPin, Tag, Users, Ticket } from "lucide-react";
import type { Event } from "@/types/event";

interface EventHeaderProps {
  event: Event;
  isAuth: boolean;
}

export function EventHeader({ event, isAuth }: EventHeaderProps) {
  const start = new Date(event.startDate);

  return (
    <section className="bg-white rounded-3xl shadow-lg border border-[#F0E8F5] overflow-hidden">
      {/* Картинка */}
      {event.image && (
        <div className="w-full h-64 md:h-80 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6 md:p-8 space-y-6">
        {/* Заголовок + кнопка */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1F1F1F]">
              {event.title}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Возрастное ограничение: {event.ageRestriction}+ • Статус:{" "}
              <span className="font-medium text-[#A312ED]">
                {event.status === "approved" && "одобрено"}
                {event.status === "pending" && "на модерации"}
                {event.status === "finished" && "завершено"}
                {event.status === "canceled" && "отменено"}
              </span>
            </p>
          </div>

          {isAuth && (
            <button className="self-start md:self-auto px-6 py-2 rounded-xl bg-[#A312ED] text-white text-sm font-semibold hover:bg-[#8610c3] transition">
              Я иду
            </button>
          )}
        </div>

        {/* Квадратики‑инфо */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard
            icon={<Calendar className="w-5 h-5 text-[#A312ED]" />}
            title="Дата и время"
            text={start.toLocaleString("ru-RU", {
              day: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
          <InfoCard
            icon={<MapPin className="w-5 h-5 text-[#A312ED]" />}
            title="Место"
            text={event.location}
          />
          <InfoCard
            icon={<Tag className="w-5 h-5 text-[#A312ED]" />}
            title="Категории"
            text={
              event.categories?.length
                ? event.categories.map(c => c.name).join(", ")
                : "Не указаны"
            }
          />
          <InfoCard
            icon={<Users className="w-5 h-5 text-[#A312ED]" />}
            title="Вместимость"
            text={`${event.capacity} мест`}
            extra={
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <Ticket className="w-3 h-3" />
                <span>
                  {event.price ? `${event.price} ₽` : "Бесплатно"}
                </span>
              </div>
            }
          />
        </div>

        {/* Описание */}
        <div className="bg-[#F8F5FF] rounded-2xl p-4 md:p-5">
          <h2 className="text-sm font-semibold text-[#1F1F1F] mb-2">
            Описание
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </section>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  extra?: React.ReactNode;
}

function InfoCard({ icon, title, text, extra }: InfoCardProps) {
  return (
    <div className="h-full rounded-2xl border border-[#F0E8F5] bg-white/80 px-4 py-3 flex flex-col justify-between shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {title}
        </span>
      </div>
      <div className="text-sm text-[#1F1F1F]">
        {text}
      </div>
      {extra}
    </div>
  );
}
