import React from "react";

const EditProfile = () => {
  return (
    <div className={styles.big_container}>
      <div className={styles.container}>
        <div className={styles.user_control}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={User?.data.name}
          />
        </div>
        <div className={styles.user_control}>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={User.email}
          />
        </div>
        <div className={styles.user_control}>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
          />
        </div>
        <div className={styles.user_control}>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            placeholder="Confrim New Password"
          />
        </div>
        <div className={styles.btn}>
          <button onClick={(e) => update(e)}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
