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
    const token = localStorage.getItem('access_token');
    
    // 🟢 Проверяем, что токен существует, он не равен пустой строке и не равен строке "undefined"
    if (token && token !== "undefined" && token !== "null" && token.trim() !== "" && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // 🟢 Если токена нет, принудительно удаляем заголовок, чтобы не спамить бэкенд пустой строкой
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

// Функция для тестового запроса по ID
export const getPsychologistById = async (id: string) => {
  const response = await api.get(`/psychologists/${id}`);
  console.log('Бекенд повернув ось це:', response.data); // Логируем ответ для проверки
  return response.data;
};
