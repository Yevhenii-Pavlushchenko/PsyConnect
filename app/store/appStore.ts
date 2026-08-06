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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false, 
  login: (user, token) => {
    localStorage.setItem('access_token', token);
    set({ user, isLoggedIn: true });
  },
  logout: () => {
    localStorage.removeItem('access_token');
    set({ user: null, isLoggedIn: false });
  },
}));

// --- 2. СТОР МОДАЛОК ТА ТОСТІВ ---
// Спершу переконайся, що PsychologistData оголошено саме так, оскільки бекенд повертає _id
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
  // Додаємо | null у сигнатуру методу для аргументу data
  openModal: (type: ModalType, data?: PsychologistData | null) => void;
  closeModal: () => void;
  openAuthToast: () => void;
  closeAuthToast: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalData: null,
  isToastOpen: false,
  // Тепер TypeScript не буде сваритися на data = null
  openModal: (type, data = null) => 
    set({ activeModal: type, modalData: data, isToastOpen: false }),
  closeModal: () => 
    set({ activeModal: null, modalData: null }),
  openAuthToast: () => 
    set({ isToastOpen: true }),
  closeAuthToast: () => 
    set({ isToastOpen: false }),
}));


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
