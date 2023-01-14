import axios from "axios";
import Cookies from "js-cookie";

const client = axios.create({ baseURL: "http://103.176.78.184:5000/api" });

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${Cookies.get(
    "access_token"
  )}`;

  const onSuccess = (response) => response;
  const onError = (error) => {
    // optionally catch errors and add additional logging here

    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
