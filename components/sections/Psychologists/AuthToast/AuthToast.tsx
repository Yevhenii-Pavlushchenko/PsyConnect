"use client";

import { useEffect } from "react";
import { useModalStore } from "@/app/store/appStore";
import css from "./AuthToast.module.css";
import Button from "@/components/ui/Button/Button";

export default function AuthToast() {
  const { isToastOpen, closeAuthToast, openModal } = useModalStore();

  useEffect(() => {
    if (!isToastOpen) return;

    const timer = setTimeout(() => {
      closeAuthToast();
    }, 5000);

    return () => clearTimeout(timer);
  }, [isToastOpen, closeAuthToast]);

  if (!isToastOpen) return null;

  return (
    <div className={`${css.toastCard} ${css.fadeIn}`}>
      {/* Кнопка закрытия тоста (крестик) */}
      <button
        type="button"
        className={css.closeBtn}
        onClick={closeAuthToast}
        aria-label="Close notification"
      >
        ✕
      </button>

      {/* Заголовок с иконкой */}
      <div className={css.toastHeader}>
              <div className={css.lockIconWrapper}>
                  <svg width="20" height="20" className={css.lockIcon}>
                    <use href="/sprite.svg#icon-lock"></use>
                  </svg>
                </div>
        <h4 className={css.toastTitle}>Sign in required</h4>
      </div>

      {/* Текст сообщения */}
      <p className={css.toastText}>
        Please log in or create an account to save specialists to your
        favorites.
      </p>

      {/* Кнопка действия */}

      <Button
        text="Log In"
        color="white"
        width={110}
        onClick={() => {
          closeAuthToast(); 
          openModal("login"); 
        }} 
        size="small"
      />
    </div>
  );
}
