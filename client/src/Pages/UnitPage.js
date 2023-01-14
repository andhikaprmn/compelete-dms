import React from "react";
import UnitToolbar from "../components/Unit/UnitToolbar";
import UnitList from "../components/Unit/UnitList";
import { useParams } from "react-router-dom";

const UnitPage = () => {
  const { departemenId } = useParams();
  return (
    <main>
      <UnitToolbar departemenId={departemenId} />
      <UnitList departemenId={departemenId} />
    </main>
  );
};

export default UnitPage;
