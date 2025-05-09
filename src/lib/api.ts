import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Update this with your FastAPI server URL

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total!
        );
        console.log(`Upload Progress: ${percentCompleted}%`);
      }
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Upload error:", error.response?.data);
      throw new Error(error.response?.data?.detail || "Failed to upload file");
    }
    throw error;
  }
};

export default api;
