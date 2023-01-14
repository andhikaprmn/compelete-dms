import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import UserRoutes from "./routes/UserRoutes.js";
import WorkspaceRoutes from "./routes/WorkspaceRoutes.js";
import DocumentRoutes from "./routes/DocumentRoutes.js";
import s3Routes from "./routes/s3Routes.js";
import DepartemenRoutes from "./routes/DepartemenRoutes.js";
import UnitRoutes from "./routes/UnitRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT_LOCAL;

try {
  await db.authenticate();
  console.log("connection successfully..");
} catch (error) {
  console.error("unable connect to database", error);
}

app.use(
  cors({
    credentials: true,
    origin: [
      "http://beginnerdeveloper.tech",
      "https://beginnerdeveloper.tech",
      "http://www.beginnerdeveloper.tech",
      "https://www.beginnerdeveloper.tech",
      "http://localhost:3000",
    ],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  "/api",
  UserRoutes,
  WorkspaceRoutes,
  DocumentRoutes,
  s3Routes,
  DepartemenRoutes,
  UnitRoutes
);
app.listen(5000, () => console.log("server running at " + PORT));
