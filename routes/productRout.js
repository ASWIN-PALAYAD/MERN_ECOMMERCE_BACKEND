import express from 'express';
import { createProductCtrl, deleteProductCtrl, getAllProducts, getProductCtrl, updateProductCtrl } from '../controllers/productCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import upload from '../config/fileUpload.js';

const productRouter = express.Router();


productRouter.post('/',isLoggedIn,upload.array('files'),createProductCtrl);

// productRouter.post('/', isLoggedIn, (req, res, next) => {
//     upload.single('file')(req, res, (err) => {
//       if (err) {
//         // Handle Multer errors here
//         console.log(err+);
//         // return res.status(400).json({ error: err.message });
//       }
//       next(); // Proceed to your controller if there are no errors
//     });
//   }, createProductCtrl);
  
productRouter.get('/',getAllProducts);
productRouter.get('/:id',getProductCtrl); 
productRouter.put('/:id',isLoggedIn,updateProductCtrl);
productRouter.delete('/:id/delete',isLoggedIn,deleteProductCtrl); 

export default productRouter;