import asyncHandler from 'express-async-handler';
import Product from "../models/Product.js";



//@desc     create new product
//@route    POST /api/v1/product
//@access   Private/Admin

export const createProductCtrl = asyncHandler(async(req,res)=> {
    const {name,description,brand,category,sizes,colors,user,reviews,price,totalQty} = req.body;

    //product exist
    const productExist = await Product.findOne({name});
    if(productExist){
        throw new Error("Product already exist");
    }
    //create product
    const product = await Product.create({
        name,
        description,
        brand,
        category,
        sizes,
        colors,
        brand,
        user :req.userAuthId,
        reviews,
        price,
        totalQty
    });
    //pussh the product into category
    res.json({
        status:"success",
        message:"Product created successfully",
        product
    });
})


//@desc     get all product
//@route    GET /api/v1/product
//@access   public

export const getAllProducts = asyncHandler(async(req,res)=>{
    //query
    let productQuery = Product.find();

     //search by name
     if(req.query.name){
        productQuery = productQuery.find({
            name:{$regex: req.query.name, $options:"i"},
        })
     }

     //search by brand
     if(req.query.brand){
        productQuery = productQuery.find({
            brand:{$regex: req.query.brand, $options:"i"},
        })
     }

     //search by category
     if(req.query.category){
        productQuery = productQuery.find({
            category:{$regex: req.query.category, $options:"i"},
        })
     }

     //search by colors
     if(req.query.colors){
        productQuery = productQuery.find({
            colors:{$regex: req.query.colors, $options:"i"},
        })
     }

     //search by sizes
     if(req.query.sizes){
        productQuery = productQuery.find({
            sizes:{$regex: req.query.sizes, $options:"i"},
        })
     }

     //filter by price range
     if(req.query.price){
        const priceRange = req.query.price.split('-')
        productQuery = productQuery.find({
            price : {$gte : priceRange[0], $lte: priceRange[1]}
        })
     }



    //await the query
    const products = await productQuery;


    res.json({
        status:"success",
        products
    });
});

