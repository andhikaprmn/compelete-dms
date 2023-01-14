import express from "express";

import { s3Upload, s3Get, getSignedUrl } from "../service/s3-controller.js";

const router = express.Router();

router.post("/upload", s3Upload);
router.get("/all-files", s3Get);
router.get("/get-object-url/:key", getSignedUrl);

export default router;
