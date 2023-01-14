import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetDocumentById,
  updateDocument,
} from "../../api/Document/DocumentApi";

import styles from "./EditDocname.module.scss";

const EditDocname = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const { documentId } = useParams();
  const { isLoading, data, isError, error, refetch } =
    useGetDocumentById(documentId);

  const Toaster = () => {
    toast.success("Document Name Changed...", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const update = async (e) => {
    e.preventDefault();
    updateDocument(documentId, name);
    setName("");
    refetch();
    Toaster();
    onClose();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  if (!open) return null;

  return (
    <div className={styles.edit}>
      <div className={styles.edit_control}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={data?.data.name}
        />
      </div>
      <div className={styles.btn_control}>
        <button onClick={(e) => update(e)}>Update</button>
        <span onClick={onClose}>Cancel</span>
      </div>
    </div>
  );
};

export default EditDocname;
