import { useState, useEffect } from "react";
import workspaceApi from "../../api/Workspace/WorkspaceApi";

//Toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Styles
import styles from "./InviteUser.module.scss";

export const InviteUser = (props) => {
  const [dropOpen, setDropOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [userSelectedId, setUserSelectedId] = useState(null);

  const { workspaceId, onInvite } = props;

  const initGetCandidates = () => {
    workspaceApi
      .get(`/workspace/member/user-candidates?workspaceId=${workspaceId}`)
      .then((resp) => {
        setMembers(resp.data);
      });
  };

  const handleClickInvite = () => {
    workspaceApi
      .post(
        `/workspace/member/invite?userId=${userSelectedId}&workspaceId=${workspaceId}`,
        null
      )
      .then(() => {
        onInvite();
        initGetCandidates();
        toast.success("User invited...", {
          position: "top-center",
          autoClose: 1500,
        });
      });
  };

  useEffect(() => {
    initGetCandidates();
  }, [workspaceId]);

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <h1>Invite user</h1>
        <div className={styles.dropdown}>
          <div
            className={styles.dropselect}
            onClick={(e) => {
              setDropOpen(!dropOpen);
            }}
          >
            {userSelectedId !== null
              ? members.find((e) => e.id === userSelectedId)?.name
              : "Plese select an user..."}
          </div>
          <div className={styles.action}>
            <button onClick={handleClickInvite}>Invite</button>
          </div>
        </div>
        {dropOpen && (
          <div className={styles.itemslist}>
            {members?.map((member) => (
              <div
                key={member.id}
                className={styles.dropitems}
                onClick={(e) => {
                  setUserSelectedId(member.id);
                  setDropOpen(false);
                }}
              >
                {member.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
