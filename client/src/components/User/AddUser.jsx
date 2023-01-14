import React, { useState } from "react";
import styles from "./AddUser.module.scss";
import { newUser } from "../../api/User/UserApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const title = "Add New User";

  const Toaster = () => {
    toast.success("User Added...", {
      position: "top-center",
    });
  };

  const Register = async (e) => {
    e.preventDefault();
    try {
      newUser(name, email, password, confPassword);
      setName("");
      setEmail("");
      setPassword("");
      setConfPassword("");
      onClose();
      Toaster();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  if (!open) return null;

  return (
    <>
      <ToastContainer />
      <div className={styles.modal}>
        <div onClick={onClose} className={styles.backdrop} />
        <div className={styles.modal_content}>
          <h2>{title}</h2>
          <div className={styles.form}>
            <p>{msg}</p>

            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="name"
            />

            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="email"
            />

            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />

            <label>Confirm Password</label>
            <input
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              type="password"
              placeholder="confirm Password"
            />

            <div className={styles.btn}>
              <button className={styles.cancel} onClick={onClose}>
                Cancel
              </button>
              <button className={styles.create} onClick={(e) => Register(e)}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
