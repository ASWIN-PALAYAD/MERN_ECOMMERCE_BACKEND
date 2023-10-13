import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    orders : [
        {
            type : mongoose.Schema.ObjectId,
            ref : "Order"
        }
    ],
    wishLists : [{
        type : mongoose.Schema.ObjectId,
        ref : "WishList"
    }],
    isAdmin : {
        type : Boolean,
        default : false
    },
    hasShippingAddress : {
        type: Boolean,
        default : false
    },
    shippingAddress : {
        firstName :{
            type : String,
        },
        lastName :{
            type : String,
        },
        address :{
            type : String,
        },
        city :{
            type : String,
        },
        postalCode :{
            type : String,
        },
        province :{
            type : String,
        },
        country :{
            type : String,
        },
        phone :{
            type : String,
        },
    }
}, {
    timestamps: true
});

//compile user schema to model in mongodb

const User  = mongoose.model('User',UserSchema);

export default User;