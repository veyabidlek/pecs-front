"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Navbar from "../components/navBar";

interface SignupFormData {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}

interface Message {
  text: string;
  type: "warning" | "success" | "error";
}

const SignupPage = () => {
  const [role, setRole] = useState<"cg_role" | "cr_role">("cg_role");
  const [messages, setMessages] = useState<Message[]>([]);
  const { register, handleSubmit } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, role }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      // Handle successful signup
      setMessages([{ text: "Successfully registered!", type: "success" }]);
    } catch (error) {
      setMessages([{ text: "Registration failed", type: "error" }]);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-[0_15px_20px_rgba(0,0,0,0.1)]">
          {/* Title */}
          <div className="bg-[--main-color] text-white text-2xl font-bold text-center py-5 px-12 rounded-t-2xl">
            <span>Создать аккаунт</span>
          </div>

          {/* Alert Messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-4 mb-4 ${
                message.type === "warning"
                  ? "bg-yellow-100 text-yellow-700"
                  : message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
              <button
                onClick={() =>
                  setMessages(messages.filter((_, i) => i !== index))
                }
                className="text-xl font-bold"
              >
                ×
              </button>
            </div>
          ))}

          {/* Role Selection */}
          <div className="flex justify-center mt-5">
            <button
              onClick={() => setRole("cg_role")}
              className={`mx-2.5 px-5 py-1.5 rounded-lg border-2 border-[--main-color] ${
                role === "cg_role"
                  ? "bg-[--main-color] text-white"
                  : "bg-white text-black"
              }`}
            >
              для Опекуна
            </button>
            <button
              onClick={() => setRole("cr_role")}
              className={`mx-2.5 px-5 py-1.5 rounded-lg border-2 border-[--main-color] ${
                role === "cr_role"
                  ? "bg-[--main-color] text-white"
                  : "bg-white text-black"
              }`}
            >
              для Подопечного
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-5">
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <label className="w-4/5">Введите ваше имя</label>
                <input
                  {...register("first_name", { required: true })}
                  placeholder="Ваше имя"
                  className="w-4/5 mt-2.5 px-5 py-2.5 border-2 border-[--dark-grey] rounded-lg"
                />
              </div>

              <div className="flex flex-col items-center">
                <label className="w-4/5">Введите вашу фамилию</label>
                <input
                  {...register("last_name", { required: true })}
                  placeholder="Ваша фамилия"
                  className="w-4/5 mt-2.5 px-5 py-2.5 border-2 border-[--dark-grey] rounded-lg"
                />
              </div>

              <div className="flex flex-col items-center">
                <label className="w-4/5">Введите ваш email</label>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+\.\S+$/,
                  })}
                  placeholder="Ваш email"
                  className="w-4/5 mt-2.5 px-5 py-2.5 border-2 border-[--dark-grey] rounded-lg"
                />
              </div>

              <div className="flex flex-col items-center">
                <label className="w-4/5">Введите имя пользователя</label>
                <input
                  {...register("username", { required: true })}
                  placeholder="Имя пользователя"
                  className="w-4/5 mt-2.5 px-5 py-2.5 border-2 border-[--dark-grey] rounded-lg"
                />
              </div>

              <div className="flex flex-col items-center">
                <label className="w-4/5">Введите пароль</label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Пароль"
                  className="w-4/5 mt-2.5 px-5 py-2.5 border-2 border-[--dark-grey] rounded-lg"
                />
              </div>

              <div className="flex flex-col items-center mt-4">
                <button
                  type="submit"
                  className="w-4/5 py-2.5 bg-[--main-color] text-white rounded-lg hover:brightness-90 transition-all"
                >
                  Зарегистрироваться
                </button>
              </div>
            </div>

            <div className="text-center mt-4">
              Уже есть аккаунт?{" "}
              <Link
                href="/login"
                className="text-[--text-color] hover:text-[--main-color]"
              >
                Войти
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
