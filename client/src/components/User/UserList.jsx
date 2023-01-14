import React, { useState } from "react";

import UserCard from "./UserCard";
import LoadingSpinner from "../UI/LoadingSpinner";
import ReactPaginate from "react-paginate";

import { IoSearchSharp } from "react-icons/io5";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { deleteUser, getUsers } from "../../api/User/UserApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./UserList.module.scss";

const UserList = () => {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: users,
    isError,
    error,
  } = useQuery("users", getUsers);

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      toast.error("User Deleted...", {
        position: "top-center",
        autoClose: 1000,
      });
    },
  });

  const usersPerPage = 12;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(users?.length / usersPerPage);
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

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
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
      <ToastContainer />
      <div className={styles.content}>
        {users
          .filter((val) => {
            if (search === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(search.toLowerCase()) ||
              val.email.toLowerCase().includes(search.toLowerCase())
            ) {
              return val;
            }
          })
          .slice(pagesVisited, pagesVisited + usersPerPage)
          .map((user, index) => (
            <UserCard
              key={index}
              card_state={user}
              name={user.name}
              email={user.email}
              role={user.isSuperAdmin}
              onDelete={() => deleteUserMutation.mutate({ id: user.id })}
            />
          ))}
      </div>
      <ReactPaginate
        previousLabel={"< Prev"}
        nextLabel={"Next >"}
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

export default UserList;
