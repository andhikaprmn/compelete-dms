import React, { useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  IoIosBackspace,
  IoMdInformationCircle,
  IoIosBuild,
} from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import styles from "./WorkspaceDetail.module.scss";
import workspaceApi, {
  useGetWorkspaceById,
} from "../../api/Workspace/WorkspaceApi";
import { ListUserOnWorkspace } from "./ListUserOnWorkspace";
import { InviteUser } from "./InviteUser";
import EditWorkname from "./EditWorkname";

//user
import { getUser } from "../../api/User/UserApi";
import { useQuery } from "react-query";

//tooltip
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import PreviewDocument from "./PreviewDocument";
import { useEffect } from "react";

const WorkspaceDetail = () => {
  const title = "Details";
  const [users, setUsers] = useState(null);
  const [editWorkname, setEditWorkname] = useState(false);
  const { workspaceId, unitId, departemenId } = useParams();
  const { isLoading, data, isError, error } = useGetWorkspaceById(workspaceId);
  const { data: user } = useQuery("user", getUser);

  const initGetMember = () => {
    workspaceApi
      .get(`/workspace/member/members?workspaceId=${workspaceId}`)
      .then((resp) => {
        setUsers(resp.data);
      });
  };

  useEffect(() => {
    initGetMember();
  }, []);

  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <main>
      <div className={styles.header}>
        <div className={styles.back_icon}>
          <Tippy content="Back">
            <Link
              className={styles.link}
              to={`/department/${departemenId}/unit/${unitId}/workspace`}
            >
              <IoIosBackspace />
            </Link>
          </Tippy>
        </div>
        <div className={styles.workname}>
          <h2>{title}</h2>
        </div>
        <div className={styles.delete}>
          <Tippy content="Information Detail of Workspace">
            <button>
              <IoMdInformationCircle />
            </button>
          </Tippy>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.workspace_container}>
          <div className={styles.content}>
            <h3>Workspace Name :</h3>
            <div className={styles.open_edit}>
              <h2>{data?.data.name}</h2>
              {user?.isSuperAdmin && (
                <Tippy content="Edit name ?">
                  <button onClick={() => setEditWorkname(true)}>
                    <IoIosBuild className={styles.iconEdit} />
                  </button>
                </Tippy>
              )}
            </div>

            <EditWorkname
              open={editWorkname}
              onClose={() => setEditWorkname(false)}
            />
          </div>
          <div className={styles.documentPreview}>
            <PreviewDocument workspaceId={workspaceId} />
          </div>
          {user?.isSuperAdmin && (
            <div className={styles.inviteList}>
              <InviteUser onInvite={initGetMember} workspaceId={workspaceId} />
            </div>
          )}
        </div>
        {user?.isSuperAdmin && (
          <div className={styles.memberList}>
            <ListUserOnWorkspace
              onRemove={initGetMember}
              members={users}
              workspaceId={workspaceId}
              unitId={unitId}
              departemenId={departemenId}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default WorkspaceDetail;
