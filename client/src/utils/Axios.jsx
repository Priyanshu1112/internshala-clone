import axios from "axios";

const instance = axios.create({
  baseURL: "https://internshala-clone-api.vercel.app/",
});

export default instance;
