"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { User, ChevronDown, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

type NavbarProps = {
  isHomePage: boolean;
};

type UserData = {
  isAuthenticated: boolean;
  isStaff: boolean;
  firstName: string;
  lastName: string;
  username: string;
  userType: string;
};

const Navbar = ({ isHomePage }: NavbarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserData>({
    isAuthenticated: false,
    isStaff: false,
    firstName: "",
    lastName: "",
    username: "",
    userType: "",
  });

  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem("accessToken");
      const userData = localStorage.getItem("userData");

      if (accessToken && userData) {
        const parsedUserData = JSON.parse(userData);
        setUser({
          isAuthenticated: true,
          isStaff: parsedUserData.userType === "staff",
          firstName: parsedUserData.firstName || "",
          lastName: parsedUserData.lastName || "",
          username: parsedUserData.username || "",
          userType: parsedUserData.userType || "",
        });
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");

      setUser({
        isAuthenticated: false,
        isStaff: false,
        firstName: "",
        lastName: "",
        username: "",
        userType: "",
      });

      router.push("/");
    }
  };

  const is_cr = user.userType === "caregiver";

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
            href={isHomePage ? "#homeHero" : "/"}
            className="text-[var(--main-color)] hover:text-[var(--main-color)] font-bold"
          >
            Главная
          </Link>
          <Link
            href={isHomePage ? "#aboutApp" : "/#aboutApp"}
            className="text-[var(--main-color)] hover:text-[var(--main-color)] font-bold"
          >
            Наша платформа
          </Link>
          <Link
            href={isHomePage ? "#team" : "/#team"}
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
              href={isHomePage ? "#homeHero" : "/#homeHero"}
              className="block py-2 text-[var(--main-color)] hover:text-[var(--main-color)] font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Главная
            </Link>
            <Link
              href={isHomePage ? "#aboutApp" : "/#aboutApp"}
              className="block py-2 text-[var(--main-color)] hover:text-[var(--main-color)] font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Наша платформа
            </Link>
            <Link
              href={isHomePage ? "#team" : "/#team"}
              className="block py-2 text-[var(--main-color)] hover:text-[var(--main-color)] font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              О нас
            </Link>
            {!isLoading && !user.isAuthenticated && (
              <div className="flex flex-col gap-2">
                <button>
                  <Link
                    href="/login"
                    className="block px-4 py-2 bg-[var(--main-color)] text-white rounded-md hover:bg-[var(--main-color)]/90"
                  >
                    Войти
                  </Link>
                </button>
                <button>
                  <Link
                    href="/signup"
                    className="block px-4 py-2 bg-[var(--main-color)] text-white rounded-md hover:bg-[var(--main-color)]/90"
                  >
                    Регистрация
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* User Menu */}
        <div className="hidden lg:block">
          {isLoading ? (
            <div className="w-[200px] h-[40px] bg-gray-200 animate-pulse rounded-md"></div>
          ) : (
            <>
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
                    <Link
                      href={user.isStaff ? "/admin" : "/profile"}
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                      role="menuitem"
                    >
                      Мой профиль
                    </Link>
                    {is_cr ? (
                      <Link
                        href="/my_boards"
                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                        role="menuitem"
                      >
                        Мои доски
                      </Link>
                    ) : (
                      <Link
                        href="/my_clients"
                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                        role="menuitem"
                      >
                        Мои подопечные
                      </Link>
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
                    <Link
                      href="/settings"
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                      role="menuitem"
                    >
                      Настройки
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 w-full text-left px-4 py-2 text-sm hover:bg-[var(--main-color)] hover:text-white"
                      role="menuitem"
                    >
                      Выйти
                    </button>
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
