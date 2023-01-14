import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import WorkspaceCard from "./WorkspaceCard";
import LoadingSpinner from "../UI/LoadingSpinner";
import { IoSearchSharp } from "react-icons/io5";
import ReactPaginate from "react-paginate";

import styles from "./WorkspaceList.module.scss";
import {
  deleteWorkspace,
  getWorkspaces,
} from "../../api/Workspace/WorkspaceApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkspaceList = (props) => {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();
  const { unitId, departemenId } = props;
  const {
    isLoading,
    data: workspaces,
    isError,
    error,
  } = useQuery(["workspaces", unitId], () => getWorkspaces(unitId));

  const deleteWorkspaceMutation = useMutation(deleteWorkspace, {
    onSuccess: () => {
      queryClient.invalidateQueries("workspaces");
      toast.error(`Workspaces Deleted...`, {
        position: "top-center",
        autoClose: 2000,
      });
    },
  });

  const workspacesPerPage = 6;
  const pagesVisited = pageNumber * workspacesPerPage;
  const pageCount = Math.ceil(workspaces?.length / workspacesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (workspaces?.length === 0) {
    return (
      <div className="centered">
        <h3>No Workspace yet . . . create new one ?</h3>
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
      </div>
      <div className={styles.cards_container}>
        {workspaces
          .filter((value) => {
            if (search === "") {
              return value;
            } else if (
              value.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return value;
            }
          })
          .slice(pagesVisited, pagesVisited + workspacesPerPage)
          .map((workspace, index) => (
            <WorkspaceCard
              key={index}
              card_state={workspace}
              onDelete={() =>
                deleteWorkspaceMutation.mutate({ id: workspace.id })
              }
              createdAt={workspace.createdAt}
              departemenId={departemenId}
              unitId={unitId}
            />
          ))}
      </div>
      <ReactPaginate
        previousLabel={"< Prev >"}
        nextLabel={"< Next >"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={styles.pagBut}
        previousLinkClassName={styles.prevBut}
        nextLinkClassName={styles.nextBut}
        disabledClassName={styles.disBut}
        activeClassName={styles.activeBut}
      />
    </>
  );
};

export default WorkspaceList;
