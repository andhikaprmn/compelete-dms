import axios from "axios";
import Cookies from "js-cookie";
import { useQuery, useQueryClient } from "react-query";
import { headerToken } from "../../components/Helper/Helper";

const documentApi = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "http://103.176.78.184:5000/api",
});

documentApi.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${Cookies.get("access_token")}`,
    },
  };
});

const getDocumentById = ({ queryKey }) => {
  const documentId = queryKey[1];
  return documentApi.get(`/document/${documentId}`);
};

export const useGetDocumentById = (documentId) => {
  const queryClient = useQueryClient();
  return useQuery(["document", documentId], getDocumentById, {
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

export const getDocuments = async (workspaceId) => {
  const resp = await documentApi.get(`/documents?workspaceId=${workspaceId}`);
  return resp.data;
};

export const getAllDocuments = async () => {
  const resp = await documentApi.get(`/alldocuments`);
  return resp.data;
};

export const addDocument = async (document, workspaceId) => {
  return await documentApi.post(`/document/new`, document, workspaceId);
};

export const updateDocument = async (id, name) => {
  try {
    await documentApi.put(`/document/${id}`, { name });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDocument = async ({ id }) => {
  return await documentApi.delete(`/document/${id}`, id);
};

export const countDocument = async () => {
  const resp = await documentApi.get("/documents/count");
  return resp.data;
};

export default documentApi;
