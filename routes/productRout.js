import express from 'express';
import { createProductCtrl, deleteProductCtrl, getAllProducts, getProductCtrl, updateProductCtrl } from '../controllers/productCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const productRouter = express.Router();


productRouter.post('/',isLoggedIn,createProductCtrl);
productRouter.get('/',getAllProducts);
productRouter.get('/:id',getProductCtrl); 
productRouter.put('/:id',isLoggedIn,updateProductCtrl);
productRouter.delete('/:id/delete',isLoggedIn,deleteProductCtrl);

export default productRouter;