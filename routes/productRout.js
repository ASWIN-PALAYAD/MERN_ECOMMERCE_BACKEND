import express from 'express';
import { createProductCtrl, getAllProducts } from '../controllers/productCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const productRouter = express.Router();


productRouter.post('/',isLoggedIn,createProductCtrl);
productRouter.get('/',getAllProducts)

export default productRouter;