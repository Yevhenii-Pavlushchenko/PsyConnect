"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/app/store/appStore";
import { api } from "@/lib/api";
import FavoritesPageTitle from "@/components/sections/Favorites/FavoritesPageTitle/FavoritesPageTitle";
import FavoritesList from "@/components/sections/Favorites/FavoritesList/FavoritesList";
import EmptyStateFavorite from "@/components/sections/Favorites/EmptyStateFavorite/EmptyStateFavorite";
import { Psychologist } from "@/components/sections/Psychologists/PsychologistsList/PsychologistsList";
import css from "./page.module.css";

export default function FavoritesPage() {
  const router = useRouter();
  const { isLoggedIn, isHydrated } = useAuthStore(); // 🟢 Забираем флаг готовности стора

  useEffect(() => {
    // 🟢 Делаем редирект ТОЛЬКО после того, как стор проверил localStorage
    if (isHydrated && !isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, isHydrated, router]);

  const { data: responseData, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await api.get("/api/favorites");
      return response.data;
    },
    enabled: isHydrated && isLoggedIn, // 🟢 Делаем запрос только если сессия подтверждена
  });

  // Пока стор считывает localStorage или если пользователя перенаправляет — показываем заглушку
  if (!isHydrated || !isLoggedIn) {
    return <div className={css.loader}>Verifying session...</div>;
  }

  if (isLoading) {
    return <div className={css.loader}>Loading your favorites...</div>;
  }

  const favorites: Psychologist[] = Array.isArray(responseData) 
    ? responseData 
    : responseData?.data && Array.isArray(responseData.data) 
      ? responseData.data 
      : [];

  return (
    <div className={css.container}>
      <FavoritesPageTitle />
      
      {favorites.length === 0 ? (
        <EmptyStateFavorite />
      ) : (
        <FavoritesList initialFavorites={favorites} />
      )}
    </div>
  );
}
