"use client";

import { useState } from "react";
import Image from "next/image";
import css from "./PsychologistCard.module.css";
import { Psychologist } from "../PsychologistsList/PsychologistsList";
import {
  useAuthStore,
  useModalStore,
  useFavoritesStore,
} from "@/app/store/appStore";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button/Button";

interface PsychologistCardProps {
  psychologist: Psychologist;
}

const langCodes: Record<string, string> = {
  ukrainian: "UA",
  english: "EN ",
  korean: "KR",
  mandarin: "MN",
  italian: "IT",
};
export default function PsychologistCard({
  psychologist,
}: PsychologistCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { isLoggedIn } = useAuthStore();
  const { openModal, openAuthToast } = useModalStore();

const ids = useFavoritesStore((state) => state.ids);
const addFavorite = useFavoritesStore((state) => state.addFavorite);
const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const isFavorite = ids.includes(psychologist._id);

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      openAuthToast();
      return;
    }

    try {
      if (isFavorite) {
        await api.delete(`/api/favorites/${psychologist._id}`);
        removeFavorite(psychologist._id);
        toast.success("Removed from favorites");
      } else {
        await api.post(`/api/favorites/${psychologist._id}`);
        addFavorite(psychologist._id);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error("Favorite error", error);
      toast.error("Failed to update favorites");
    }
  };

  const handleBookSessionClick = () => {
    console.log("Спроба відкрити модалку для:", psychologist.name);
    openModal("booking", {
      _id: psychologist._id,
      name: psychologist.name,
      avatar_url: psychologist.avatar_url,
    });
  };

  return (
    <div className={`${css.card} ${isExpanded ? css.cardExpanded : ""}`}>
      {/* Кнопка Избранного (Сердечко) — всегда в правом верхнем углу */}
 <button
  key={`fav-btn-${psychologist._id}-${isFavorite}`} // 🟢 Принудительный сброс DOM-узла кнопки при изменении статуса
  type="button"
  className={`${css.favoriteBtn} ${isFavorite ? css.isFavoriteActive : ""}`}
  onClick={handleFavoriteClick}
  aria-label="Toggle favorite"
>
  <svg width="25" height="25" className={css.heartSvg}>
    {isFavorite ? (
      <use href="/sprite.svg#icon-heart-full"></use>
    ) : (
      <>
        <use href="/sprite.svg#icon-heart" className={css.heartOutline}></use>
        <use href="/sprite.svg#icon-heart-full" className={css.heartFilled}></use>
      </>
    )}
  </svg>
</button>

      {/* Бейдж бесплатной сессии (если есть) */}
      {psychologist.initial_consultation && (
        <div className={css.badgeFree}>
          <svg width="12" height="12">
            <use href="/sprite.svg#icon-free-session"></use>
          </svg>
          <span>Free first session</span>
        </div>
      )}

      {/* Основной блок Шапки: Аватар + Инфо */}
      <div className={css.cardHeader}>
        <div className={css.avatarContainer}>
          <Image
            src={psychologist.avatar_url}
            alt={psychologist.name}
            width={80}
            height={80}
            className={css.avatar}
          />
        </div>

        <div className={css.headerInfo}>
          <h3 className={css.name}>{psychologist.name}</h3>

          {/* Ряд мета-данных (Рейтинг, Опыт, Языки) */}
          <div className={css.metaGroup}>
            <div className={css.metaItem}>
              <svg width="16" height="16" className={css.starIcon}>
                <use href="/sprite.svg#icon-star"></use>
              </svg>
              <span>{psychologist.rating}</span>
            </div>
            <span className={css.separator}>•</span>
            <div className={css.metaItem}>
              <svg width="14" height="12" className={css.caseIcon}>
                <use href="/sprite.svg#icon-case"></use>
              </svg>
              <span>{psychologist.experience_years} yrs exp.</span>
            </div>
            <span className={css.separator}>•</span>
            <div className={css.metaItem}>
              <svg width="14" height="14" className={css.caseIcon}>
                <use href="/sprite.svg#icon-web"></use>
              </svg>
              <span>
                {psychologist.languages
                  .map(
                    (lang) =>
                      langCodes[lang.toLowerCase()] ||
                      lang.slice(0, 2).toUpperCase(),
                  )
                  .join("/")}
              </span>
            </div>
          </div>

          {/* Теги специализации под мета-данными */}
          <div className={css.specializationTags}>
            {psychologist.specialization.map((spec) => (
              <span key={spec} className={css.specTag}>
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Текст описания — в свернутом виде строго 2 строки с многоточием */}
      <p className={`${css.aboutText} ${!isExpanded ? css.collapsedText : ""}`}>
        {psychologist.about}
      </p>

      {/* Горизонтальные теги условий (Online, Adults и т.д.) */}
      <div className={css.conditionsTags}>
        {psychologist.conditions.map((cond) => (
          <span key={cond} className={css.condTag}>
            {cond}
          </span>
        ))}
      </div>

      {/* 🔴 РАСКРЫТАЯ ОБЛАСТЬ */}
      {isExpanded && (
        <div className={css.expandedArea}>
          <div className={css.expandedSection}>
            <h4 className={css.sectionTitle}>Therapeutic Approaches</h4>
            <div className={css.approachTags}>
              {psychologist.approaches.map((app) => (
                <span key={app} className={css.approachTag}>
                  {app}
                </span>
              ))}
            </div>
          </div>

          <div className={css.expandedSection}>
            <h4 className={css.sectionTitle}>Client Reviews</h4>
            <ul className={css.reviewsList}>
              {psychologist.reviews.map((review, idx) => {
                const initial = review.reviewer.charAt(0).toUpperCase();
                return (
                  <li key={idx} className={css.reviewItem}>
                    <div className={css.reviewerHeader}>
                      <div className={css.reviewerAvatar}>{initial}</div>
                      <div>
                        <h5 className={css.reviewerName}>{review.reviewer}</h5>
                        <div className={css.reviewerRating}>
                          {Array.from({
                            length: Math.round(review.rating),
                          }).map((_, i) => (
                            <svg
                              key={i}
                              width="13"
                              height="12"
                              className={css.starIcon}
                            >
                              <use href="/sprite.svg#icon-star"></use>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className={css.reviewComment}>
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* 🟢 ФУТЕР КАРТКИ */}
      <div className={css.cardFooter}>
        <div className={css.priceBlock}>
          <span className={css.priceValue}>${psychologist.price_per_hour}</span>
          <span className={css.priceLabel}> / session</span>
        </div>

        <div className={css.actionsBlock}>
          <Button
            text={isExpanded ? "Read less" : "Read more"}
            icon={isExpanded ? "icon-chevron-up" : "icon-chevron-down"}
            iconSize="small-arrow"
            color="white"
            width={120}
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Button
            text="Book a session"
            color="green"
            width={150}
            size="small"
            onClick={handleBookSessionClick}
          />
        </div>
      </div>
    </div>
  );
}
