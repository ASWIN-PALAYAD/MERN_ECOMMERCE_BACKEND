import expressAsyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

//@desc      create orders
//@route    POST /api/v1/orders
//@acess    private
export const createOrderCtrl = expressAsyncHandler(async(req,res)=> {
    const {orderItems,shippingAddress,totalPrice} = req.body;
    const user = await User.findById(req.userAuthId);
    if(orderItems?.length <= 0){
        throw new Error("No items added")
    }
    const order = await Order.create({
        user:user?._id,
        orderItems,
        shippingAddress,
        totalPrice
    });
   

    //update the product qty
    const products = await Product.find({_id:{$in: orderItems}});
    
    orderItems?.map(async(order)=>{
        const product = products?.find((product)=>{
            return product?._id?.toString() === order?._id?.toString();
        });
        if(product){
            product.totalSold += order.qty; 
        }
        await product.save();
    })

    //push order to users
    user.orders.push(order?._id);
    await user.save();


    res.json({
        success : true,
        message : "Order placed",
        order,
        user,
    })
})



