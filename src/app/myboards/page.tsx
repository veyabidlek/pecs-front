"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/navBar";

interface Board {
  id: number;
  name: string;
  color: string;
}

const MyBoards: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([
    { id: 1, name: "Animals", color: "#cc4b48" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const handleCreateBoard = () => {
    const newBoard: Board = {
      id: boards.length + 1,
      name: newBoardName,
      color: "#cc4b48", // default color
    };
    setBoards([...boards, newBoard]);
    setNewBoardName("");
    setShowForm(false);
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
      <Navbar isHomePage={false} />
      <main className="p-12">
        <h1 className="text-3xl font-bold mb-8">Мои доски</h1>
        <div className="flex flex-wrap">
          {boards.map((board) => (
            <div key={board.id} className="w-1/4 min-w-[10em] p-4 text-center">
              <Link href={`/myboards/${board.id}`}>
                <div className="relative h-[250px] w-[175px] mx-auto transform transition-transform duration-300 hover:scale-110">
                  <div
                    className="absolute h-[250px] w-[175px] rounded-l-[5px] rounded-r-[15px] z-10"
                    style={{ backgroundColor: board.color }}
                  >
                    <div className="h-[50px] mt-[80px] p-4 text-left text-sm bg-[#eeeed7] shadow-md relative z-10">
                      <div
                        className="absolute bottom-0 left-0 w-full h-[15px]"
                        style={{ backgroundColor: "#cddc39" }}
                      ></div>
                    </div>
                  </div>
                  <div className="absolute h-full w-full bg-[#fbfae8] rounded-l-[5px] rounded-r-[16px] overflow-hidden"></div>
                </div>
                <h6 className="mt-2">{board.name}</h6>
              </Link>
            </div>
          ))}
          <div className="w-1/4 min-w-[10em] p-4 text-center">
            <div
              className="relative h-[250px] w-[175px] mx-auto transform transition-transform duration-300 hover:scale-110 cursor-pointer"
              onClick={() => setShowForm(true)}
            >
              <div
                className="absolute h-[250px] w-[175px] rounded-l-[5px] rounded-r-[15px] z-10"
                style={{ backgroundColor: "#4e4e4e" }}
              >
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="text-[#a2a2a2]"
                  style={{
                    fontSize: "70px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
              <div className="absolute h-full w-full bg-[#fbfae8] rounded-l-[5px] rounded-r-[16px] overflow-hidden"></div>
            </div>
            <h6 className="mt-2">Добавить новую доску</h6>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <div className="bg-white p-8 w-1/3 shadow-lg">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowForm(false)}
                  className="text-2xl text-[--main-color]"
                >
                  <FontAwesomeIcon icon={faSquareXmark} />
                </button>
              </div>
              <h3 className="text-xl mb-4">Создать доску</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateBoard();
                }}
              >
                <label>Название доски</label>
                <br />
                <input
                  className="form-input w-3/4 rounded-md mt-1 border-gray-300"
                  type="text"
                  placeholder="Введите название"
                  id="name"
                  name="name"
                  required
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                />
                <br />
                <br />
                <button
                  type="submit"
                  className="bg-[--main-color] text-white rounded-md px-4 py-2"
                >
                  Создать
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBoards;
