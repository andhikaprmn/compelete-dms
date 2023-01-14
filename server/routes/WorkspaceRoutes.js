import express from "express";

import {
  getWorkspaces,
  getWorkspaceById,
  createWorkspace,
  editWorkspace,
  deleteWorkspace,
  getMemberInvite,
  getMemberList,
  inviteMember,
  removeMember,
  countWorkspace,
} from "../controllers/WorkspaceController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.use(verifyToken);

router.get("/workspaces", getWorkspaces);

router.post("/workspace/new", createWorkspace);

router.get("/workspace/:id", getWorkspaceById);

router.put("/workspace/:id", editWorkspace);

router.delete("/workspace/:id", deleteWorkspace);

// list user that can be invite into this workspace
// param query: workspace_id
router.get("/workspace/member/user-candidates", getMemberInvite);

// list user in this workspace (member)
// param query: workspace_id
router.get("/workspace/member/members", getMemberList);

// invite user from this workspace
// param query: workspace_id, target_user_id
// logic: insert row into user_workspace
router.post("/workspace/member/invite", inviteMember);

// remove user from this workspace
// param query: workspace_id, target_user_id
// logic: delete row from user_workspace WHERE workspace_id=req.query.workspace_id AND user_id=req.query.target_user_id
router.delete("/workspace/member/remove", removeMember);

router.get("/workspaces/count", countWorkspace);

export default router;
