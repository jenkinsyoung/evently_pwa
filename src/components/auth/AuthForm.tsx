"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { login, register, setAuthToken } from "@/lib/api/auth";
import type { LoginRequest, RegisterRequest } from "@/types/auth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    startTransition(async () => {
      try {
        let result;
        if (isLogin) {
          const credentials: LoginRequest = {
            login: data.login as string,
            password: data.password as string,
          };
          result = await login(credentials);
        } else {
          const userData: RegisterRequest = {
            login: data.login as string,
            email: data.email as string,
            password: data.password as string,
            phone: data.phone as string,
            name: data.name as string,
          };
          result = await register(userData);
           const credentials: LoginRequest = {
            login: data.login as string,
            password: data.password as string,
          };
          if( result.ok) result = await login(credentials);
        }

        if (result.ok && result.data?.accessToken) {
          setAuthToken(result.data.accessToken);
          window.location.href = "/events"; // редирект
        } else {
          setError("Неверные данные или ошибка сервера");
        }
      } catch (err) {
        setError("Ошибка подключения");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-purple-400 to-indigo-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/20"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            {isLogin ? "Вход" : "Регистрация"}
          </h1>
          <p className="text-gray-600">
            {isLogin ? "Войдите в свой аккаунт" : "Создайте новый аккаунт"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя
              </label>
              <input
                name="name"
                type="text"
                required={!isLogin}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                placeholder="Иван Иванов"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Логин или Email
            </label>
            <input
              name="login"
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50"
              placeholder="user123 или user@example.com"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Телефон
              </label>
              <input
                name="phone"
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                required={!isLogin}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                placeholder="user@example.com"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-100 border border-red-300 text-red-800 rounded-2xl text-sm"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
          >
            {isLogin 
              ? "Нет аккаунта? Зарегистрироваться" 
              : "Уже есть аккаунт? Войти"
            }
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <Link
            href="/events"
            className="block w-full text-center py-2 px-4 text-sm text-gray-600 hover:text-purple-600 transition-colors rounded-xl bg-gray-50 hover:bg-gray-100"
          >
            Продолжить без регистрации
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
