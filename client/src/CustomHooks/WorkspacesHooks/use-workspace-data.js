import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { headerToken } from "../../components/Helper/Helper";

const fetchWorkspace = ({ queryKey }) => {
  const workspaceId = queryKey[1];
  return axios.get(`http://localhost:5000/api/workspace/${workspaceId}`, {
    headers: {
      ...headerToken,
    },
  });
};

export const useWorkspaceData = (workspaceId) => {
  const queryClient = useQueryClient();
  return useQuery(["workspace", workspaceId], fetchWorkspace, {
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
