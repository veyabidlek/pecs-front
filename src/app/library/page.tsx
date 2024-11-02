import Library from "../components/library";

export default function LibraryPage() {
  // Example data - replace with your actual data fetching logic
  const libraryData = {
    categories: [
      { id: 1, name: "Category 1" },
      // ...more categories
    ],
    images: {
      "Category 1": [{ image1: "path/to/image.jpg" }],
      // ...more images
    },
    privateImages: [
      { image: "path/to/private.jpg", name: "Private Image 1" },
      // ...more private images
    ],
  };

  return <Library {...libraryData} />;
}
