// components/LibraryCard.tsx

import Link from "next/link";

interface LibraryCardProps {
  category: {
    id: number;
    name: string;
    images: string[];
  };
}

const LibraryCard: React.FC<LibraryCardProps> = ({ category }) => {
  const imageSrc = category.images?.[0] || "/other_imgs/no_image.png";

  return (
    <div className="w-1/5 border border-gray-200 rounded-md p-4 text-center">
      <Link href={`/category/${category.name}/${category.id}`}>
        <a>
          <img
            src={imageSrc}
            alt={category.name}
            className="w-full h-48 object-cover mb-2 rounded"
          />
          <h5 className="font-bold text-gray-800">{category.name}</h5>
        </a>
      </Link>
    </div>
  );
};

export default LibraryCard;
