"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./navBar";

interface CategoryImage {
  [key: string]: string;
}

interface Category {
  id: number;
  name: string;
}

interface PrivateImage {
  image?: string;
  name?: string;
}

interface LibraryProps {
  categories: Category[];
  images: { [key: string]: CategoryImage[] };
  privateImages: PrivateImage[];
}

const Library: React.FC<LibraryProps> = ({
  categories,
  images,
  privateImages,
}) => {
  const [isRightNavOpen, setIsRightNavOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<"folder" | "image" | null>(null);
  const [displayMode, setDisplayMode] = useState<"all" | "private">("all");

  const handleNavToggle = (form: "folder" | "image") => {
    if (!isRightNavOpen) {
      setIsRightNavOpen(true);
      setActiveForm(form);
    } else {
      if (activeForm === form) {
        setIsRightNavOpen(false);
        setActiveForm(null);
      } else {
        setActiveForm(form);
      }
    }
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
      <Navbar />
      <h1 className="text-2xl font-bold mt-12 mb-6">Библиотека</h1>

      <div className="flex flex-wrap mb-5">
        <button
          className={`px-8 py-1.5 mr-5 mb-2.5 rounded-full text-white text-sm cursor-pointer
                        ${
                          displayMode === "all"
                            ? "bg-[--main-color]"
                            : "bg-[#5996a5]"
                        }`}
          onClick={() => setDisplayMode("all")}
        >
          ВСЕ
        </button>
        <button
          className={`px-8 py-1.5 mr-5 mb-2.5 rounded-full text-white text-sm cursor-pointer
                        ${
                          displayMode === "private"
                            ? "bg-[--main-color]"
                            : "bg-[#5996a5]"
                        }`}
          onClick={() => setDisplayMode("private")}
        >
          МОИ КАРТОЧКИ
        </button>
      </div>

      {/* Public Cards */}
      <div
        className={`flex flex-wrap mb-24 ${
          displayMode === "all" ? "flex" : "hidden"
        }`}
      >
        {categories.map((category) => (
          <div key={category.id} className="w-1/5 px-2.5 mb-5">
            <div className="border border-black/20 rounded p-1.5 text-center">
              <div className="overflow-hidden">
                <Link href={`/category/${category.name}/${category.id}`}>
                  {images[category.name]?.length > 0 ? (
                    images[category.name].map((img, idx) => (
                      <div key={idx}>
                        {Object.entries(img).map(([k, v]) => (
                          <Image
                            key={k}
                            src={`/static/${v}`}
                            alt={category.name}
                            width={200}
                            height={190}
                            className="h-[190px] object-cover"
                          />
                        ))}
                      </div>
                    ))
                  ) : (
                    <Image
                      src="/static/other_imgs/no_image.png"
                      alt="No image"
                      width={200}
                      height={200}
                      className="h-[200px] object-cover"
                    />
                  )}
                </Link>
              </div>
              <Link
                href={`/category/${category.name}/${category.id}`}
                className="font-bold text-[#1E1E1E] no-underline"
              >
                <h5>{category.name}</h5>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Private Cards */}
      <div
        className={`flex flex-wrap mb-24 ${
          displayMode === "private" ? "flex" : "hidden"
        }`}
      >
        {privateImages.map((item, index) => (
          <div key={index} className="w-1/5 px-2.5 mb-5">
            <div className="border border-black/20 rounded p-1.5 text-center">
              <div className="overflow-hidden">
                <Link href="#">
                  {item.image ? (
                    <Image
                      src={`/static/${item.image}`}
                      alt={item.name || "Private image"}
                      width={200}
                      height={190}
                      className="h-[190px] object-cover"
                    />
                  ) : (
                    <Image
                      src="/static/other_imgs/no_image.png"
                      alt="No image"
                      width={200}
                      height={200}
                      className="h-[200px] object-cover"
                    />
                  )}
                </Link>
              </div>
              <Link href="#" className="font-bold text-[#1E1E1E] no-underline">
                <h5>{item.name}</h5>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white transition-all duration-500 pt-[60px] z-10
                    ${isRightNavOpen ? "w-[310px]" : "w-0"}`}
      >
        <div className="mx-5 relative top-[20%] transition-all duration-300">
          {activeForm === "folder" && (
            <div>{/* Add your folder form component here */}</div>
          )}
          {activeForm === "image" && (
            <div>{/* Add your image form component here */}</div>
          )}
        </div>
      </div>

      {/* Add Buttons */}
      <div className="fixed left-0 right-0 bottom-0 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex justify-center items-center gap-4 py-8">
            <button
              onClick={() => handleNavToggle("folder")}
              className="rounded-[25px] border border-black/20 bg-white text-center w-[200px] h-[45px] text-[#FF166A] cursor-pointer hover:bg-gray-50"
            >
              Добавить папку
            </button>
            <button
              onClick={() => handleNavToggle("image")}
              className="rounded-[25px] border border-black/20 bg-white text-center w-[200px] h-[45px] text-[#FF166A] cursor-pointer hover:bg-gray-50"
            >
              Добавить карточку
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
