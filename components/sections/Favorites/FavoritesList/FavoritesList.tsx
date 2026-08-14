"use client";

import { useEffect } from "react";
import { useFavoritesStore } from "@/app/store/appStore";
import PsychologistCard from "@/components/sections/Psychologists/PsychologistCard/PsychologistCard";
import css from "./FavoritesList.module.css";

interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

interface Psychologist {
  _id: string;
  name: string;
  avatar_url: string;
  rating: number;
  experience_years: number;
  languages: string[];
  specialization: string[];
  about: string;
  conditions: string[];
  approaches: string[];
  price_per_hour: number;
  initial_consultation: boolean;
  reviews: Review[];
}

interface FavoritesListProps {
  initialFavorites: Psychologist[];
}

export default function FavoritesList({ initialFavorites }: FavoritesListProps) {
  const { ids, setFavorites } = useFavoritesStore();

  // Синхронизируем стор при первой загрузке данных с бэкенда
  useEffect(() => {
    if (initialFavorites.length > 0 && ids.length === 0) {
      setFavorites(initialFavorites.map((p) => p._id));
    }
  }, [initialFavorites, ids.length, setFavorites]);

  // Если стор ещё пустой при первой сборке, берём всё из бэкенда, 
  // а если юзер нажал "дизлайк", то реактивно фильтруем по стору
  const currentIds = ids.length === 0 ? initialFavorites.map(p => p._id) : ids;
  const activeFavorites = initialFavorites.filter((p) => currentIds.includes(p._id));

  return (
    <ul className={css.list}>
      {activeFavorites.map((psychologist) => (
        <li key={psychologist._id} className={css.item}>
          <PsychologistCard psychologist={psychologist} />
        </li>
      ))}
    </ul>
  );
}
