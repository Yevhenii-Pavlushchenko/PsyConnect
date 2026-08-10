import { create } from 'zustand';

// --- 1. СТОР АВТОРИЗАЦІЇ ---
interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// Безпечне зчитування юзера з localStorage при старті додатку
const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("user_data");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(), 
  isLoggedIn: typeof window !== "undefined" && !!localStorage.getItem("access_token"), 
  
  login: (user, token) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_data', JSON.stringify(user)); // Зберігаємо об'єкт юзера
    set({ user, isLoggedIn: true });
  },
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data'); // Очищаємо при логауті
    set({ user: null, isLoggedIn: false });
  },
}));

// --- 2. СТОР МОДАЛОК ТА ТОСТІВ ---
interface PsychologistData {
  _id: string;
  name: string;
  avatar_url: string;
}

type ModalType = 'login' | 'register' | 'booking' | null;

interface ModalState {
  activeModal: ModalType;
  modalData: PsychologistData | null;
  isToastOpen: boolean;
  openModal: (type: ModalType, data?: PsychologistData | null) => void;
  closeModal: () => void;
  openAuthToast: () => void;
  closeAuthToast: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalData: null,
  isToastOpen: false,
  openModal: (type, data = null) => 
    set({ activeModal: type, modalData: data, isToastOpen: false }),
  closeModal: () => 
    set({ activeModal: null, modalData: null }),
  openAuthToast: () => 
    set({ isToastOpen: true }),
  closeAuthToast: () => 
    set({ isToastOpen: false }),
}));

// --- 3. СТОР УЛЮБЛЕНОГО ---
interface FavoritesState {
  ids: string[];
  setFavorites: (ids: string[]) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  ids: [],
  setFavorites: (ids) => set({ ids }),
  addFavorite: (id) => set((state) => ({ ids: [...state.ids, id] })),
  removeFavorite: (id) => set((state) => ({ ids: state.ids.filter((favId) => favId !== id) })),
}));
