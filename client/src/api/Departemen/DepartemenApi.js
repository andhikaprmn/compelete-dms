import axios from "axios";
import Cookies from "js-cookie";
// import { useQuery, useQueryClient } from "react-query";

const departemenApi = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "http://103.176.78.184:5000/api",
});

departemenApi.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  };
});

// const getDepartemenById = ({ queryKey }) => {
//   const workspaceId = queryKey[1];
//   return departemenApi.get(`/workspace/${workspaceId}`);
// };

// export const useGetWorkspaceById = (workspaceId) => {
//   const queryClient = useQueryClient();
//   return useQuery(["workspace", workspaceId], getWorkspaceById, {
//     initialData: () => {
//       const workspace = queryClient
//         .getQueryData("workspaces")
//         ?.data?.find((workspace) => workspace.id === parseInt(workspaceId));

//       if (workspace) {
//         return { data: workspace };
//       } else {
//         return undefined;
//       }
//     },
//   });
// };

export const getDepartemens = async () => {
  const resp = await departemenApi.get("/departemens");
  return resp.data;
};

export const addDepartemen = async (departemen) => {
  return await departemenApi.post("/departemen/new", departemen);
};

export const updateDepartemen = async (id, name) => {
  try {
    await departemenApi.put(`/departemen/${id}`, { name });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDepartemen = async ({ id }) => {
  return await departemenApi.delete(`/departemen/${id}`, id);
};

// export const getMembers = async (workspaceId) => {
//   try {
//     await departemenApi.get(
//       `/workspace/member/members?workspaceId=${workspaceId}`
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getMemberCanInvite = async (workspaceId) => {
//   const resp = await departemenApi.get(
//     `/workspace/member/user-candidates?workspaceId=${workspaceId}`
//   );
//   return resp.data;
// };

export const countDepartemen = async () => {
  const resp = await departemenApi.get("/departemens/count");
  return resp.data;
};

export default departemenApi;
