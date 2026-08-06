"use client";
import Link from "next/link";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <Link href="/home">
          <div className={css.footerLogoWrapper}>
            <div className={css.footerLogoIcon}>
              <svg width="24" height="24">
                <use href="/sprite.svg#icon-logo"></use>
              </svg>
            </div>
            <span>PsyConnect</span>
          </div>
        </Link>

        <p className={css.footerCopyright}>
          &copy; 2026 PsyConnect. All rights reserved.
        </p>

        <ul className={css.footerSocialLinks}>
          <li className={css.socialLinkItem}>
            <Link
              href="https://www.instagram.com/psyconnect"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={css.footerSocialIcon}>
                <svg width="24" height="24">
                  <use href="/sprite.svg#icon-instagram"></use>
                </svg>
              </div>
            </Link>
          </li>
          <li className={css.socialLinkItem}>
            <Link
              href="https://www.facebook.com/psyconnect"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={css.footerSocialIcon}>
                <svg width="24" height="24">
                  <use href="/sprite.svg#icon-facebook"></use>
                </svg>
              </div>
            </Link>
          </li>
          <li className={css.socialLinkItem}>
            <Link
              href="https://www.linkedin.com/company/psyconnect"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={css.footerSocialIcon}>
                <svg width="24" height="24">
                  <use href="/sprite.svg#icon-linkedin"></use>
                </svg>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
