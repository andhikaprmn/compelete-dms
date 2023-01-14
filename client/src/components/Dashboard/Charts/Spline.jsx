import styles from "./Spline.module.scss";

const Spline = ({ title, Total }) => {
  return (
    <div className={styles.chart}>
      <div className={styles.description}>
        <h2>{`${title}`}</h2>
        <h3>Total</h3>
        <div className={styles.sales}>
          <span>{`${Total}`}</span>
        </div>
      </div>
    </div>
  );
};

export default Spline;
