import { create } from 'zustand';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isHydrated: boolean;     
  checkAuth: () => void;   
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, 
  isLoggedIn: false, 
  isHydrated: false,       

  checkAuth: () => {
    if (typeof window === "undefined") return;
    try {
      const storedUser = localStorage.getItem("user_data");
      
      if (storedUser) {
        set({ 
          user: JSON.parse(storedUser), 
          isLoggedIn: true, 
          isHydrated: true 
        });
      } else {
        set({ user: null, isLoggedIn: false, isHydrated: true });
      }
    } catch {
      set({ user: null, isLoggedIn: false, isHydrated: true });
    }
  },
  
  login: (user) => {
    localStorage.setItem('user_data', JSON.stringify(user));
    set({ user, isLoggedIn: true, isHydrated: true });
  },
  
  logout: () => {
    localStorage.removeItem('user_data');
    set({ user: null, isLoggedIn: false, isHydrated: true });
  },
}));

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
