import express from "express";

import {
  newUser,
  userLogin,
  userLogout,
  getUserById,
  deleteUser,
  getUsers,
  editUserProfile,
  getUser,
  countUser,
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/user", verifyToken, getUser);

router.get("/users", verifyToken, getUsers);

router.get("/user-token", refreshToken);

router.get("/user/profile/:id", getUserById);

router.put("/user/profile/edit/:id", editUserProfile);

router.delete("/user/delete/:id", deleteUser);

router.post("/user/new", newUser);

router.post("/user-login", userLogin);

router.delete("/user-logout", userLogout);

router.get("/users/count", countUser);

export default router;
