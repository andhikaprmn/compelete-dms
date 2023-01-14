import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DepartmentCard from "./DepartmentCard";
import LoadingSpinner from "../UI/LoadingSpinner";
import { IoSearchSharp } from "react-icons/io5";
import ReactPaginate from "react-paginate";

import {
  deleteDepartemen,
  getDepartemens,
} from "../../api/Departemen/DepartemenApi";

import styles from "./DepartmentList.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DepartmentList = () => {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: departemens,
    isError,
    error,
  } = useQuery("departemens", getDepartemens);

  const deleteDepartemenMutation = useMutation(deleteDepartemen, {
    onSuccess: () => {
      queryClient.invalidateQueries("departemens");
      toast.error(`Departement Deleted...`, {
        position: "top-center",
        autoClose: 2000,
      });
    },
  });

  const departemensPerPage = 6;
  const pagesVisited = pageNumber * departemensPerPage;
  const pageCount = Math.ceil(departemens?.length / departemensPerPage);
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

  if (departemens?.length === 0) {
    return (
      <div className="centered">
        <h3>No Department yet . . . create new one ?</h3>
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
        {departemens
          .filter((value) => {
            if (search === "") {
              return value;
            } else if (
              value.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return value;
            }
          })
          .slice(pagesVisited, pagesVisited + departemensPerPage)
          .map((departemen, index) => (
            <DepartmentCard
              key={index}
              card_state={departemen}
              onDelete={() =>
                deleteDepartemenMutation.mutate({ id: departemen.id })
              }
              createdAt={departemen.createdAt}
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

export default DepartmentList;
