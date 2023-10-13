import express from "express";
import {
  createCategory,
  getAllCategoriesCtrl,
  getSingleCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} from "../controllers/CategoryCtrl.js";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggedIn, createCategory);
categoriesRouter.get('/',getAllCategoriesCtrl);
categoriesRouter.get('/:id',getSingleCategoryCtrl);
categoriesRouter.put('/:id',isLoggedIn,updateCategoryCtrl);
categoriesRouter.delete('/:id',isLoggedIn,deleteCategoryCtrl);

export default categoriesRouter;
