import axios from "axios";

export const api = axios.create({
  baseURL: "https://homologacao.sistemamaissaber.com.br/api/scanner-test",
  headers: {
    "Content-Type": "multipart/form-data"
  }
});