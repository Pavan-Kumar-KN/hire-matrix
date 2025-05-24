import express from "express";

// * db connection
import { dbConnection } from "./database/dbConnection.js";

// * Routes module
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";

import { config } from "dotenv";
import dotenv from 'dotenv'
import cors from "cors"; // * these module is used to link react with backend

// * error.js
import { errorMiddleware } from "./middlewares/error.js";

import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
dotenv.config({ path: "./config/config.env" });

// * Linking with frontend
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * these module for file upload we can use multer.
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// * 
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// * Establishing the database connection
dbConnection();

// * Error Middleware
app.use(errorMiddleware);
export default app;
