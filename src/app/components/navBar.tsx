// components/Navbar.jsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { User, ChevronDown } from "lucide-react"; // Install lucide-react: npm install lucide-react

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const user = {
    // Replace with your actual user data fetching logic
    isAuthenticated: true, // Or false, depending on authentication state
    isStaff: false, // Or true, based on user role
    firstName: "User", // Replace with user's first name
    lastName: "", // Replace with user's last name
    username: "user",
  };

  const is_cr = false; // Replace with your logic for is_cr

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="flex justify-between items-center py-6">
        <div className="mr-8">
          <Image
            src="/images/logo_soylem_full.png"
            alt="Logo"
            width={100}
            height={40}
          />
        </div>
        <div className="hidden lg:flex space-x-8">
          <Link
            href="#homePage"
            className="text-[var(--main-color)] hover:text-[var(--main-color)] font-bold"
          >
            Главная
          </Link>
          <Link
            href="#aboutApp"
            className="text-[var(--main-color)] hover:text-[var(--main-color)] font-bold"
          >
            Наша платформа
          </Link>
          <Link
            href="#team"
            className="text-[var(--main-color)] hover:text-[var(--main-color)] font-bold"
          >
            О нас
          </Link>
        </div>
        <div>
          {user.isAuthenticated ? (
            <div className="relative inline-block text-left">
              <button
                onClick={toggleDropdown}
                className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-[var(--main-color)] text-sm font-medium text-white hover:bg-[var(--main-color)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="menu-button"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <User className="mr-2 h-5 w-5" />
                {user.firstName || user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.username}
                <ChevronDown
                  className="ml-2 -mr-1 h-5 w-5"
                  aria-hidden="true"
                />
              </button>
              <div
                className={`${
                  dropdownOpen ? "block" : "hidden"
                } bg-white absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[var(--light-main)] ring-1 ring-black ring-opacity-5 focus:outline-none z-200`} // Increase z-index here
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <a
                  href={user.isStaff ? "/admin" : "/profile"}
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                  role="menuitem"
                  id="menu-item-0"
                >
                  Мой профиль
                </a>
                {is_cr ? (
                  <a
                    href="/my_boards"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                    role="menuitem"
                    id="menu-item-1"
                  >
                    Мои доски
                  </a>
                ) : (
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                    role="menuitem"
                    id="menu-item-2"
                  >
                    Мои подопечные
                  </a>
                )}
                <Link
                  href="/progress"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                  role="menuitem"
                  id="menu-item-3"
                >
                  Аналитика
                </Link>
                <Link
                  href="/library"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                  role="menuitem"
                  id="menu-item-4"
                >
                  Библиотека
                </Link>
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                  role="menuitem"
                  id="menu-item-5"
                >
                  Настройки
                </a>
                <a
                  href="/logout"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                  role="menuitem"
                  id="menu-item-6"
                >
                  Выйти
                </a>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="font-bold text-[var(--text-color)]"
              >
                <User className="mr-2 h-5 w-5 inline-block align-middle" />
                Войти
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-[var(--main-color)] text-white rounded-md hover:bg-[var(--main-color)]/90"
              >
                Регистрация
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
