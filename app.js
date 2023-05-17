import express from 'express';
import userRouter from './router/user.js';
import taskRouter from './router/task.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app=express();

// using middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin:[process.env.frontend_url],   
    credentials: true, 
    methods:['GET', 'POST','PUT','DELETE']
}))

// routers 
app.use("/api/v1/user",userRouter)
app.use("/api/v1/task",taskRouter)

export {app};