"use client";

import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./PsychologistsList.module.css";
import { api } from "@/lib/api";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import EmptyState from "../EmptyState/EmptyState";
import Button from "@/components/ui/Button/Button";
import PsychologistCard from "../PsychologistCard/PsychologistCard";

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
  interface PsychologistsResponse {
    items: Psychologist[];
  }

  const fetchPsychologists = async ({ pageParam = 1 }) => {
    const requestParams: Record<string, unknown> = {
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

    const response = await api.get<PsychologistsResponse>(
      "/api/psychologists",
      {
        params: requestParams,
      },
    );

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
      return lastPage.length < 4 ? undefined : allPages.length + 1;
    },
  });

  useEffect(() => {
    if (isError) {
      console.error("🔴 Ошибка загрузки психологов:", isError);
    }
  }, [isError]);

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
      <p className={css.errorText}>
        Something went wrong. Please refresh the page.
      </p>
    );
  }

  const psychologists = data?.pages.flatMap((page) => page) || [];

  if (psychologists.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={css.listWrapper}>
      <div className={css.listContainer}>
        {psychologists.map((psychologist) => (
          <PsychologistCard
            key={psychologist._id}
            psychologist={psychologist}
          />
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
