import css from "./SkeletonCard.module.css";

export default function SkeletonCard() {
  return (
    <div className={css.skeletonCard}>
      <div className={css.avatarBlock}></div>
      <div className={css.contentBlock}>
        <div className={css.headerLine}>
          <div className={css.titleLine}></div>
          <div className={css.metaLine}></div>
        </div>
        <div className={css.tagsLine}></div>
        <div className={css.textLine}></div>
        <div className={css.textLineShort}></div>
        <div className={css.actionsLine}></div>
      </div>
    </div>
  );
}
