"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/app/store/appStore"; // Проверь этот путь к твоему файлу стора!

interface TanstackProviderProps {
  children: React.ReactNode;
}

export default function TanstackProvider({ children }: TanstackProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth(); // 🟢 Восстанавливаем сессию из localStorage один раз при загрузке приложения
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  );
}
