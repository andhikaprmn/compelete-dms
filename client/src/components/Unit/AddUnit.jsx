import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styles from "./AddUnit.module.scss";
import { addUnit } from "../../api/Unit/UnitApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUnit = ({ open, onClose, departemenId }) => {
  const [name, setName] = useState("");

  const queryClient = useQueryClient();

  const addUnitMutation = useMutation(addUnit, {
    onSuccess: () => {
      queryClient.invalidateQueries("units");
      toast.success("Unit Added...", {
        position: "top-center",
        autoClose: 2000,
      });
    },
  });

  const saveUnit = (e) => {
    e.preventDefault();
    addUnitMutation.mutate({ name: name, departemenId });
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
          <h2>New Unit</h2>
          <div className={styles.form}>
            <label> Name </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your new unit name..."
            />
          </div>
          <div className={styles.btn}>
            <button className={styles.cancel} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.create} onClick={saveUnit}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUnit;
