import { create } from "zustand";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  
  // Переключатели модалок
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  
  // Экшены авторизации
  loginUser: (userData: User, token: string) => void;
  logoutUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: typeof window !== "undefined" && !!localStorage.getItem("access_token"),
  user: null, // Имя можно также заситить при инициализации, если сохранять в localStorage
  isLoginModalOpen: false,
  isRegisterModalOpen: false,

  openLoginModal: () => set({ isLoginModalOpen: true, isRegisterModalOpen: false }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  openRegisterModal: () => set({ isRegisterModalOpen: true, isLoginModalOpen: false }),
  closeRegisterModal: () => set({ isRegisterModalOpen: false }),

  loginUser: (userData, token) => {
    localStorage.setItem("access_token", token);
    set({ isLoggedIn: true, user: userData });
  },
  
  logoutUser: () => {
    localStorage.removeItem("access_token");
    set({ isLoggedIn: false, user: null });
  },
}));
