import { useState } from "react";

interface VerifyCodeModalProps {
  onClose: () => void;
}

export function VerifyCodeModal({ onClose }: VerifyCodeModalProps) {
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your verification logic here
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md max-w-md w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Введите код</h3>
          <button
            onClick={onClose}
            className="text-3xl text-primary bg-transparent border-none"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Введите код"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded mt-4"
          >
            Подтвердить
          </button>
        </form>
      </div>
    </div>
  );
}
