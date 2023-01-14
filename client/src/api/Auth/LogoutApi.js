import axios from "axios";
import Cookies from "js-cookie";

const LogoutApi = axios.create({
  // baseURL: "http://103.176.78.184:5000/api",
  baseURL: "http://localhost:5000/api",
});

LogoutApi.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  };
});

export default LogoutApi;
