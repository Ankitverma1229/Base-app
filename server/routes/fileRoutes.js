import express from "express";
import {
  localFileUpload,
  excelUpload,
  getAllFiles,
} from "../controller/files/fileUpload.js";
const fileRouter = express.Router();

fileRouter.post("/localFileUpload", localFileUpload);
fileRouter.post("/excelUpload", excelUpload);
fileRouter.get("/getFile", getAllFiles);

export default fileRouter;
