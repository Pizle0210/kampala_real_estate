import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));

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
