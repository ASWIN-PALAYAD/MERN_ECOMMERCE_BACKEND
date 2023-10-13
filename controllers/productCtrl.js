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

     //pagination
     const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1
     const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10 ;
     const startIndex = (page - 1)* limit;
     const endIndex = page * limit;
     const total = await Product.countDocuments()

     productQuery = productQuery.skip(startIndex).limit(limit)

     //pagination result
     const pagination = {}
     if(endIndex < total){
        pagination.next = {
            page: page+1,
            limit
        }
     }

     if(startIndex > 0){
        pagination.prev = {
            page: page-1,
            limit
        }
     }

    //await the query
    const products = await productQuery;


    res.json({

        status:"success",
        results : products.length,
        total,
        pagination,
        message: "Products fetched successfully",
        products
    });
});

//@desc     get single product
//@route    GET /api/v1/product/:id
//@access   public

export const getProductCtrl = asyncHandler(async(req,res)=> {
    const product = await Product.findById(req.params.id);
    if(!product){
        throw new Error('Product not found');
    }else{
        res.json({
            status: "success",
            message:"Prouct fetched successfully",
            product
        })
    }
})


//@desc     update single product
//@route    PUT /api/v1/product/:id
//@access   private/admin

export const updateProductCtrl = asyncHandler(async(req,res)=>{
    const {name,description,brand,category,sizes,colors,user,reviews,price,totalQty} = req.body;

    const product = await Product.findByIdAndUpdate(req.params.id,{
        name,description,brand,category,sizes,colors,user,reviews,price,totalQty
    },
    {
        new:true,
    });

    res.json({
        status : "success",
        message:"Product updated successfully",
        product,
    })

})

