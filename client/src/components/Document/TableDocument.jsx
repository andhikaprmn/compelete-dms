import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import * as xlsx from "xlsx";
//ui
import ReactPaginate from "react-paginate";
import { IoMdTrash } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
//query-client
import { useQueryClient, useMutation, useQuery } from "react-query";
import { deleteDocument, getDocuments } from "../../api/Document/DocumentApi";
import { getUser } from "../../api/User/UserApi";
//toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//styles
import styles from "./TableDocument.module.scss";
import LoadingSpinner from "../UI/LoadingSpinner";

const TableDocument = (props) => {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const { data: user } = useQuery("user", getUser);
  const { workspaceId } = props;
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: documents,
    isError,
    error,
  } = useQuery(["documents", workspaceId], () => getDocuments(workspaceId));

  //pagination
  const dataPerPage = 10;
  const pagesVisited = pageNumber * dataPerPage;
  const pageCount = Math.ceil(documents?.length / dataPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //delete documents
  const deleteDocumentMutation = useMutation(deleteDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries("documents");
      toast.error("Document Deleted", {
        position: "top-center",
        autoClose: 2000,
      });
    },
  });

  const handlerExport = () => {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(documents);

    xlsx.utils.book_append_sheet(wb, ws, "MySheet1");
    xlsx.writeFile(wb, "Documents.xlsx");
  };

  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (documents?.length === 0) {
    return (
      <div className="centered">
        <h3>No Document yet . . . upload new one ?</h3>
      </div>
    );
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <ToastContainer />
      <div className={styles.search_container}>
        <div className={styles.search}>
          <input
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <IoSearchSharp />
          </button>
        </div>
        {user?.isSuperAdmin && (
          <div className={styles.rekap}>
            <button onClick={handlerExport}>Export to Excel</button>
          </div>
        )}
      </div>
      {/* <EditDocument open={openEdit} onClose={() => setOpenEdit(false)} /> */}
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.trHead}>
              <th className={styles.th_no}>No</th>
              <th className={styles.th}>Nama Document</th>
              <th className={styles.th}>Upload</th>
              <th className={styles.th_btn}>Action</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {documents
              .filter((value) => {
                if (search === "") {
                  return value;
                } else if (
                  value.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  return value;
                }
              })
              .slice(pagesVisited, pagesVisited + dataPerPage)
              .map((doc, index) => (
                <tr className={styles.trBody} key={doc.id}>
                  <td className={styles.td_no}>{index + 1}</td>

                  <td className={styles.td}>
                    <Link
                      className={styles.link}
                      to={`/workspace/${workspaceId}/detail/documents/document-detail/${doc.id}`}
                    >
                      {doc.name}
                    </Link>
                  </td>
                  <td className={styles.td}>
                    {moment(doc.createdAt).format("MMM Do YY")}
                  </td>
                  <td className={styles.td_icon}>
                    <button
                      onClick={() =>
                        deleteDocumentMutation.mutate({ id: doc.id })
                      }
                    >
                      <IoMdTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <ReactPaginate
          previousLabel={"< Prev"}
          nextLabel={"Next >"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={styles.contBut}
          previousLinkClassName={styles.prevBut}
          nextLinkClassName={styles.nextBut}
          disabledClassName={styles.disBut}
          activeClassName={styles.activeBut}
        />
      </div>
    </>
  );
};

export default TableDocument;
