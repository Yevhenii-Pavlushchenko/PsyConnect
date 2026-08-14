"use client";

import { useRouter, usePathname } from "next/navigation";
import css from "./EmptyState.module.css";
import Button from "@/components/ui/Button/Button";

export default function EmptyState() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClear = () => {
    router.push(pathname);
  };

  return (
    <div className={css.emptyContainer}>
      <div className={css.iconWrapper}>
        <svg width="48" height="48" className={css.icon}>
          <use href="/sprite.svg#icon-sad"></use>
        </svg>
      </div>
      <h3 className={css.title}>No specialists found</h3>
      <p className={css.text}>
        Try adjusting your filters to find the right specialist for you.
      </p>
      <Button
        text="Clear filters"
        color="green"
        width={230}
        size="small"
        onClick={handleClear}
        className={css.clearBtn}
      />
    </div>
  );
}
