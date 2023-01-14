import React from "react";
import WorkspaceToolbar from "../components/Workspace/WorkspaceToolbar";
import WorkspaceList from "../components/Workspace/WorkspaceList";
import { useParams } from "react-router-dom";

const Document = () => {
  const { unitId, departemenId } = useParams();
  return (
    <main>
      <WorkspaceToolbar unitId={unitId} departemenId={departemenId} />
      <WorkspaceList unitId={unitId} departemenId={departemenId} />
    </main>
  );
};

export default Document;
