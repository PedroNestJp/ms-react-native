import api from "./api.js";

export async function getBooks(token, params) {
  return await api.get("/livros", {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    params
  });
};