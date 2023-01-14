import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { headerToken } from "../../components/Helper/Helper";

const fetchUser = ({ queryKey }) => {
  const userId = queryKey[1];
  return axios.get(`http://localhost:5000/api/user/${userId}`, {
    headers: {
      ...headerToken,
    },
  });
};

export const useUserData = (userId) => {
  const queryClient = useQueryClient();
  return useQuery(["user", userId], fetchUser, {
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
