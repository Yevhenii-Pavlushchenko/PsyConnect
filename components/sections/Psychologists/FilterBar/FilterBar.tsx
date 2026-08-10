"use client";

import { useRouter, usePathname } from "next/navigation";
import css from "./FilterBar.module.css";
import FilterDropdown from "./../FilterDropdown/FilterDropdown";
import Button from "@/components/ui/Button/Button";

const specializationOptions = [
  { label: "All", value: "" },
  { label: "Anxiety", value: "Anxiety" },
  { label: "OCD", value: "OCD" },
  { label: "Phobias", value: "Phobias" },
  { label: "Depression", value: "Depression" },
  { label: "Trauma", value: "Trauma" },
];

const approachOptions = [
  { label: "All", value: "" },
  { label: "CBT", value: "CBT" },
  { label: "ERP", value: "ERP" },
  { label: "ACT", value: "ACT" },
  { label: "Gestalt", value: "Gestalt" },
  { label: "Psychoanalysis", value: "Psychoanalysis" },
];

const priceOptions = [
  { label: "All", value: "" },
  { label: "Under $50", value: "50" },   
  { label: "Under $100", value: "100" }, 
];

interface FilterBarProps {
  currentFilters: {
    specialization: string;
    approach: string;
    price_max: string;
  };
}

export default function FilterBar({ currentFilters }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1"); 
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push(pathname); 
  };

  // 🟢 Переименовали переменную, чтобы она на 100% отражала суть для пропсов кнопки
  const hasActiveFilters = 
    !!(currentFilters.specialization || currentFilters.approach || currentFilters.price_max);

  return (
    <div className={css.filterBar}>
      <div className={css.filtersGroup}>
        <div className={css.filterTitleBlock}>
          <svg width="20" height="20" className={css.filterIcon}>
            <use href="/sprite.svg#icon-filters"></use>
          </svg>
          <span className={css.filterLabel}>Filters</span>
        </div>

        {/* 1. Дропдаун Специализации */}
        <FilterDropdown
          label="Specialization"
          options={specializationOptions}
          value={currentFilters.specialization}
          onChange={(val) => updateQueryParam("specialization", val)}
        />

        {/* 2. Дропдаун Подхода */}
        <FilterDropdown
          label="Therapeutic Approach"
          options={approachOptions}
          value={currentFilters.approach}
          onChange={(val) => updateQueryParam("approach", val)}
        />

        {/* 3. Дропдаун Цены */}
        <FilterDropdown
          label="Price per Session"
          options={priceOptions}
          value={currentFilters.price_max}
          onChange={(val) => updateQueryParam("price_max", val)}
        />
      </div>

      {/* 🟢 Убрали логическое "&&", теперь кнопка отображается всегда */}
      <Button
        text="Clear Filters"
        color="white"
        width={80}
        size="small"
        onClick={handleClearFilters}
        disabled={!hasActiveFilters}
        noBorder={true} 
      />
    </div>
  );
}
