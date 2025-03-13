import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js";

export const ProtecRoute = async(req,res,next) =>{

    try{
        const token = req.cookies.token;

        if(!token){
           return res.status(401).json({success:false,message:'Unathorized - No Token Provided.'})
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET)

        if(!decode) return res.status(401).json({success:false,message:'Unathorized - Token Invalid.'})

        const user = await UserModel.findById(decode.iduser).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.iduser = user;


        next()

    }catch(error){

        console.log(error)
    }

}