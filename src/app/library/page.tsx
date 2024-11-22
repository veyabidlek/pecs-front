"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import LibraryCard from "../components/libraryCard";
import SidebarForm from "../components/sideBarForm";
import Navbar from "../components/navBar";

interface Category {
  id: number;
  name: string;
  images: string[];
}

const LibraryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [privateImages, setPrivateImages] = useState<Category[]>([]);
  const [showPrivate, setShowPrivate] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formType, setFormType] = useState<"folder" | "image" | null>(null);

  useEffect(() => {
    fetchLibraryData();
  }, []);

  const fetchLibraryData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${process.env.BACKEND_URL}/library`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data.categories || []);
      setPrivateImages(response.data.private_imgs || []);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const toggleCards = (type: string) => {
    setShowPrivate(type === "private");
  };

  const openForm = (type: "folder" | "image") => {
    setFormType(type);
    setIsSidebarOpen(true);
  };

  const closeForm = () => {
    setIsSidebarOpen(false);
    setFormType(null);
  };

  return (
    <>
      <main className="min-h-screen mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <Navbar isHomePage={false} />
        <h1 className="text-2xl font-bold mb-6">Библиотека</h1>
        <div className="flex mb-6 space-x-4">
          <button
            className={`px-6 py-2 rounded-full text-white ${
              !showPrivate ? "bg-[--main-color]" : "bg-gray-400"
            }`}
            onClick={() => toggleCards("all")}
          >
            ВСЕ
          </button>
          <button
            className={`px-6 py-2 rounded-full text-white ${
              showPrivate ? "bg-[--main-color]" : "bg-gray-400"
            }`}
            onClick={() => toggleCards("private")}
          >
            МОИ КАРТОЧКИ
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-32">
          {showPrivate
            ? privateImages.map((category) => (
                <LibraryCard key={category.id} category={category} />
              ))
            : categories.map((category) => (
                <LibraryCard key={category.id} category={category} />
              ))}
        </div>

        {/* Sidebar Form Component */}
        <SidebarForm
          isOpen={isSidebarOpen}
          formType={formType}
          onClose={closeForm}
          onSuccess={fetchLibraryData}
        />
      </main>

      {/* Move this outside of <main> */}
      <div className="fixed bottom-0 w-full flex justify-center space-x-4 bg-white p-4">
        <button
          className="px-8 py-2 bg-white border border-gray-300 text-[--main-color] rounded-full"
          onClick={() => openForm("folder")}
        >
          Добавить папку
        </button>
        <button
          className="px-8 py-2 bg-white border border-gray-300 text-[--main-color] rounded-full"
          onClick={() => openForm("image")}
        >
          Добавить карточку
        </button>
      </div>
    </>
  );
};

export default LibraryPage;
