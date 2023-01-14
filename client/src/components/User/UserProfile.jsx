import { IoIosBackspace, IoMdTrash } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import styles from "./UserProfile.module.scss";
import LoadingSpinner from "../UI/LoadingSpinner";
import { deleteUser, useGetUserById } from "../../api/User/UserApi";

const UserProfile = () => {
  const title = "Profile";
  const { userId } = useParams();
  const navigate = useNavigate();

  const { isLoading, data, isError, error } = useGetUserById(userId);
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      navigate("/users");
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
        <div className={styles.back_icon}>
          <Link to={"/users"} className={styles.link}>
            <IoIosBackspace />
          </Link>
        </div>
        <div className={styles.title_icon}>
          <h1>{title}</h1>
        </div>
        <div className={styles.delete_icon}>
          <button onClick={() => deleteUserMutation.mutate({ id: userId })}>
            <IoMdTrash />
          </button>
        </div>
      </div>
      <div>
        <div className="centered">
          <h3>Layanan Belum Tersedia . . . </h3>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
