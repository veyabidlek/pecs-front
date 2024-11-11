"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/navBar";
import axios from "axios";

const url = process.env.BACKEND_URL;

interface Message {
  text: string;
  type: "warning" | "success" | "error";
}

const SignupPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"cg_role" | "cr_role">("cg_role");
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/signup`, {
        username,
        first_name: name, // changed to first_name
        last_name: surname, // changed to last_name
        email,
        password,
        role,
      });
      alert("Successful registration");
      router.push("/login");
    } catch (err) {
      console.error("Error submitting registration: ", err);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Registration failed. Please try again.", type: "error" },
      ]);
    }
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
      <Navbar isHomePage={false} />
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg">
          {/* Title */}
          <div className="bg-[--main-color] text-white text-2xl font-bold text-center py-5 rounded-t-2xl">
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
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="flex flex-col items-center">
              <label className="w-4/5">Введите ваше имя</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border rounded w-4/5"
                required
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="w-4/5">Введите вашу фамилию</label>
              <input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="p-2 border rounded w-4/5"
                required
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="w-4/5">Введите ваш email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="p-2 border rounded w-4/5"
                required
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="w-4/5">Введите имя пользователя</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 border rounded w-4/5"
                required
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="w-4/5">Введите пароль</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="p-2 border rounded w-4/5"
                required
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
