import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createBrandCtrl, deleteBrandCtrl, getAllBrandsCtrl, getSingleBrandCtrl, updateBrandCtrl } from "../controllers/BrandCtrl.js";

const brandsRouter = express.Router();

brandsRouter.post("/", isLoggedIn, createBrandCtrl);
brandsRouter.get('/',getAllBrandsCtrl);
brandsRouter.get('/:id',getSingleBrandCtrl);
brandsRouter.put('/:id',isLoggedIn,updateBrandCtrl);
brandsRouter.delete('/:id',isLoggedIn,deleteBrandCtrl);

export default brandsRouter;
