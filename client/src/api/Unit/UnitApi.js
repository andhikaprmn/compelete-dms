import axios from "axios";
import Cookies from "js-cookie";
// import { useQuery, useQueryClient } from "react-query";

const unitApi = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "http://103.176.78.184:5000/api",
});

unitApi.interceptors.request.use((config) => {
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

export const getUnits = async (departemenId) => {
  const resp = await unitApi.get(`/units?departemenId=${departemenId}`);
  return resp.data;
};

export const addUnit = async (unit, departemenId) => {
  return await unitApi.post("/unit/new", unit, departemenId);
};

export const updateUnit = async (id, name) => {
  try {
    await unitApi.put(`/unit/${id}`, { name });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUnit = async ({ id }) => {
  return await unitApi.delete(`/unit/${id}`, id);
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

export const countUnit = async () => {
  const resp = await unitApi.get("/units/count");
  return resp.data;
};

export default unitApi;
