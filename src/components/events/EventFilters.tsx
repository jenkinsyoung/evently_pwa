"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DateRange } from "react-date-range";
import { Range } from "react-range";
import { format } from "date-fns";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ru } from "date-fns/locale";
import type { Category, Event } from "@/types";
import styles from './DatePicker.module.css';

interface Props {
  events: Event[];
  onFiltered: (filtered: Event[]) => void;
}

export default function EventFilters({ events, onFiltered }: Props) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // поиск
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  // дата - всегда есть начальная и конечная
  const today = new Date();
  const [date, setDate] = useState<{ startDate: Date; endDate: Date }>({
    startDate: today,
    endDate: today,
  });
  const [isDateActive, setIsDateActive] = useState(false);

  // цена
  const priceMin = 0;
  const priceMax = useMemo(() => {
    if (!events.length) return priceMin + 1;
    const max = Math.max(...events.map((e) => e.price ?? 0));
    return Number.isFinite(max) ? Math.max(max, priceMin + 1) : priceMin + 1;
  }, [events]);

  const [price, setPrice] = useState<[number, number]>([priceMin, priceMax]);

  useEffect(() => {
    setPrice([priceMin, priceMax]);
  }, [priceMin, priceMax]);

  // категории
  const allCategories = useMemo(() => {
    const map = new Map<string, Category>();
    for (const ev of events) {
      for (const c of ev.categories) {
        if (!map.has(c.id)) map.set(c.id, c);
      }
    }
    return Array.from(map.values());
  }, [events]);

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [catSearch, setCatSearch] = useState("");

  // сброс всех фильтров
  const resetAll = () => {
    setSearch("");
    setDate({ startDate: today, endDate: today });
    setIsDateActive(false);
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
        (ev.title ?? '').toLowerCase().includes(text) ||
        (ev.description ?? '').toLowerCase().includes(text) ||
        (ev.location ?? '').toLowerCase().includes(text) ||
        ev.categories.some((c) => c.name.toLowerCase().includes(text));

      if (!matchSearch) return false;

      if (isDateActive) {
        const d = new Date(ev.startDate);
        if (d < date.startDate || d > date.endDate) return false;
      }

      if (ev.price < price[0] || ev.price > price[1]) return false;

      if (selectedCategories.length > 0) {
        if (!ev.categories.some((c) => selectedCategories.includes(c))) {
          return false;
        }
      }

      return true;
    });
  }, [events, search, isDateActive, date, price, selectedCategories]);

  useEffect(() => {
    onFiltered(filtered);
  }, [filtered, onFiltered]);

  // UI-кнопки
  const filterButtons = [
    { key: "popular", label: "ПОПУЛЯРНОЕ" },
    { key: "date", label: "ПО ДАТЕ" },
    { key: "price", label: "ПО ЦЕНЕ" },
    { key: "categories", label: "ПО КАТЕГОРИЯМ" },
  ];

  const isSearchActive = search.trim().length > 0;
  const isPriceActive = price[0] !== priceMin || price[1] !== priceMax;
  const isCategoriesActive = selectedCategories.length > 0;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* === КНОПКИ ФИЛЬТРОВ === */}
      <div className="flex gap-3 justify-center flex-wrap">
        {/* ВСЕ СОБЫТИЯ */}
        <button
          onClick={resetAll}
          className={`px-4 py-2 rounded-xl border font-medium transition ${
            !isSearchActive &&
            !isDateActive &&
            !isPriceActive &&
            !isCategoriesActive
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          ВСЕ СОБЫТИЯ
        </button>

        {filterButtons.map((btn) => {
          const active =
            (btn.key === "date" && isDateActive) ||
            (btn.key === "price" && isPriceActive) ||
            (btn.key === "categories" && isCategoriesActive) ||
            btn.key === activeFilter;

          return (
            <div key={btn.key} className="flex flex-col items-start">
              <button
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
            </div>
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
        {/* КАЛЕНДАРЬ */}
        {activeFilter === 'date' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={styles.calendarWrapper}
          >
            {/* Выбранный период */}
            <div className={styles.selectedInfo}>
              <span className={styles.selectedLabel}>Выбранный период:</span>
              <span className={styles.selectedValue}>
                {format(date.startDate, "d MMMM yyyy", { locale: ru })} –{" "}
                {format(date.endDate, "d MMMM yyyy", { locale: ru })}
              </span>
            </div>

            <DateRange
              locale={ru}
              ranges={[
                {
                  startDate: date.startDate,
                  endDate: date.endDate,
                  key: "selection",
                },
              ]}
              onChange={(ranges) => {
                const next = ranges.selection;
                setDate({
                  startDate: next.startDate ?? today,
                  endDate: next.endDate ?? next.startDate ?? today,
                });
                setIsDateActive(true);
              }}
              moveRangeOnFirstSelection={false}
              rangeColors={['#7d618a']}
              showDateDisplay={false}
              weekdayDisplayFormat="EEEEEE"
              monthDisplayFormat="LLLL yyyy"
            />

            <div className={styles.actions}>
              <button
                className={styles.resetBtn}
                onClick={() => {
                  setDate({ startDate: today, endDate: today });
                  setIsDateActive(false);
                }}
              >
                Сбросить дату
              </button>
              <button
                className={styles.applyBtn}
                onClick={() => setActiveFilter(null)}
              >
                Готово
              </button>
            </div>
          </motion.div>
        )}

        {/* ЦЕНА */}
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

            <div className="flex justify-between pt-2 text-sm font-medium">
              <span>{price[0].toLocaleString()} ₽</span>
              <span>{price[1].toLocaleString()} ₽</span>
            </div>

            <button
              className="text-[#76048a] mt-2 text-sm hover:text-red-600"
              onClick={() => setPrice([priceMin, priceMax])}
            >
              Сбросить цену
            </button>
          </motion.div>
        )}

        {/* КАТЕГОРИИ */}
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
              className="w-full px-3 py-2 mb-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-300"
            />

            <div className="max-h-48 overflow-y-auto flex flex-col gap-2">
              {allCategories
                .filter((c) =>
                  c.name.toLowerCase().includes(catSearch.toLowerCase())
                )
                .map((c) => (
                  <label key={c.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
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
                      className="w-4 h-4 accent-[#76048a] text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm">{c.name}</span>
                  </label>
                ))}
            </div>

            <button
              className="text-[#76048a] mt-3 text-sm hover:text-purple-600 font-medium"
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
