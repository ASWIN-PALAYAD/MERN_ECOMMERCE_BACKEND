import dotenv  from "dotenv";
dotenv.config();

import express from "express";
import dbConnect from "../config/dbConnect.js";   
import { globalErrHandler, notFound } from "../middlewares/globalErrorHandler.js";
import userRoutes from "../routes/usersRoute.js";
import productRouter from "../routes/productRout.js";
import categoriesRouter from '../routes/categoriesRouter.js';
import brandsRouter from "../routes/brandsRouter.js";
import colorRouter from "../routes/colorRouter.js";
import reviewRouter from "../routes/reviewRouter.js";
import orderRouter from "../routes/orderRouter.js";




//dbConnect
dbConnect()
 
const app = express();
app.use(express.json());

//routes
app.use('/api/v1/users/',userRoutes);
app.use('/api/v1/products',productRouter);
app.use('/api/v1/categories',categoriesRouter);
app.use('/api/v1/brands',brandsRouter);
app.use('/api/v1/colors', colorRouter);
app.use('/api/v1/reviews',reviewRouter);
app.use('/api/v1/orders',orderRouter);

//err midleware
app.use(notFound); 
app.use(globalErrHandler); 
 

export default app; 