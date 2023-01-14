import styles from "./Activity.module.scss";

const Activity = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Recent Activity</h2>
      </div>
      <div className={styles.today}>
        <h3 className={styles.activity_day}>Today</h3>
        <div className={styles.activities}>. . . Layanan Belum Tersedia</div>
      </div>
      <div className={styles.yesterday}>
        <h3 className={styles.activity_day}>Yesterday</h3>
        <div className={styles.activities}>. . . Layanan Belum Tersedia</div>
      </div>
    </div>
  );
};

export default Activity;
