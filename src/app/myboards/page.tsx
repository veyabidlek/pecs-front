"use client";
import React, { useState, useEffect } from "react";
import { Volume2, X, GripHorizontal } from "lucide-react";
import Navbar from "../../app/components/navBar";

interface PECSItem {
  id: string;
  label: string;
  icon: string;
}

interface DragEvent extends React.DragEvent {
  dataTransfer: DataTransfer;
}

const PECSBoard = () => {
  const [sentence, setSentence] = useState<PECSItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("actions");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);

  useEffect(() => {
    setSpeechSupported("speechSynthesis" in window);
  }, []);

  const categories: Record<string, PECSItem[]> = {
    actions: [
      { id: "want", label: "I want", icon: "👋" },
      { id: "play", label: "play", icon: "🎮" },
      { id: "eat", label: "eat", icon: "🍽️" },
      { id: "drink", label: "drink", icon: "🥤" },
    ],
    items: [
      { id: "water", label: "water", icon: "💧" },
      { id: "food", label: "food", icon: "🍎" },
      { id: "toy", label: "toy", icon: "🧸" },
      { id: "book", label: "book", icon: "📚" },
    ],
    feelings: [
      { id: "happy", label: "happy", icon: "😊" },
      { id: "sad", label: "sad", icon: "😢" },
      { id: "tired", label: "tired", icon: "😴" },
      { id: "angry", label: "angry", icon: "😠" },
    ],
  };

  const handleDragStart = (e: DragEvent, item: PECSItem) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
    const dragPreview = document.createElement("div");
    dragPreview.className = "bg-white p-2 rounded shadow";
    dragPreview.textContent = `${item.icon} ${item.label}`;
    document.body.appendChild(dragPreview);
    e.dataTransfer.setDragImage(dragPreview, 0, 0);
    setTimeout(() => document.body.removeChild(dragPreview), 0);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    try {
      const item = JSON.parse(e.dataTransfer.getData("text/plain")) as PECSItem;
      setSentence([...sentence, item]);
    } catch (error) {
      console.error("Error parsing dropped item:", error);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const removeFromSentence = (index: number) => {
    setSentence(sentence.filter((_, i) => i !== index));
  };

  const clearSentence = () => {
    setSentence([]);
  };

  const speakSentence = () => {
    if (speechSupported && sentence.length > 0) {
      const text = sentence.map((item) => item.label).join(" ");
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
      <Navbar isHomePage={false} />
      {/* Sentence Building Area */}
      <div className="bg-white rounded-lg shadow-lg mb-6 p-6">
        <div
          className={`min-h-16 p-4 bg-gray-50 rounded-lg flex items-center gap-2 flex-wrap
            ${
              isDragging
                ? "border-2 border-blue-500 border-dashed"
                : "border-2 border-gray-200"
            }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {sentence.length > 0 ? (
            sentence.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="bg-white px-3 py-2 rounded-md shadow-sm border border-gray-200 
                         flex items-center gap-2 group hover:shadow-md transition-shadow"
              >
                <span className="text-gray-400">
                  <GripHorizontal className="w-4 h-4" />
                </span>
                <span>
                  {item.icon} {item.label}
                </span>
                <button
                  onClick={() => removeFromSentence(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-red-500 hover:text-red-600" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              Drag pictures here to build your sentence...
            </p>
          )}
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={speakSentence}
            disabled={!speechSupported || sentence.length === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white
              ${
                speechSupported && sentence.length > 0
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              }
              transition-colors`}
          >
            <Volume2 className="w-4 h-4" />
            Speak
          </button>
          <button
            onClick={clearSentence}
            disabled={sentence.length === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white
              ${
                sentence.length > 0
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-300 cursor-not-allowed"
              }
              transition-colors`}
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Category Selection */}
      <div className="flex gap-2 mb-4">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md capitalize transition-colors
              ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Picture Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories[selectedCategory].map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-lg shadow-sm border border-gray-200 
                       cursor-move hover:shadow-lg transition-all
                       ${isDragging ? "opacity-50" : ""}`}
            draggable
            onDragStart={(e) => handleDragStart(e as DragEvent, item)}
            onDragEnd={handleDragEnd}
          >
            <div className="p-4 text-center">
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="text-lg capitalize">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PECSBoard;
