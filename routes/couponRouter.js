import express from 'express';
import { createCouponCtrl, deleteCouponCtrl, getAllCoupons, getSingleCouponCtrl, updateCouponCtrl } from '../controllers/couponCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const couponRouter = express.Router();

couponRouter.post('/',isLoggedIn,createCouponCtrl);
couponRouter.get('/',getAllCoupons);
couponRouter.get('/:id',getSingleCouponCtrl)
couponRouter.put('/update/:id',isLoggedIn,updateCouponCtrl);
couponRouter.delete('/delete/:id',isLoggedIn,deleteCouponCtrl)


export default couponRouter;