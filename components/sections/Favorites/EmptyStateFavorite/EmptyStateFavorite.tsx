"use client";

import styles from './EmptyStateFavorite.module.css';
import Button from '@/components/ui/Button/Button';

export default function EmptyStateFavorite() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <svg width="66" height="61" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className={styles.title}>You haven’t saved any specialists yet</h2>
        <p className={styles.subtitle}>
          Browse our catalog and tap the heart icon to add specialists to your favorites.
        </p>
        <Button 
          text="Browse specialists"
          color="green"
          width={210}
          href="/psychologists"
          icon="icon-arrow-right"
          iconSize="big-arrow"
        />
      </div>
    </div>
  );
}
