import styles from "./History.module.scss";

const Activity = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Activity</h2>
      </div>
      <div className={styles.today}>
        <h3 className={styles.activity_day}>Last Week</h3>
        <div className={styles.activities}>. . . Layanan Belum Tersedia</div>
      </div>
      <div className={styles.yesterday}>
        <h3 className={styles.activity_day}>Last Month</h3>
        <div className={styles.activities}>. . . Layanan Belum Tersedia</div>
      </div>
    </div>
  );
};

export default Activity;
