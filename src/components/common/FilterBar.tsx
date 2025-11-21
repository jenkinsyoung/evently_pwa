"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type EventFilter =
  | "all"
  | "popular"
  | "date"
  | "price"
  | "category";

interface Props {
  categories: string[];
  selectedCategories: string[];
  onCategoriesChange: (value: string[]) => void;

  onSearch: (value: string) => void;
  onFilterChange: (filter: EventFilter | null) => void;
  activeFilter: EventFilter | null;
  searchValue: string;
}

export default function EventsFilterBar({
  categories,
  selectedCategories,
  onCategoriesChange,

  onSearch,
  onFilterChange,
  activeFilter,
  searchValue,
}: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const filters = [
    { label: "ВСЕ СОБЫТИЯ", value: "all" as EventFilter },
    { label: "ПОПУЛЯРНОЕ", value: "popular" as EventFilter },
    { label: "ПО ДАТЕ", value: "date" as EventFilter },
    { label: "ПО ЦЕНЕ", value: "price" as EventFilter },
    { label: "ПО КАТЕГОРИЯМ", value: "category" as EventFilter },
  ];

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== cat));
    } else {
      onCategoriesChange([...selectedCategories, cat]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 relative">

      {/* Панель фильтров */}
      <AnimatePresence>
        {!isSearchOpen && (
          <motion.div
            key="filters"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex gap-2 flex-wrap"
          >
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => {
                  if (f.value === "category") {
                    onFilterChange("category");
                    setIsCategoryOpen((prev) => !prev);
                    return;
                  }

                  setIsCategoryOpen(false);
                  onFilterChange(activeFilter === f.value ? null : f.value);
                }}
                className={`px-4 py-2 rounded-xl border transition ${
                  activeFilter === f.value
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {f.label}
              </button>
            ))}

            {/* Кнопка поиска */}
            <button
              onClick={() => {
                setIsCategoryOpen(false);
                setIsSearchOpen(true);
              }}
              className="px-4 py-2 rounded-xl border bg-white text-gray-700 border-gray-300"
            >
              ИСКАТЬ
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Выпадающий список категорий */}
      <AnimatePresence>
        {activeFilter === "category" && isCategoryOpen && !isSearchOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-14 left-0 z-20 bg-white border shadow-md rounded-xl p-3 w-64"
          >
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Поле поиска */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="relative flex items-center"
          >
            <input
              type="text"
              placeholder="Искать по названию, описанию, месту, категории, организатору..."
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-xl border border-gray-300"
            />

            <button
              onClick={() => {
                onSearch("");
                setIsSearchOpen(false);
              }}
              className="absolute right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Сброс фильтров */}
      {!isSearchOpen && activeFilter && (
        <button
          onClick={() => {
            onFilterChange(null);
            setIsCategoryOpen(false);
          }}
          className="text-red-500 text-sm self-start"
        >
          ✕ Сбросить фильтр
        </button>
      )}
    </div>
  );
}
