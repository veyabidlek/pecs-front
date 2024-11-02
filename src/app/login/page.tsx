"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/navBar";

interface Message {
  text: string;
  type: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [messages] = useState<Message[]>([
    // Add any default messages here or fetch them from a source
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Your login logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
      <Navbar />
      <div className="flex items-center justify-center pt-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg">
          <div className="bg-[--main-color] text-white text-center py-5 px-12 rounded-t-2xl">
            <h1 className="text-2xl font-bold">Добро пожаловать в SӨYLEM</h1>
          </div>

          {messages.map((message, index) => (
            <div
              key={index}
              className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 relative mx-4 mt-4 rounded"
              role="alert"
            >
              <span className="block sm:inline">{message.text}</span>
              <button
                className="absolute top-0 right-0 px-4 py-3"
                onClick={() => {
                  // Add close handler
                }}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}

          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="flex flex-col items-center mt-2">
              <label className="w-4/5 text-gray-700">
                Введите имя пользователя
              </label>
              <input
                type="text"
                name="username"
                required
                placeholder="Имя пользователя"
                value={formData.username}
                onChange={handleChange}
                className="mt-2 w-4/5 px-5 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex flex-col items-center mt-2">
              <label className="w-4/5 text-gray-700">Введите пароль</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 w-4/5 px-5 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-4/5 bg-[--main-color] text-white py-2 rounded-lg hover:brightness-90 transition-colors"
              >
                Войти
              </button>
            </div>

            <div className="text-center mt-4 mb-2">
              <span className="text-gray-600">Впервые здесь? </span>
              <Link
                href="/signup"
                className="text-gray-900 hover:text-[--main-color] transition-colors"
              >
                Зарегистрироваться
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
