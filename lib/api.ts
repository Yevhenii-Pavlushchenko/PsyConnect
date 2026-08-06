import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://psy-connect.b.goit.study/api-docs', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
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
  return response.data;
};
