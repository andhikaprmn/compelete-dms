import axios from "axios";
import Cookies from "js-cookie";
import { useQuery, useQueryClient } from "react-query";

const workspaceApi = axios.create({
  // baseURL: "http://103.176.78.184:5000/api",
  baseURL: "http://localhost:5000/api",
});

workspaceApi.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  };
});

const getWorkspaceById = ({ queryKey }) => {
  const workspaceId = queryKey[1];
  return workspaceApi.get(`/workspace/${workspaceId}`);
};

export const useGetWorkspaceById = (workspaceId) => {
  const queryClient = useQueryClient();
  return useQuery(["workspace", workspaceId], getWorkspaceById, {
    initialData: () => {
      const workspace = queryClient
        .getQueryData("workspaces")
        ?.data?.find((workspace) => workspace.id === parseInt(workspaceId));

      if (workspace) {
        return { data: workspace };
      } else {
        return undefined;
      }
    },
  });
};

export const getWorkspaces = async (unitId) => {
  const resp = await workspaceApi.get(`/workspaces?unitId=${unitId}`);
  return resp.data;
};

export const addWorkspace = async (workspace, author, unitId) => {
  return await workspaceApi.post("/workspace/new", workspace, author, unitId);
};

export const updateWorkspace = async (id, name) => {
  try {
    await workspaceApi.put(`/workspace/${id}`, { name });
  } catch (error) {
    console.log(error);
  }
};

export const deleteWorkspace = async ({ id }) => {
  return await workspaceApi.delete(`/workspace/${id}`, id);
};

export const getMembers = async (workspaceId) => {
  try {
    await workspaceApi.get(
      `/workspace/member/members?workspaceId=${workspaceId}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const getMemberCanInvite = async (workspaceId) => {
  const resp = await workspaceApi.get(
    `/workspace/member/user-candidates?workspaceId=${workspaceId}`
  );
  return resp.data;
};

export const countWorkspace = async () => {
  const resp = await workspaceApi.get("/workspaces/count");
  return resp.data;
};

export default workspaceApi;
