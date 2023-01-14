import { useState } from "react";
import workspaceApi from "../../api/Workspace/WorkspaceApi";
import ReactPaginate from "react-paginate";

//Toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Styles
import { IoIosTrash } from "react-icons/io";
import styles from "./ListUserOnWorkspace.module.scss";

export const ListUserOnWorkspace = (props) => {
  const users = props.members;
  const { workspaceId, onRemove } = props;
  const [pageNumber, setPageNumber] = useState(0);

  const handleRemoveMember = (userId) => {
    workspaceApi
      .delete(
        `/workspace/member/remove?userId=${userId}&workspaceId=${workspaceId}`
      )
      .then(() => {
        onRemove();
        toast.error("User removed...", {
          position: "top-center",
          autoClose: 1500,
        });
      });
  };

  //pagination
  const dataPerPage = 5;
  const pagesVisited = pageNumber * dataPerPage;
  const pageCount = Math.ceil(users?.length / dataPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.user_container}>
        <div className={styles.title}>
          <h1>Users on this Workspace :</h1>
        </div>
        <div className={styles.user_list}>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th className={styles.thaction}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users
                ?.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td className={styles.remove}>
                      <button onClick={() => handleRemoveMember(user.id)}>
                        <IoIosTrash className={styles.iconDelete} />
                      </button>
                    </td>
                  </tr>
                ))
                .slice(pagesVisited, pagesVisited + dataPerPage)}
            </tbody>
          </table>
          {users?.length ? (
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
          ) : (
            <p>No users invited</p>
          )}
        </div>
      </div>
    </>
  );
};
