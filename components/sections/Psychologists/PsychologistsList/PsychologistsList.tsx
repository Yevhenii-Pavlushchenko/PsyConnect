"use client";
 

import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./PsychologistsList.module.css";
import { api } from "@/lib/api";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import EmptyState from "../EmptyState/EmptyState";
import Button from "@/components/ui/Button/Button";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
// import { error } from "console";

// Интерфейс данных одного психолога по ТЗ
export interface Psychologist {
  _id: string;
  name: string;
  avatar_url: string;
  specialization: string[];
  approaches: string[];
  languages: string[];
  price_per_hour: number;
  experience_years: number;
  rating: number;
  reviews: {
    reviewer: string;
    rating: number;
    comment: string;
  }[];
  about: string;
  conditions: string[];
  initial_consultation: boolean;
}

interface PsychologistsListProps {
  filters: {
    specialization: string;
    approach: string;
    price_max: string;
  };
}

export default function PsychologistsList({ filters }: PsychologistsListProps) {

    
  // Функция запроса к бэкенду
  interface PsychologistsResponse {
    items: Psychologist[];
  }

  const fetchPsychologists = async ({ pageParam = 1 }) => {
    const requestParams: Record<string, any> = {
      page: pageParam,
      limit: 4,
    };

    if (filters.specialization && filters.specialization.trim() !== "") {
      requestParams.specialization = filters.specialization;
    }
    
    if (filters.approach && filters.approach.trim() !== "") {
      requestParams.approach = filters.approach;
    }
    
    if (filters.price_max && filters.price_max.trim() !== "") {
      requestParams.price_max = Number(filters.price_max);
    }

    // 🟢 Типизируем запрос как PsychologistsResponse
    const response = await api.get<PsychologistsResponse>("/api/psychologists", {
      params: requestParams,
    });
    
    // 🟢 Возвращаем строго массив items, чтобы TanStack Query работал с массивами
    return response.data.items;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["psychologists", filters],
    queryFn: fetchPsychologists,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Если сервер вернул меньше 4 элементов — список закончился
      return lastPage.length < 4 ? undefined : allPages.length + 1;
    },
  });
    
    // Внутри компонента PsychologistsList, после useInfiniteQuery:
useEffect(() => {
  if (isError) {
    console.error("🔴 Ошибка загрузки психологов:", isError);
  }
}, [isError]);

  // 1. Состояние первичной загрузки: рендерим ровно 4 скелетона по ТЗ
  if (isLoading) {
    return (
      <div className={css.listContainer}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className={css.errorText} style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid var(--error-color)' }}>
        <p style={{ fontWeight: 600, color: 'var(--error-color)', marginBottom: '8px' }}>
          🔴 Ошибка загрузки психологов!
        </p>
        <pre style={{ fontSize: '12px', textAlign: 'left', whiteSpace: 'pre-wrap', color: '#181c1c' }}>
          {error instanceof Error ? error.message : "Неизвестная ошибка"}
        </pre>
      </div>
    );
  }

  // Схлопываем двумерный массив страниц TanStack Query в один плоский массив
  const psychologists = data?.pages.flatMap((page) => page) || [];

  // 2. Пустой результат фильтрации: рендерим EmptyState
  if (psychologists.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={css.listWrapper}>
      <div className={css.listContainer}>
        {psychologists.map((psychologist) => (
          <PsychologistCard key={psychologist._id} psychologist={psychologist} />
        ))}
      </div>

      {/* Блок пагинации внизу списка */}
      <div className={css.paginationBlock}>
        {hasNextPage ? (
          <Button
            text={isFetchingNextPage ? "Loading..." : "Load more psychologists"}
            color="green"
            width={260}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          />
        ) : (
          <p className={css.endOfListText}>You&apos;ve seen all specialists.</p>
        )}
      </div>
    </div>
  );
}
