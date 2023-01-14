import { useEffect, useState } from "react";
import documentApi from "../../api/Document/DocumentApi";

import { Link } from "react-router-dom";
import moment from "moment";

//Styles
import styles from "./PreviewDocument.module.scss";

const PreviewDocument = (props) => {
  const [documents, setDocuments] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  const { workspaceId } = props;

  useEffect(() => {
    documentApi.get(`/documents?workspaceId=${workspaceId}`).then((resp) => {
      setDocuments(resp.data);
    });
  }, [workspaceId]);

  const dataPerPage = 1;
  const pagesVisited = pageNumber * dataPerPage;

  console.log(setPageNumber);

  return (
    <div className={styles.container}>
      <h1>Preview Document :</h1>
      <div className={styles.documentContain}>
        {documents
          ?.map((doc) => (
            <div key={doc.id}>
              <h2>Name : {doc.name}</h2>
              <span>Upload : {moment(doc.createdAt).format("LLLL")}</span>
            </div>
          ))
          .slice(pagesVisited, pagesVisited + dataPerPage)}
      </div>
      <div className={styles.link}>
        {documents?.length ? (
          <Link
            className={styles.linkText}
            to={`/workspace/${workspaceId}/detail/documents?workspaceId=${workspaceId}`}
          >
            All Documents
          </Link>
        ) : (
          <Link
            className={styles.linkText}
            to={`/workspace/${workspaceId}/detail/documents?workspaceId=${workspaceId}`}
          >
            create document
          </Link>
        )}
      </div>
    </div>
  );
};

export default PreviewDocument;
