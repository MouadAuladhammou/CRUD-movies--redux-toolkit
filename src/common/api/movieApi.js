import axios from "axios";

export const API_KEY = "53c800d";

export default axios.create({
  baseURL: "https://www.omdbapi.com",
});
