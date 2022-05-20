import axios from "axios";

export default axios.create({
  baseURL: "http://172.104.182.77:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});