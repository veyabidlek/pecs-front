"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faLockOpen,
  faPlus,
  faChevronLeft,
  faImages,
  faXmark,
  faTrashCan,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/app/components/navBar";

interface Tab {
  id: number;
  name: string;
  color: string;
  straps_num: number;
}

interface ImageItem {
  id: number;
  label: string;
  src: string;
  position_x?: number;
  tabId?: number;
}

interface Category {
  id: number;
  name: string;
  images: ImageItem[];
}

const BoardPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [tabs, setTabs] = useState<Tab[]>([
    { id: 1, name: "Вкладка 1", color: "#cc4b48", straps_num: 5 },
  ]);

  const [activeTabId, setActiveTabId] = useState<number>(1);
  const [isLocked, setIsLocked] = useState(true);
  const [showLibrary, setShowLibrary] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [draggedItem, setDraggedItem] = useState<ImageItem | null>(null);
  const [showAddTabForm, setShowAddTabForm] = useState(false);

  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Ойыншықтар",
      images: [
        { id: 1, label: "Доп", src: "/board_images/ball.png" },
        { id: 2, label: "Көлік", src: "/board_images/car.png" },
      ],
    },
    {
      id: 2,
      name: "Мен",
      images: [{ id: 3, label: "Мансур", src: "/board_images/me.jpg" }],
    },
    {
      id: 3,
      name: "Сезімдер",
      images: [
        { id: 4, label: "Жақсы көрем", src: "/board_images/love.png" },
        { id: 5, label: "Жек көрем", src: "/board_images/hate.png" },
      ],
    },
    {
      id: 4,
      name: "Әрекеттер",
      images: [{ id: 6, label: "Тебу", src: "/board_images/kick.avif" }],
    },
  ]);

  const [imagesOnBoard, setImagesOnBoard] = useState<ImageItem[]>([]);
  const [imagesOnSentenceBar, setImagesOnSentenceBar] = useState<ImageItem[]>(
    []
  );

  const handleDragStart =
    (item: ImageItem, source: string) =>
    (event: React.DragEvent<HTMLDivElement>) => {
      setDraggedItem({ ...item, source });
    };

  const handleDropOnBoard = (
    event: React.DragEvent<HTMLDivElement>,
    laneIndex: number
  ) => {
    event.preventDefault();
    if (draggedItem && !isLocked) {
      const newItem = {
        ...draggedItem,
        position_x: laneIndex,
        tabId: activeTabId,
      };

      // Remove the item from imagesOnBoard if it exists (to prevent duplicates)
      setImagesOnBoard((prevImages) => {
        const withoutOld = prevImages.filter(
          (img) => !(img.id === draggedItem.id && img.tabId === activeTabId)
        );
        return [...withoutOld, newItem];
      });

      setDraggedItem(null);
    }
  };

  const handleDropOnSentenceBar = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (draggedItem && isLocked && draggedItem.source === "board") {
      setImagesOnSentenceBar([...imagesOnSentenceBar, draggedItem]);
      setDraggedItem(null);
    }
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    setShowLibrary(false);
    setActiveCategory(null);
  };

  const openLibrary = () => {
    setShowLibrary(true);
  };

  const closeLibrary = () => {
    setShowLibrary(false);
    setActiveCategory(null);
  };

  const openCategory = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId) || null;
    setActiveCategory(category);
  };

  const playSentence = () => {
    const sentence = imagesOnSentenceBar.map((img) => img.label).join(" ");
    alert(`Playing sentence: ${sentence}`);
    // Implement text-to-speech functionality here
  };

  const openAddTabForm = () => {
    setShowAddTabForm(true);
  };

  const closeAddTabForm = () => {
    setShowAddTabForm(false);
  };

  const handleAddTabSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const color = (form.elements.namedItem("color") as HTMLInputElement).value;
    const straps_num = parseInt(
      (form.elements.namedItem("straps") as HTMLInputElement).value
    );

    const newTab: Tab = {
      id: tabs.length + 1,
      name,
      color,
      straps_num,
    };
    setTabs([...tabs, newTab]);
    closeAddTabForm();
  };

  const handleDeleteBoardImages = () => {
    setImagesOnBoard(imagesOnBoard.filter((img) => img.tabId !== activeTabId));
  };

  return (
    <div className="relative h-screen">
      <Navbar isHomePage={false} />
      <div className="main h-[calc(100vh-95px)] relative mx-[200px] bg-grey shadow-lg">
        <div className="main-board-container relative w-full h-[63%]">
          {/* Unlock button */}
          {isLocked ? (
            <button
              className="unlock-button absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 bg-transparent backdrop-brightness-75 rounded text-text-color"
              onClick={toggleLock}
            >
              <FontAwesomeIcon icon={faLock} size="lg" />
            </button>
          ) : null}

          {/* Board containers */}
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`board-container ${
                tab.id === activeTabId ? "flex" : "hidden"
              } p-5 w-full h-full flex-wrap shadow-lg justify-center`}
              style={{ backgroundColor: tab.color }}
            >
              {Array.from({ length: tab.straps_num }).map((_, laneIndex) => (
                <div
                  key={laneIndex}
                  className="strap-container h-full flex mx-1 justify-center relative"
                  style={{
                    width: `calc(80% / ${tab.straps_num})`,
                  }}
                  name={`${laneIndex}`}
                >
                  <div
                    className="img-container droppable w-full h-full z-10 overflow-hidden"
                    onDragOver={allowDrop}
                    onDrop={(event) => handleDropOnBoard(event, laneIndex)}
                  >
                    {/* Images in the lane */}
                    {imagesOnBoard
                      .filter(
                        (img) =>
                          img.position_x === laneIndex && img.tabId === tab.id
                      )
                      .map((img) => (
                        <div
                          key={img.id}
                          className="board-item w-20 h-24 m-auto mt-1 flex justify-center text-center"
                          draggable={isLocked}
                          onDragStart={handleDragStart(
                            img,
                            isLocked ? "board" : "edit-board"
                          )}
                        >
                          <div className="card">
                            <div className="card-block">
                              <img
                                src={img.src}
                                alt={img.label}
                                className="card-img-top w-16 h-16 object-cover"
                              />
                              <span className="card-title">{img.label}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div
                    className="strap absolute w-2 z-0 h-full brightness-125"
                    style={{ backgroundColor: tab.color }}
                  ></div>
                </div>
              ))}
            </div>
          ))}

          {/* Tabs */}
          <div className="tab-container h-[13%] flex flex-wrap">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab w-[150px] h-full rounded-b-[25px] shadow-inner mr-1 ${
                  tab.id === activeTabId ? "shadow-lg" : ""
                }`}
                style={{ backgroundColor: tab.color }}
              >
                <button
                  className="tab-button w-full h-full text-white"
                  onClick={() => setActiveTabId(tab.id)}
                >
                  {tab.name}
                </button>
              </div>
            ))}
            {/* Add new tab */}
            <div
              className="tab-add w-[150px] h-full rounded-b-[25px] shadow-inner mr-1 bg-gray-500"
              onClick={openAddTabForm}
            >
              <button className="tab-button w-full h-full text-white">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar container */}
        <div className="bottom-bar-container absolute bottom-0 w-full h-[25%] bg-light-grey">
          {isLocked ? (
            // Sentence bar
            <div
              className="sentence-bar relative w-full h-full"
              style={{ backgroundColor: "#e2ad51" }}
            >
              <div className="board-buttons absolute right-0 top-0 m-auto z-5 flex flex-col">
                <button
                  className="board-button bg-transparent backdrop-brightness-125 text-text-color border border-text-color rounded w-10 h-10 m-4 text-2xl"
                  onClick={() => setImagesOnSentenceBar([])}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                <button
                  className="board-button bg-transparent backdrop-brightness-125 text-text-color border border-text-color rounded w-10 h-10 m-4 text-2xl"
                  onClick={playSentence}
                >
                  <FontAwesomeIcon icon={faPlay} />
                </button>
              </div>
              <div
                className="board-content-wrapper overflow-auto flex items-center h-full px-5"
                onDragOver={allowDrop}
                onDrop={handleDropOnSentenceBar}
              >
                {imagesOnSentenceBar.map((img, index) => (
                  <div
                    key={index}
                    className="board-item w-20 h-24 m-1 flex flex-col items-center text-center"
                  >
                    <div className="card">
                      <div className="card-block">
                        <img
                          src={img.src}
                          alt={img.label}
                          className="card-img-top w-16 h-16 object-cover"
                        />
                        <span className="card-title">{img.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Edit bar
            <div className="edit-bar relative w-full h-full flex items-center px-5">
              <div className="right-edit absolute left-0 flex items-center">
                <button
                  className="edit-button w-20 h-20 text-3xl m-4 bg-transparent border-none"
                  onClick={toggleLock}
                >
                  <FontAwesomeIcon icon={faLockOpen} />
                </button>
                <button
                  className="edit-button w-20 h-20 text-3xl m-4 bg-transparent border-none"
                  onClick={openLibrary}
                >
                  <FontAwesomeIcon icon={faImages} />
                </button>
              </div>
              <div className="left-edit absolute right-0">
                <button
                  className="edit-button w-20 h-20 text-3xl m-4 bg-transparent border-none"
                  onClick={handleDeleteBoardImages}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>
          )}

          {/* Library */}
          {showLibrary && (
            <div className="library-container absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white overflow-auto">
              {activeCategory ? (
                <div>
                  <div className="library-header bg-black bg-opacity-40 text-white p-4 flex">
                    <button
                      className="mr-4 border-none bg-transparent text-white text-lg"
                      onClick={() => setActiveCategory(null)}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} /> Медиатека
                    </button>
                  </div>
                  <div className="library-content flex overflow-x-auto p-4">
                    {activeCategory.images.map((image) => (
                      <div
                        key={image.id}
                        className="library-bar-item w-20 h-24 mx-2 flex flex-col items-center justify-center"
                        draggable
                        onDragStart={handleDragStart(image, "library")}
                      >
                        <div className="card-block text-center">
                          <img
                            src={image.src}
                            alt={image.label}
                            className="card-img-top w-16 h-16 object-cover"
                          />
                          <span className="card-title">{image.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="library-header bg-black bg-opacity-40 text-white p-4 flex">
                    <button
                      className="mr-4 border-none bg-transparent text-white text-lg"
                      onClick={closeLibrary}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} /> Медиатека
                    </button>
                  </div>
                  <div className="library-content flex overflow-x-auto p-4">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="mx-4 cursor-pointer"
                        onClick={() => openCategory(category.id)}
                      >
                        <div className="flex h-12 w-16 justify-center items-center">
                          <span className="card-title">{category.name}</span>
                        </div>
                        <div className="flex text-3xl justify-center items-center">
                          <FontAwesomeIcon icon={faImages} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add Tab Form */}
        {showAddTabForm && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div
              className="bg-white p-6 rounded-lg w-96"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end">
                <button
                  onClick={closeAddTabForm}
                  className="bg-white border-none text-2xl text-[--main-color]"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
              <div>
                <h3 className="text-xl font-bold">Создать новую вкладку</h3>
              </div>
              <form
                onSubmit={handleAddTabSubmit}
                className="my-4 flex flex-col items-start"
              >
                <label>Название вкладки</label>
                <input
                  className="form-input w-full rounded mt-1 border border-gray-300 p-2"
                  type="text"
                  placeholder="Введите название"
                  id="name"
                  name="name"
                  required
                />
                <label className="mt-2">Количество полос</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  defaultValue="3"
                  id="straps"
                  name="straps"
                  className="accent-[--main-color] w-full"
                />
                <label className="mt-2">Выберите цвет вкладки: </label>
                <input
                  type="color"
                  id="color"
                  name="color"
                  defaultValue="#cc4b48"
                  list="color_list"
                />
                <datalist id="color_list">
                  <option value="#cc4b48" />
                  <option value="#619451" />
                  <option value="#e2ad51" />
                  <option value="#30b58d" />
                </datalist>
                <button
                  type="submit"
                  className="mt-4 border-none bg-[--main-color] text-white rounded px-4 py-2"
                >
                  Создать
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardPage;
