import express from "express";
import { createTask, deleteTask, getAlltaks } from "../controller/taksController.js";
import { hashToken } from "../middlewear/hashtoken.js";

const taskRouter = express.Router();

taskRouter.post("/create", hashToken, createTask);
taskRouter.get("/getall", hashToken, getAlltaks);
taskRouter.delete("/deltask/:id",hashToken,deleteTask);

export default taskRouter;