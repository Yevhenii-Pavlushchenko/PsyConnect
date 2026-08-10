"use client";

import { use } from "react";
import css from "./page.module.css";
import PsychologistsPageTitle from "@/components/sections/Psychologists/PsychologistsPageTitle/PsychologistsPageTitle";
import FilterBar from "@/components/sections/Psychologists/FilterBar/FilterBar";
import PsychologistsList from "@/components/sections/Psychologists/PsychologistsList/PsychologistsList";

interface PageProps {
  searchParams: Promise<{
    specialization?: string;
    approach?: string;
    price_max?: string;
  }>;
}

export default function PsychologistsPage({ searchParams }: PageProps) {
  const params = use(searchParams);

  const filters = {
    specialization: params.specialization || "",
    approach: params.approach || "",
    price_max: params.price_max || "",
  };

  return (
    <div className={css.pageWrapper}>
      <div className={css.container}>
        {/* Підключаємо винесений заголовок сторінки */}
        <PsychologistsPageTitle />

        {/* Панель фільтрів */}
        <FilterBar currentFilters={filters} />

        {/* Список карток */}
        <PsychologistsList filters={filters} />
      </div>
    </div>
  );
}
