// services/api.ts

import axios from "axios";

export const createLibraryItem = async (data: {
  label: string;
  category: number;
  public: boolean;
  creator: number;
}) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      "http://185.129.51.250:8000/library",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating library item", error);
    throw error;
  }
};
