import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Stripe from "stripe";



const stripe = new Stripe(process.env.STRIPE_KEY);

//@desc      create orders
//@route    POST /api/v1/orders
//@acess    private
export const createOrderCtrl = expressAsyncHandler(async(req,res)=> {
    const {orderItems,shippingAddress,totalPrice} = req.body;
    const user = await User.findById(req.userAuthId); 

    //check user has shipping address
    if(!user?.hasShippingAddress){
        throw new Error("Please provide shipping address")
    }

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

    // =================make payment (stripe)=========================
    //conver order items to have same structure that stripe need
    const convertedOrders = orderItems.map((item)=>{
        return {
            price_data:{
                currency:"inr",
                product_data:{
                    name:item?.name,
                    description:item?.description,
                },
                unit_amount:item?.price*100
            },
            quantity:item?.qty
        }
    })

    const session = await stripe.checkout.sessions.create({
        line_items:convertedOrders,
        metadata:{
            orderId :JSON.stringify( order?._id)
        },
        mode:'payment',
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel"
    }); 
    res.send({url:session.url});   


    // res.json({
    //     success : true,
    //     message : "Order placed",
    //     order,
    //     user,
    // })
})



