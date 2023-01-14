import React, { useState, useEffect } from "react";
import Greetings from "./Greetings";
import Spline from "./Charts/Spline";
import styles from "./Dashboard.module.scss";
import userApi, { getUser } from "../../api/User/UserApi";
import workspaceApi from "../../api/Workspace/WorkspaceApi";
import documentApi from "../../api/Document/DocumentApi";
import departemenApi from "../../api/Departemen/DepartemenApi";
import unitApi from "../../api/Unit/UnitApi";
import Desc from "./Desc";
import { useQuery } from "react-query";

const Dashboard = () => {
  const [totalUser, setTotalUser] = useState(null);
  const [totalWorkspace, setTotalWorkspace] = useState(null);
  const [totalDocument, setTotalDocument] = useState(null);
  const [totalDepartemen, setTotalDepartemen] = useState(null);
  const [totalUnit, setTotalUnit] = useState(null);

  const { data: user } = useQuery("user", getUser);

  const TotalUser = () => {
    userApi.get("/users/count").then((resp) => {
      setTotalUser(resp.data);
    });
  };
  const TotalWorkspace = () => {
    workspaceApi.get("/workspaces/count").then((resp) => {
      setTotalWorkspace(resp.data);
    });
  };
  const TotalDocument = () => {
    documentApi.get("/documents/count").then((resp) => {
      setTotalDocument(resp.data);
    });
  };
  const TotalDepartemen = () => {
    departemenApi.get("/departemens/count").then((resp) => {
      setTotalDepartemen(resp.data);
    });
  };
  const TotalUnit = () => {
    unitApi.get("/units/count").then((resp) => {
      setTotalUnit(resp.data);
    });
  };

  useEffect(() => {
    TotalUser();
    TotalWorkspace();
    TotalDocument();
    TotalDepartemen();
    TotalUnit();
  }, []);

  return (
    <div>
      <Greetings />

      <main>
        <div className={styles.charts}>
          {user?.isSuperAdmin && (
            <>
              <div className={styles.lines}>
                <Spline title="Departemens" Total={totalDepartemen} />
              </div>
              <div className={styles.lines}>
                <Spline title="Units" Total={totalUnit} />
              </div>
              <div className={styles.lines}>
                <Spline title="Users" Total={totalUser} />
              </div>
              <div className={styles.lines}>
                <Spline title="Workspaces" Total={totalWorkspace} />
              </div>
              <div className={styles.lines}>
                <Spline title="Documents" Total={totalDocument} />
              </div>
            </>
          )}
        </div>
      </main>

      <Desc />
    </div>
  );
};

export default Dashboard;
