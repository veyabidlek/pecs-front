"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/navBar";
import { useRouter } from "next/navigation";
import axios from "axios";
import { userTypeAtom } from "../atoms";
import { useAtom } from "jotai";
const url = process.env.BACKEND_URL;

interface Message {
  text: string;
  type: string;
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<Message | null>(null);
  const [messageVisible, setMessageVisible] = useState(true);
  const [, setUserType] = useAtom(userTypeAtom);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessageVisible(true);
    try {
      const response = await axios.post(`${url}/login`, {
        username,
        password,
      });
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userType: response.data.user_type,
          userId: response.data.user_id,
          username: response.data.username,
        })
      );
      const userData = localStorage.getItem("userData");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setUserType(JSON.parse(userData).userType);
      setMessage({ text: "Успешный вход!", type: "success" });
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      console.error("Error submitting login: ", err);
      setMessage({
        text: "Ошибка при входе. Пожалуйста, попробуйте снова.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
      <Navbar isHomePage={false} />
      <div className="flex items-center justify-center pt-16">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg">
          <div className="bg-[--main-color] text-white text-center py-5 px-12 rounded-t-2xl">
            <h1 className="text-2xl font-bold">Добро пожаловать в SӨYLEM</h1>
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

          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="flex flex-col items-center mt-2">
              <label className="w-4/5 text-gray-700">
                Введите имя пользователя
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 border rounded w-4/5"
                required
              />
            </div>

            <div className="flex flex-col items-center mt-2">
              <label className="w-4/5 text-gray-700">Введите пароль</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="p-2 border rounded w-4/5"
                required
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
