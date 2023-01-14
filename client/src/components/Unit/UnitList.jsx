import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import UnitCard from "./UnitCard";
import LoadingSpinner from "../UI/LoadingSpinner";
import { IoSearchSharp } from "react-icons/io5";
import ReactPaginate from "react-paginate";

import { deleteUnit, getUnits } from "../../api/Unit/UnitApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./UnitList.module.scss";

const UnitList = (props) => {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const { departemenId } = props;
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: units,
    isError,
    error,
  } = useQuery(["units", departemenId], () => getUnits(departemenId));

  const deleteUnitMutation = useMutation(deleteUnit, {
    onSuccess: () => {
      queryClient.invalidateQueries("units");
      toast.error(`Unit Deleted...`, {
        position: "top-center",
        autoClose: 2000,
      });
    },
  });

  const unitPerPage = 6;
  const pagesVisited = pageNumber * unitPerPage;
  const pageCount = Math.ceil(units?.length / unitPerPage);
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

  if (units?.length === 0) {
    return (
      <div className="centered">
        <h3>No Unit yet . . . create new one ?</h3>
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
        {units
          .filter((value) => {
            if (search === "") {
              return value;
            } else if (
              value.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return value;
            }
          })
          .slice(pagesVisited, pagesVisited + unitPerPage)
          .map((unit, index) => (
            <UnitCard
              key={index}
              card_state={unit}
              onDelete={() => deleteUnitMutation.mutate({ id: unit.id })}
              createdAt={unit.createdAt}
              departemenId={departemenId}
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

export default UnitList;
