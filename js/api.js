const BASE_URL = "http://localhost:8080/api";

const api = {
  // Hammasini olish
  get: async (path) => {
    const res = await fetch(`${BASE_URL}/${path}/all`);
    return await res.json();
  },
  // Soni (Count)
  count: async (path) => {
    const res = await fetch(`${BASE_URL}/${path}/count`);
    return await res.text();
  },
  // Qo'shish (POST)
  post: async (path, data) => {
    return await fetch(`${BASE_URL}/${path}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  // Tahrirlash (PUT)
  put: async (path, id, data) => {
    return await fetch(`${BASE_URL}/${path}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },
  // O'chirish (DELETE)
  delete: async (path, id) => {
    return await fetch(`${BASE_URL}/${path}/${id}`, { method: "DELETE" });
  },
};
