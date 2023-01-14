import { useQuery } from "react-query";
import { request } from "../../utils/axios-utils";

const fetchUsers = () => {
  return request({ url: "/users" });
};

export const useUsersData = (onSuccess, onError) => {
  return useQuery("users", fetchUsers, {
    onSuccess,
    onError,
  });
};
