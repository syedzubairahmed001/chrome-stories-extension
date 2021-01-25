import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const idToken = localStorage.getItem("id-token");
if (idToken) {
  instance.defaults.headers.common["Authorization"] = idToken;
}
// Alter defaults after instance has been created

export default instance;
