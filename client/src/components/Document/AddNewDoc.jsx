import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useMutation, useQueryClient } from "react-query";
import documentApi, { addDocument } from "../../api/Document/DocumentApi";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//scss
import styles from "./AddNewDoc.module.scss";

const AddNewDoc = ({ open, onClose, workspaceId }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const queryClient = useQueryClient();

  const addDocumentMutation = useMutation(addDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries("documents");
      toast.success("Document success upload...", {
        position: "top-center",
        autoClose: 5000,
      });
    },
  });

  const uploadS3 = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    documentApi
      .post("/upload", formData)
      .then((resp) => setLink(resp.data.publicUrl))
      .catch((err) => console.log(err));
    toast.success("File uploading to Object Storage...", {
      position: "top-center",
    });
  };

  const saveDocument = async (e) => {
    e.preventDefault();
    addDocumentMutation.mutate({ name: name, link: link, workspaceId });
    setName("");
    setLink("");
    onClose();
  };

  if (!open) return null;

  return (
    <main>
      <ToastContainer />
      <div className={styles.modal}>
        <div onClick={onClose} className={styles.backdrop} />
        <div className={styles.modal_content}>
          <h2>Add New Document</h2>
          <div className={styles.form_input}>
            <div className={styles.form}>
              <label>Document Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What's your document name . . ."
              />
            </div>
            <div className={styles.form}>
              <label>Link</label>
              <input
                required
                readOnly={true}
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Generate link . . ."
              />
            </div>
            <div className={styles.file}>
              <input
                type="file"
                value={selectedFile?.File?.name || ""}
                onChange={(e) => uploadS3(e.target.files[0])}
              />
              <button>
                Choose File
                <GoPlus />
              </button>
              <p>Support Files</p>
              <p>(PDF)</p>
            </div>
          </div>
          <div className={styles.btn}>
            <button className={styles.cancel} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.add} onClick={saveDocument}>
              Add
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddNewDoc;
