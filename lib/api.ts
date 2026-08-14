import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://psy-connect.b.goit.study', 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // 🟢 1. Перевіряємо, що ми знаходимося в браузері, а не на сервері Next.js
    if (typeof window === 'undefined') {
      return config; 
    }

    const token = localStorage.getItem('access_token');
    
    // 🟢 2. Безпечно перевіряємо та додаємо токен
    if (token && token !== "undefined" && token !== "null" && token.trim() !== "" && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      if (config.headers) {
        delete config.headers.Authorization;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Функція для тестового запроса по ID
export const getPsychologistById = async (id: string) => {
  const response = await api.get(`/psychologists/${id}`);
  console.log('Бекенд повернув ось це:', response.data);
  return response.data;
};
