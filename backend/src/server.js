import express from "express";
import { routes } from "./routes";
import mongoose from "mongoose";
const fileUpload = require("express-fileupload");
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.static(__dirname + "/uploads/"));

app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization,AuthToken"
  );
  next();
});

routes.forEach((route) => app[route.method](route.path, route.handler));

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    app.listen(8080);
    console.log("Connected to 8080!");
  })
  .catch((err) => {
    console.log(err);
  });
