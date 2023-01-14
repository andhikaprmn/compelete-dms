import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styles from "./AddDepartment.module.scss";
import { addDepartemen } from "../../api/Departemen/DepartemenApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddWorkspace = ({ open, onClose }) => {
  const [name, setName] = useState("");

  const queryClient = useQueryClient();

  const addDepartemenMutation = useMutation(addDepartemen, {
    onSuccess: () => {
      queryClient.invalidateQueries("departemens");
      toast.success("Department Added...", {
        position: "top-center",
        autoClose: 2000,
      });
    },
  });

  const saveDepartemen = (e) => {
    e.preventDefault();
    addDepartemenMutation.mutate({ name: name });
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
          <h2>New Department</h2>
          <div className={styles.form}>
            <label> Name </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your new department name..."
            />
          </div>
          <div className={styles.btn}>
            <button className={styles.cancel} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.create} onClick={saveDepartemen}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddWorkspace;
