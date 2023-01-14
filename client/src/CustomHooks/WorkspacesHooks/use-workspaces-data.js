import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios-utils";

const fetchWorkspaces = () => {
  return request({ url: "/workspaces" });
};

const addWorkspace = (workspace) => {
  return request({ url: "/workspace/new", method: "post", data: workspace });
};

export const useWorkspacesData = (onSuccess, onError) => {
  return useQuery("workspaces", fetchWorkspaces, {
    onSuccess,
    onError,
  });
};

export const useAddWorkspaceData = () => {
  const queryClient = useQueryClient();
  return useMutation(addWorkspace, {
    onMutate: async (newWorkspace) => {
      await queryClient.cancelQueries("workspaces");
      const previousWorkspaceData = queryClient.getQueryData("workspaces");
      queryClient.setQueryData("workspaces", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.lenght + 1, ...newWorkspace },
          ],
        };
      });
      return {
        previousWorkspaceData,
      };
    },
    onError: (_error, _workspace, context) => {
      queryClient.setQueryData("workspaces", context.previousWorkspaceData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("workspaces");
    },
  });
};
