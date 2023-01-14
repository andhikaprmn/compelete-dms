import React, { useState } from "react";
import styles from "./Clock.module.scss";

const Clock = () => {
  let time = new Date().toLocaleTimeString();

  const [cTime, setCTime] = useState(time);

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setCTime(time);
  };

  setInterval(updateTime, 1000);
  return <div className={styles.digitalClock}>{time}</div>;
};

export default Clock;
