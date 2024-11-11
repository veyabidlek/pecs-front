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
  const [message, setMessage] = useState<Message | null>(null);
  const [messageVisible, setMessageVisible] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessageVisible(true);

    try {
      await axios.post(`${url}/signup`, {
        username,
        first_name: name,
        last_name: surname,
        email,
        password,
        role,
      });
      setMessage({ text: "Регистрация успешна!", type: "success" });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      console.error("Error submitting registration: ", err);
      setMessage({
        text: "Ошибка регистрации. Пожалуйста, попробуйте снова.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
      <Navbar isHomePage={false} />
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg">
          <div className="bg-[--main-color] text-white text-2xl font-bold text-center py-5 rounded-t-2xl">
            <span>Создать аккаунт</span>
          </div>

          {message && messageVisible && (
            <div
              className={`${
                message.type === "success"
                  ? "bg-green-100 border-green-400 text-green-700"
                  : "bg-red-100 border-red-400 text-red-700"
              } border px-4 py-3 relative mx-4 mt-4 rounded flex justify-between items-center`}
              role="alert"
            >
              <span className="block sm:inline">{message.text}</span>
              <button
                className="text-sm opacity-75 hover:opacity-100"
                onClick={() => setMessageVisible(false)}
              >
                ✕
              </button>
            </div>
          )}

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
