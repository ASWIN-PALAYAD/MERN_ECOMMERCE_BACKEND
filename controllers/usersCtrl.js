import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";


//user registration

export const registerUserCtrl = asyncHandler(
    async (req, res) => {
        const { fullname, email, password } = req.body;
      
        const userExist = await User.findOne({ email });
        if (userExist) {
          throw new Error("user already exist")
        }
      
        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
      
        const user = await User.create({
          fullname,
          email,
          password: hashedPassword,
        });
      
        res.status(201).json({
          status: "success",
          message: "User created successfully",
          data: user,
        });
      }
)


//user login

export const loginUserCtrl = asyncHandler(
    async (req,res) => {
        const {email,password} = req.body;
    
        const userFound = await User.findOne({email});
        if(userFound && (await bcrypt.compare(password, userFound?.password))){
            res.json({
                status : "success",
                msg : 'User logged Successfully',  
                userFound,
                token : generateToken(userFound._id)
            })
        }else{
            throw new Error("Invalid login credentials")
        } 
    }
)



// @desc    Get User Profile
// @route   GET /api/v1/users/profile
// @access  Private

export const getUserProfileCtrl = asyncHandler(async(req,res)=> {
    
    const token = getTokenFromHeader(req);

    const verified = verifyToken(token)

    res.json({
        msg:"welcome to profile page" 
    })
})