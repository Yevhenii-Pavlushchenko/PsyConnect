import styles from './FavoritesPageTitle.module.css';

export default function FavoritesPageTitle() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Your Favorites</h1>
      <p className={styles.subtitle}>Specialists you’ve saved for quick access.</p>
    </header>
  );
}
