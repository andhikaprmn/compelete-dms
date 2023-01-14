import React from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import {
  deleteDocument,
  useGetDocumentById,
} from "../../api/Document/DocumentApi";
import { IoMdTrash, IoIosBuild } from "react-icons/io";
import moment from "moment";
import EditDocname from "./EditDocname";

//tooltip
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import styles from "./DocumentDetail.module.scss";
import { useState } from "react";

const DocumentDetail = () => {
  const { documentId } = useParams();
  const { isLoading, data, isError, error } = useGetDocumentById(documentId);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [editDocname, setEditDocname] = useState(false);
  const url = data?.data.link;

  const deleteDocumentMutation = useMutation(deleteDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries("documents");
    },
  });

  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <main>
      <div className={styles.header}>
        <div className={styles.title_icon}>
          <h1>Document Detail</h1>
        </div>
        <div className={styles.delete_icon}>
          <Tippy content="Delete Document">
            <button
              onClick={() => deleteDocumentMutation.mutate({ id: documentId })}
            >
              <IoMdTrash />
            </button>
          </Tippy>
        </div>
      </div>
      <div className={styles.cover}>
        <div className={styles.desc}>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <td className={styles.docname}>
                  {data?.data.name}
                  <button onClick={() => setEditDocname(true)}>
                    <IoIosBuild className={styles.iconEdit} />
                  </button>
                </td>
                <>
                  <EditDocname
                    open={editDocname}
                    onClose={() => setEditDocname(false)}
                  />
                </>
              </tr>
              <tr>
                <th>Upload</th>
                <td>{moment(data?.data.createdAt).format("LLLL")}</td>
              </tr>
              <tr>
                <th>Link</th>
                <td className={styles.link}>{data?.data.link}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.display}>
        <iframe src={url} width="1536" height="1120" />
      </div>
    </main>
  );
};

export default DocumentDetail;
