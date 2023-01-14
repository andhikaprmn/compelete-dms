import axios from "axios";
import Cookies from "js-cookie";
import { useQuery, useQueryClient } from "react-query";
import { headerToken } from "../../components/Helper/Helper";

const userApi = axios.create({
  // baseURL: "http://103.176.78.184:5000/api",
  baseURL: "http://localhost:5000/api",
});

userApi.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  };
});

const getUserById = ({ queryKey }) => {
  const userId = queryKey[1];
  return userApi.get(`/user/profile/${userId}`);
};

export const useGetUserById = (userId) => {
  const queryClient = useQueryClient();
  return useQuery(["user", userId], getUserById, {
    initialData: () => {
      const user = queryClient
        .getQueryData("users")
        ?.data?.find((user) => user.id === parseInt(userId));

      if (user) {
        return { data: user };
      } else {
        return undefined;
      }
    },
  });
};

export const getUser = async () => {
  const resp = await userApi.get("/user");
  return resp.data;
};

export const getUsers = async () => {
  const resp = await userApi.get("/users");
  return resp.data;
};

export const addUser = async (user) => {
  return await userApi.post("/user/new", user);
};

export const newUser = async (name, email, password, confPassword) => {
  try {
    await userApi.post("/user/new", {
      name,
      email,
      password,
      confPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (
  id,
  name,
  email,
  password,
  confPassword
) => {
  try {
    await axios.put(
      `http://localhost:5000/api/user/${id}`,
      { name, email, password, confPassword },
      {
        headers: { ...headerToken },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async ({ id }) => {
  return await userApi.delete(`/user/delete/${id}`, id);
};

export const countUser = async () => {
  const resp = await userApi.get("/users/count");
  return resp.data;
};

export default userApi;
