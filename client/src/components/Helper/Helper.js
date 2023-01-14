import Cookies from "js-cookie";

export const headerToken = {
  Authorization: `Bearer ${Cookies.get("access_token")}`,
};
