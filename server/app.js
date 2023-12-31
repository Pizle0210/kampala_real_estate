import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.use("/kampalarealtor/", userRoute);
app.use("/kampalarealtor/auth", authRoute);

// app.use((err, req, res) => {
//   const statusCode = err.statusCode || 500;
//   err.status = err.status || "error";
//   const message = err.message || "Internal server error";
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

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
