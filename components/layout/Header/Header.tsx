"use client";

import css from "./Header.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "../../../app/store/authStore"; 
import Modal from "../../ui/Modal/Modal";
import LoginForm from "@/components/forms/LoginForm/LoginForm";
import RegistrationForm from "@/components/forms/RegistrationForm/RegistrationForm";
import toast from "react-hot-toast";
import { api } from "@/lib/api"; 
import Button from "../../ui/Button/Button"; // Підправ шлях до твоєї папки Button якщо він інший

export default function Header() {
  const pathname = usePathname();
  
  const { 
    isLoggedIn, 
    user, 
    logoutUser,
    isLoginModalOpen, 
    isRegisterModalOpen,
    openLoginModal, 
    closeLoginModal, 
    openRegisterModal, 
    closeRegisterModal 
  } = useAuthStore();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); 
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      logoutUser();
      toast.success("Logged out successfully");
    }
  };

  return (
    <>
      <header className={css.header}>
        {/* Логотип залишається через Link, бо це не кнопка */}
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
              <Link className={`${css.navigationLink} ${pathname === "/" ? css.active : ""}`} href="/">
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
            {isLoggedIn && (
              <li className={css.navigationItem}>
                <Link
                  className={`${css.navigationLink} ${pathname === "/favorites" ? css.active : ""}`}
                  href="/favorites"
                >
                  <div className={css.favoritesLinkWrapper}>
                    Favorites
                    <svg width="16" height="16" className={css.heartIcon}>
                      <use href="/sprite.svg#icon-heart"></use>
                    </svg>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Блок Авторизації з новими кастомними кнопками */}
        <div className={css.authBlock}>
          {isLoggedIn ? (
            <div className={css.authorizedMenu}>
              <div className={css.userInfo}>
                <div className={css.userAvatar}>
                  <svg width="20" height="20">
                    <use href="/sprite.svg#icon-user"></use>
                  </svg>
                </div>
                <span className={css.userName}>Welcome, {user?.name || "User"}</span>
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
                  onClick={openLoginModal} 
                  size="small"
              />
              <Button 
                text="Sign Up" 
                color="green" 
                width={130} 
                  onClick={openRegisterModal} 
                  size="small"
              />
            </div>
          )}
        </div>
      </header>

      {/* Модальні вікна */}
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <LoginForm />
      </Modal>

      <Modal isOpen={isRegisterModalOpen} onClose={closeRegisterModal}>
        <RegistrationForm />
      </Modal>
    </>
  );
}
