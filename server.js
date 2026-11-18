import express from "express";
import dbConnect from "./src/config/dbconnect.js";
import userRouter from "./src/Router/userRouter.js";
import taskRouter from "./src/Router/taskRouter.js";

const app = express();
dbConnect();

const port = process.env.port || 8000;

app.use(express.json());
app.use('/',userRouter);
app.use('/',taskRouter);

app.listen(port,()=>{
    try {
       console.log(`app is running on port ${port}`); 
    } catch (error) {
        console.log(error)
    }
});