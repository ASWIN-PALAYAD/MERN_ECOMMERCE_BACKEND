import dotenv  from "dotenv";
dotenv.config();

import express from "express";
import dbConnect from "../config/dbConnect.js";   
import { globalErrHandler, notFound } from "../middlewares/globalErrorHandler.js";
import userRoutes from "../routes/usersRoute.js";
import productRouter from "../routes/productRout.js";




//dbConnect
dbConnect()

const app = express();
app.use(express.json());

//routes
app.use('/api/v1/users/',userRoutes);
app.use('/api/v1/products',productRouter);

//err midleware
app.use(notFound); 
app.use(globalErrHandler); 
 

export default app; 