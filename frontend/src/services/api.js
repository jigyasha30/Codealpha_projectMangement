import axios from "axios";

const API = axios.create({
  baseURL: "https://codealpha-projectmangement.onrender.com/api"

});
console.log("Base URL:", API.defaults.baseURL);

export default API;