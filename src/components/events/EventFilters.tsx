"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DateRange } from "react-date-range";
import { Range } from "react-range";
import type { Event } from "@/types";

interface Props {
  events: Event[];
  onFiltered: (filtered: Event[]) => void; // реактивная передача карточек вверх
}

export default function EventFilters({ events, onFiltered }: Props) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // поиск
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  // дата
  const [date, setDate] = useState<{ startDate: Date; endDate: Date } | null>(
    null
  );

  // цена
  const priceMin = 0;
  const priceMax = Math.max(...events.map((e) => e.price));
  const [price, setPrice] = useState<[number, number]>([
    priceMin,
    priceMax,
  ]);

  // категории
  const allCategories = Array.from(new Set(events.flatMap((e) => e.category)));
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [catSearch, setCatSearch] = useState("");

  // сброс всех фильтров
  const resetAll = () => {
    setSearch("");
    setDate(null);
    setPrice([priceMin, priceMax]);
    setSelectedCategories([]);
    setIsSearchOpen(false);
    setActiveFilter(null);
  };

  // реактивная фильтрация
  const filtered = useMemo(() => {
    return events.filter((ev) => {
      const text = search.toLowerCase();
      const matchSearch =
        ev.title.toLowerCase().includes(text) ||
        ev.description.toLowerCase().includes(text) ||
        ev.location.toLowerCase().includes(text) ||
        ev.category.some((c) => c.toLowerCase().includes(text)) ||
        `${ev.organizer.firstName} ${ev.organizer.lastName}`
          .toLowerCase()
          .includes(text);

      if (!matchSearch) return false;

      if (date) {
        const d = new Date(ev.date);
        if (d < date.startDate || d > date.endDate) return false;
      }

      if (ev.price < price[0] || ev.price > price[1]) return false;

      if (selectedCategories.length > 0) {
        if (!ev.category.some((c) => selectedCategories.includes(c))) {
          return false;
        }
      }

      return true;
    });
  }, [events, search, date, price, selectedCategories]);

  // отправить карточки наружу
  useMemo(() => onFiltered(filtered), [filtered]);

  // UI-кнопки
  const filterButtons = [
    { key: "popular", label: "ПОПУЛЯРНОЕ" },
    { key: "date", label: "ПО ДАТЕ" },
    { key: "price", label: "ПО ЦЕНЕ" },
    { key: "categories", label: "ПО КАТЕГОРИЯМ" },
  ];

  const isSearchActive = search.trim().length > 0;

  return (
    <div className="flex flex-col items-center gap-4 w-full">

      {/* === КНОПКИ ФИЛЬТРОВ === */}
      <div className="flex gap-3 justify-center flex-wrap">

        {/* ВСЕ СОБЫТИЯ */}
        <button
          onClick={resetAll}
          className={`px-4 py-2 rounded-xl border font-medium transition ${
            !isSearchActive &&
            !date &&
            price[0] === priceMin &&
            price[1] === priceMax &&
            selectedCategories.length === 0
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          ВСЕ СОБЫТИЯ
        </button>

        {filterButtons.map((btn) => {
          const active =
            (btn.key === "date" && date) ||
            (btn.key === "price" &&
              (price[0] !== priceMin || price[1] !== priceMax)) ||
            (btn.key === "categories" && selectedCategories.length > 0) ||
            btn.key === activeFilter;

          return (
            <button
              key={btn.key}
              onClick={() =>
                setActiveFilter(activeFilter === btn.key ? null : btn.key)
              }
              className={`px-4 py-2 rounded-xl border font-medium transition ${
                active
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {btn.label}
            </button>
          );
        })}

        {/* ИСКАТЬ */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className={`px-4 py-2 rounded-xl border font-medium transition ${
            isSearchActive
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          ИСКАТЬ
        </button>
      </div>

      {/* === СТРОКА ПОИСКА === */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full max-w-lg overflow-hidden"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Введите название, место, описание или организатора"
              className="w-full px-4 py-3 border rounded-xl mt-2"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* === ВЫПАДАЮЩИЕ ФИЛЬТРЫ === */}
      <AnimatePresence>
        {/* дата */}
        {activeFilter === "date" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="bg-white border shadow-lg rounded-xl p-4"
          >
            <DateRange
              ranges={[
                {
                  startDate: date?.startDate ?? new Date(),
                  endDate: date?.endDate ?? new Date(),
                  key: "selection",
                },
              ]}
              onChange={(r) => {
                setDate({
                  startDate: r.selection.startDate!,
                  endDate: r.selection.endDate!,
                });
              }}
              moveRangeOnFirstSelection={false}
            />
            <button className="text-red-500 mt-2" onClick={() => setDate(null)}>
              Сбросить дату
            </button>
          </motion.div>
        )}

        {/* цена */}
        {activeFilter === "price" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="bg-white border shadow-lg rounded-xl p-4 w-80"
          >
            <Range
              step={100}
              min={priceMin}
              max={priceMax}
              values={price}
              onChange={(v) => setPrice([v[0], v[1]])}
              renderTrack={({ props, children }) => (
                <div {...props} className="h-2 bg-gray-200 rounded">
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="w-4 h-4 bg-purple-600 rounded-full" />
              )}
            />

            <div className="flex justify-between pt-2">
              <span>{price[0]} ₽</span>
              <span>{price[1]} ₽</span>
            </div>

            <button
              className="text-red-500 mt-2"
              onClick={() => setPrice([priceMin, priceMax])}
            >
              Сбросить цену
            </button>
          </motion.div>
        )}

        {/* категории */}
        {activeFilter === "categories" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="bg-white border shadow-lg rounded-xl p-4 w-72"
          >
            <input
              placeholder="Поиск категорий..."
              value={catSearch}
              onChange={(e) => setCatSearch(e.target.value)}
              className="w-full px-2 py-1 mb-2 border rounded"
            />

            <div className="max-h-48 overflow-y-auto flex flex-col gap-2">
              {allCategories
                .filter((c) =>
                  c.toLowerCase().includes(catSearch.toLowerCase())
                )
                .map((c) => (
                  <label key={c} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(c)}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes(c)
                            ? prev.filter((x) => x !== c)
                            : [...prev, c]
                        )
                      }
                    />
                    {c}
                  </label>
                ))}
            </div>

            <button
              className="text-red-500 mt-2"
              onClick={() => setSelectedCategories([])}
            >
              Сбросить категории
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}