"use client";

import css from "./Header.module.css";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={css.header}>
        <Link href="/home">
        <div className={css.HeaderLogoWrapper}>
          <span>PsyConnect</span>
            <div className={css.HeaderLogoIcon}>
              <svg width="24" height="24">
                <use href="/sprite.svg#icon-logo"></use>
              </svg>
            </div>
            
          </div>
        </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/">
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              className={`${css.navigationLink}
               ${pathname === "/psychologists" ? css.active : ""}`}
              href="/psychologists"
            >
              Psychologists
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
