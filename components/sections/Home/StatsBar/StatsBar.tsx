import styles from "./StatsBar.module.css";

export default function StatsBar() {
  return (
    <section className={styles.statsSection}>
      <div className={styles.statsContainer}>
        {/* Блок 1 */}
        <div className={styles.statItem}>
          <h2 className={styles.number}>120+</h2>
          <p className={styles.label}>Verified Specialists</p>
        </div>

        {/* Разделительная линия */}
        <div className={styles.divider} />

        {/* Блок 2 */}
        <div className={styles.statItem}>
          <h2 className={styles.number}>5,000+</h2>
          <p className={styles.label}>Happy Clients</p>
        </div>

        {/* Разделительная линия */}
        <div className={styles.divider} />

        {/* Блок 3 */}
        <div className={styles.statItem}>
          <h2 className={styles.number}>10+</h2>
          <p className={styles.label}>Years of Experience</p>
        </div>
      </div>
    </section>
  );
}
