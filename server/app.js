import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import dotenv from "dotenv";
import asyncHandler from "./middleware/asyncHandler.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/kampala", asyncHandler(userRouter));
app.use("/kampala/auth", asyncHandler(authRouter));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`connected to database and now running on port ${port}`);
    });
  })
  .catch((error) => {
    if (error) throw error;
  });

process.on("uncaughtException", (err) => {
  console.log(`error encountered,${err}`);
  process.abort(1);
});
