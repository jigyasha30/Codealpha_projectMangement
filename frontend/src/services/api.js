import axios from "axios";

const API = axios.create({
  baseURL: "https://codealpha-projectmangement.onrender.com"

});

export default API;