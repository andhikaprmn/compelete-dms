import React from "react";
import styles from "./Desc.module.scss";

const Desc = () => {
  return (
    <main>
      <div className={styles.desc}>
        <h1>Document Management Sytem</h1>
        <h2>
          Dms adalah penggunaan sistem komputer dan aplikasi untuk menyimpan,
          mengelola dan melacak dokumen elektronik.
        </h2>
        <h3>
          Tujuan dari digunakannya sistem pengelolaan dokumen adalah untuk
          menyampaikan informasi yang terkandung didalam sebuah dokumen. Secara
          teknis, dms adalah tentang bagaimana sebuah informasi atau konten
          dapat disampaikan dari kontributor kepada konsumennya. Dalam bahasa
          umum, yaitu sebuah software aplikasi yang dirancang secara khusus
          dengan tujuan untuk mengorganisir, mengamankan, dan berbagai kegiatan
          lain pada dokumen elektronik suatu organisasi.
        </h3>
      </div>
      <div className={styles.cr}>
        <span>Copyright @ 2022 | Angkasa Pura Supports</span>
      </div>
    </main>
  );
};

export default Desc;
