import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../../utils/axios-utils";

const fetchDocuments = () => {
  return request({ url: "/documents" });
};

const addDocument = (document) => {
  return request({ url: "/document/new", method: "post", data: document });
};

export const useDocumentsData = (onSuccess, onError) => {
  return useQuery("documents", fetchDocuments, {
    onSuccess,
    onError,
  });
};

export const useAddDocumentData = () => {
  const queryClient = useQueryClient();
  return useMutation(addDocument, {
    onMutate: async (newDocument) => {
      await queryClient.cancelQueries("documents");
      const previousDocumentData = queryClient.getQueryData("documents");
      queryClient.setQueryData("documents", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.lenght + 1, ...newDocument },
          ],
        };
      });
      return {
        previousDocumentData,
      };
    },
    onError: (_error, _document, context) => {
      queryClient.setQueryData("documents", context.previousDocumentData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("documents");
    },
  });
};
