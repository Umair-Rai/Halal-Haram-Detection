import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000",
  timeout: 60000,
});

export async function analyzeProduct(file, confidenceThreshold = 0.5) {
  console.log("analyzeProduct called with file:", file);
  const formData = new FormData();
  formData.append("file", file);

  console.log("Making POST request to /api/analyze");
  const response = await api.post("/api/analyze", formData, {
    params: { confidence_threshold: confidenceThreshold },
  });
  console.log("API response:", response);
  return response.data;
}

export async function askChatbot(question) {
  const response = await api.post("/api/chat", { question });
  return response.data;
}

export default api;


