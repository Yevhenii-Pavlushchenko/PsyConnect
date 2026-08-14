"use client";

import { useEffect } from "react";
import { useRouter } from  "next/navigation";
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
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
      // Модалка откроется автоматически, так как AuthToast или LoginModal завязаны на глобальный стор
    }
  }, [isLoggedIn, router]);

  const { data: favorites = [], isLoading } = useQuery<Psychologist[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await api.get("/api/favorites");
      return response.data;
    },
    enabled: isLoggedIn,
  });

  if (!isLoggedIn) return null;

  if (isLoading) {
    return <div className={css.loader}>Loading your favorites...</div>;
  }

  return (
    <div className={css.container}>
      {favorites.length === 0 ? (
        <EmptyStateFavorite />
      ) : (
        <>
          <FavoritesPageTitle />
          <FavoritesList initialFavorites={favorites} />
        </>
      )}
    </div>
  );
}
