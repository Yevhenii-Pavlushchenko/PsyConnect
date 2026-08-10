"use client";

import { useRouter, usePathname } from "next/navigation";
import css from "./EmptyState.module.css";

export default function EmptyState() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClear = () => {
    router.push(pathname); // Сбрасываем все query-параметры
  };

  return (
    <div className={css.emptyContainer}>
      <div className={css.iconWrapper}>
        <svg width="48" height="48" className={css.icon}>
          <use href="/sprite.svg#icon-search"></use> {/* Укажи id декоративной иконки, если он другой */}
        </svg>
      </div>
      <h3 className={css.title}>No specialists found</h3>
      <p className={css.text}>
        Try adjusting your filters to find the right specialist for you.
      </p>
      <button className={css.clearBtn} onClick={handleClear}>
        Clear filters
      </button>
    </div>
  );
}
