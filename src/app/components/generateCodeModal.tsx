import { useState } from "react";

interface GenerateCodeModalProps {
  onClose: () => void;
  onGenerate: () => Promise<string>;
}

export function GenerateCodeModal({
  onClose,
  onGenerate,
}: GenerateCodeModalProps) {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const generatedCode = await onGenerate();
      setCode(generatedCode);
    } catch (err) {
      setError("Ошибка при генерации кода");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md max-w-md w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Одноразовый код</h3>
          <button
            onClick={onClose}
            className="text-3xl text-primary bg-transparent border-none"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">
          {loading ? (
            <div className="text-center">Генерация кода...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : code ? (
            <div className="text-center text-xl">{code}</div>
          ) : (
            <button
              onClick={handleGenerate}
              className="w-full bg-primary text-white py-2 rounded"
            >
              Сгенерировать
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
