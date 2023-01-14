import React from "react";
import { useParams } from "react-router-dom";

import DocumentToolbar from "../components/Document/DocumentToolbar";
import TableDocument from "../components/Document/TableDocument";

const Document = () => {
  const { workspaceId, unitId, departemenId } = useParams();

  return (
    <main>
      <DocumentToolbar
        departemenId={departemenId}
        unitId={unitId}
        workspaceId={workspaceId}
      />
      <TableDocument
        departemenId={departemenId}
        unitId={unitId}
        workspaceId={workspaceId}
      />
    </main>
  );
};

export default Document;
