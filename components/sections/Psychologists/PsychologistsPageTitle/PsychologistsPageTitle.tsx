import css from "./PsychologistsPageTitle.module.css";

export default function PsychologistsPageTitle() {
  return (
    <div className={css.titleBlock}>
      <h1 className={css.title}>Find Your Psychologist</h1>
      <p className={css.subtitle}>
        Browse our verified specialists and find the perfect match for your needs.
      </p>
    </div>
  );
}
