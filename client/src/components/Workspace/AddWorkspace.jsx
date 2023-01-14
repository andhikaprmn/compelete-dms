import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styles from "./AddWorkspace.module.scss";
import { addWorkspace } from "../../api/Workspace/WorkspaceApi";
import UserApi from "../../api/User/UserApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const AddWorkspace = ({ open, onClose, unitId }) => {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserApi.get("/user").then((resp) => {
      setUser(resp);
    });
  }, []);

  const initAuthor = user?.data.name;

  const queryClient = useQueryClient();

  const addWorkspaceMutation = useMutation(addWorkspace, {
    onSuccess: () => {
      queryClient.invalidateQueries("workspaces");
      toast.success("Workspace Added...", {
        position: "top-center",
        autoClose: 2000,
      });
    },
  });

  const saveWorkspace = (e) => {
    e.preventDefault();
    addWorkspaceMutation.mutate({ name: name, author: initAuthor, unitId });
    setName("");
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <ToastContainer />
      <div className={styles.modal}>
        <div onClick={onClose} className={styles.backdrop} />
        <div className={styles.modal_content}>
          <h2>New Workspace</h2>
          <div className={styles.form}>
            <label> Name </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your new workspace name..."
            />
          </div>
          <div className={styles.btn}>
            <button className={styles.cancel} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.create} onClick={saveWorkspace}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWorkspace;
