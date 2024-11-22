// components/SidebarForm.tsx

import { useState } from "react";
import axios from "axios";

interface SidebarFormProps {
  isOpen: boolean;
  formType: "folder" | "image" | null;
  onClose: () => void;
  onSuccess: () => void; // Callback for when submission is successful
}

const SidebarForm: React.FC<SidebarFormProps> = ({
  isOpen,
  formType,
  onClose,
  onSuccess,
}) => {
  const [label, setLabel] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token found");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("label", label);
      formData.append("public", "true"); // Adjust if needed

      if (formType === "folder") {
        formData.append("category", 1); // Replace "1" with a real category ID
        formData.append("creator", 7); // Replace "1" with a real creator ID
      } else if (formType === "image" && image) {
        formData.append("image", image);
      }

      const url = `${process.env.BACKEND_URL}/library`;
      await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Close the form and trigger a success callback to refresh data
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-80 p-6 z-50`}
    >
      <button
        className="text-gray-500 text-[--main-color] hover:text-gray-700 mb-4"
        onClick={onClose}
      >
        Close
      </button>

      {formType === "folder" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Добавить папку</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">Название папки</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Название"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[--main-color] text-white rounded"
            >
              Сохранить
            </button>
          </form>
        </div>
      )}

      {formType === "image" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Добавить карточку</h2>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">Название карточки</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Название"
              required
            />
            <label className="block mb-2">Выберите изображение</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full mb-4"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[--main-color] text-white rounded"
            >
              Сохранить
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SidebarForm;
