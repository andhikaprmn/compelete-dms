import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { headerToken } from "../../components/Helper/Helper";

const fetchDocument = ({ queryKey }) => {
  const documentId = queryKey[1];
  return axios.get(`http://localhost:5000/api/document/${documentId}`, {
    headers: {
      ...headerToken,
    },
  });
};

export const useDocumentData = (documentId) => {
  const queryClient = useQueryClient();
  return useQuery(["document", documentId], fetchDocument, {
    initialData: () => {
      const document = queryClient
        .getQueryData("documents")
        ?.data?.find((document) => document.id === parseInt(documentId));

      if (document) {
        return { data: document };
      } else {
        return undefined;
      }
    },
  });
};
