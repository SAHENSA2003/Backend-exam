
import sessionSchema from "../model/sessionSchema.js";
import userSchema from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config"

export const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "userName, email and password is required to register"
            })
        };

        const exist = await userSchema.findOne({ email });
        if (exist) {
            return res.status(404).json({
                success: false,
                message: "user already exist please login!!"
            })
        };

        const hassedPassword = await bcrypt.hash(password, 10);
        const createUser = await userSchema.create({
            userName,
            email,
            password: hassedPassword
        });

        if(createUser){
            return res.status(200).json({
                success:true,
                message:"User successfully register",
                data:createUser
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error!!"
        })
    }
};


export const login = async (req,res)=>{
    try {
     const {email,password} = req.body;
     const user = await userSchema.findOne({email:email});
     if(!user){
        return res.status(403).json({
            success:false,
            message:"unauthorized access!! no user found .."
        })
     };

     const matchPass = await bcrypt.compare(password,user.password);
     if(!matchPass){
        return res.status(403).json({
           success:false,
           message:"password incorrect!!"  
        })
     };
    await sessionSchema.findOneAndDelete({userId:user._id});
    const session = await sessionSchema.create({userId:user._id});
    
    const accesstoken = jwt.sign({id:session._id},process.env.secretKey,{"expiresIn":"1h"});
    user.isLoggedIn=true,
    await user.save();

    return res.status(201).json({
        success:true,
        message:"user successfully loggedIn",
        accesstoken,
    });
    } catch (error) {
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"Internal server error"
       }) 
    }
};
