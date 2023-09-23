//do this for es6 not require (This file is being treated as an ES module because it has a '.js' file extension 'package.json' contains "type": "module".
//To treat it as a CommonJS script, rename it to use the '.cjs' file
//extension.)
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

//const express = require("express");
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from Dall-E");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log("Server started at port 8080");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
