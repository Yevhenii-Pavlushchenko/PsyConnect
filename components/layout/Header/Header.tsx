"use client";

import css from "./Header.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  useAuthStore,
  useModalStore,
  useFavoritesStore,
} from "../../../app/store/appStore";

import Modal from "../../ui/Modal/Modal";
import LoginForm from "@/components/forms/LoginForm/LoginForm";
import RegistrationForm from "@/components/forms/RegistrationForm/RegistrationForm";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import Button from "../../ui/Button/Button";
import BookingForm from "@/components/forms/BookingForm/BookingForm";

export default function Header() {
  const pathname = usePathname();

  const { isLoggedIn, user, logout, isHydrated } = useAuthStore();
  const { activeModal, openModal, closeModal } = useModalStore();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error", error);
      toast.error("Session expired, logging out locally");
    } finally {
      logout();
      useFavoritesStore.getState().setFavorites([]);
    }
  };

  return (
    <>
      <header className={css.header}>
        {/* Логотип */}
        <Link href="/">
          <div className={css.HeaderLogoWrapper}>
            <span>PsyConnect</span>
            <div className={css.HeaderLogoIcon}>
              <svg width="24" height="24">
                <use href="/sprite.svg#icon-logo"></use>
              </svg>
            </div>
          </div>
        </Link>

        {/* Навігація */}
        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li className={css.navigationItem}>
              <Link
                className={`${css.navigationLink} ${pathname === "/" ? css.active : ""}`}
                href="/"
              >
                Home
              </Link>
            </li>
            <li className={css.navigationItem}>
              <Link
                className={`${css.navigationLink} ${pathname === "/psychologists" ? css.active : ""}`}
                href="/psychologists"
              >
                Psychologists
              </Link>
            </li>
            {isHydrated && isLoggedIn && (
              <li className={css.navigationItem}>
                <Link
                  className={`${css.navigationLink} ${pathname === "/favorites" ? css.active : ""}`}
                  href="/favorites"
                >
                  <div className={css.favoritesLinkWrapper}>
                    Favorites
                    <svg width="16" height="16" className={css.heartIcon}>
                      <use href="/sprite.svg#icon-heart-full"></use>
                    </svg>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Блок Авторизації */}
        <div className={css.authBlock}>
          {!isHydrated ? (
            <div className={css.authLoadingSpacer} style={{ width: "120px" }} />
          ) : isLoggedIn ? (
            <div className={css.authorizedMenu}>
              <div className={css.userInfo}>
                <span className={css.userName}>
                  Welcome,{" "}
                  {user?.name
                    ? user.name.length > 8
                      ? `${user.name.slice(0, 8)}...`
                      : user.name
                    : "User"}
                </span>
                <div className={css.userAvatar}>
                  <svg width="20" height="20">
                    <use href="/sprite.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
              <Button
                text="Log Out"
                color="white"
                width={120}
                onClick={handleLogout}
              />
            </div>
          ) : (
            <div className={css.unauthorizedMenu}>
              <Button
                text="Log In"
                color="white"
                width={110}
                onClick={() => openModal("login")}
                size="small"
              />
              <Button
                text="Sign Up"
                color="green"
                width={130}
                onClick={() => openModal("register")}
                size="small"
              />
            </div>
          )}
        </div>
      </header>

      {/* Модалки */}
      <Modal isOpen={activeModal === "login"} onClose={closeModal}>
        <LoginForm />
      </Modal>

      <Modal isOpen={activeModal === "register"} onClose={closeModal}>
        <RegistrationForm />
      </Modal>
      <Modal
        isOpen={activeModal === "booking"}
        onClose={closeModal}
        padding={0}
        maxHeight="775px"
        maxWidth="600px"
      >
        <BookingForm />
      </Modal>
    </>
  );
}
