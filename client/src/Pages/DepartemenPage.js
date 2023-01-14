import React from "react";
import DepartmentList from "../components/Departemen/DepartementList";
import DepartemenToolbar from "../components/Departemen/DepartemenToolbar";

const DepartemenPage = () => {
  return (
    <main>
      <DepartemenToolbar />
      <DepartmentList />
    </main>
  );
};

export default DepartemenPage;
