"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { User, ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const user = {
    isAuthenticated: false,
    isStaff: false,
    firstName: "User",
    lastName: "",
    username: "user",
  };

  const is_cr = false;

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="flex justify-between items-center py-4 px-4 md:py-6 md:px-6">
        <div className="flex items-center">
          <Link href="/" className="mr-4 md:mr-8">
            <Image
              src="/images/logo_soylem_full.png"
              alt="Logo"
              width={80}
              height={32}
              className="w-auto h-auto md:w-[100px] md:h-[40px]"
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-[var(--main-color)]" />
          ) : (
            <Menu className="h-6 w-6 text-[var(--main-color)]" />
          )}
        </button>

        {/* Desktop Navigation */}
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

        {/* Mobile Navigation */}
        <div
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg`}
        >
          <div className="px-4 py-2 space-y-2">
            <Link
              href="#homePage"
              className="block py-2 text-[var(--main-color)] hover:text-[var(--main-color)] font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Главная
            </Link>
            <Link
              href="#aboutApp"
              className="block py-2 text-[var(--main-color)] hover:text-[var(--main-color)] font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Наша платформа
            </Link>
            <Link
              href="#team"
              className="block py-2 text-[var(--main-color)] hover:text-[var(--main-color)] font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              О нас
            </Link>
          </div>
        </div>

        {/* User Menu */}
        <div className="hidden md:block">
          {user.isAuthenticated ? (
            <div className="relative inline-block text-left">
              <button
                onClick={toggleDropdown}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 bg-[var(--main-color)] text-sm font-medium text-white hover:bg-[var(--main-color)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <User className="mr-2 h-5 w-5" />
                <span className="hidden sm:inline">
                  {user.firstName || user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.username}
                </span>
                <ChevronDown
                  className="ml-2 -mr-1 h-5 w-5"
                  aria-hidden="true"
                />
              </button>

              <div
                className={`${
                  dropdownOpen ? "block" : "hidden"
                } absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                <a
                  href={user.isStaff ? "/admin" : "/profile"}
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                  role="menuitem"
                >
                  Мой профиль
                </a>
                {is_cr ? (
                  <a
                    href="/my_boards"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                    role="menuitem"
                  >
                    Мои доски
                  </a>
                ) : (
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                    role="menuitem"
                  >
                    Мои подопечные
                  </a>
                )}
                <Link
                  href="/progress"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                  role="menuitem"
                >
                  Аналитика
                </Link>
                <Link
                  href="/library"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                  role="menuitem"
                >
                  Библиотека
                </Link>
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                  role="menuitem"
                >
                  Настройки
                </a>
                <a
                  href="/logout"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                  role="menuitem"
                >
                  Выйти
                </a>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 bg-[var(--main-color)] text-white rounded-md hover:bg-[var(--main-color)]/90"
              >
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
