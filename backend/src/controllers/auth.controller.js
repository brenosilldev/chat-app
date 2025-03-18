
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs"

const signup = async(req, res) => {
    const {name,email,password} = req.body
    try {    
        
        if(password.length < 6){
            return res.status(400).json({
                success: false, 
                message: "Password must be at least 6 characters"
            })   
        }

        const user = await UserModel.findOne({email})
        if(user){
            return res.status(400).json({
                success: false, 
                message: "User already exists"
            })
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        })

        if(!newUser){  
          
            return res.status(400).json({
                success: false, 
                message: "User not created"
            })                                
        }

        const token = generateToken(newUser._id, res)
        await newUser.save()
            
        res.status(200).json({       

            success: true, 
            token,
            message: "User created successfully"
                       
        })

    } catch (error) {
        console.log(error);
    }

}

const Login = async(req, res) => {

    const {email,password} = req.body 

    try {    

        const verify = await UserModel.findOne({email})

        if(!verify) return res.status(400).json({success:false,message: 'E-mail no exist.'})
        
        const verifypassword = await bcrypt.compare(password,verify.password)
    
        if(!verifypassword) return res.status(400).json({success:false,message: 'Password incorret.'})
            
        await generateToken(verify._id,res)

        res.status(200).json({ 
            success:true,
            _id : verify._id,
            name : verify.name,
            email : verify.email,
            image : verify.photo,
            role : verify.role
        })
          


    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:'Internal Server Error'})
    }
}


const logout = async(req, res) => {

    try{
        res.cookie("token", "",{ maxAge: 0})
        res.status(200).json({success:false,message:'Logout in success'})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:'Internal Server Error'})
    }
    
}


const UpdateUserPhoto = async (req, res) => {
    
    try {
    
        const iduser = req.iduser; 
        const { photo } = req.body; // Get name and email from request body
        // Find user by ID and update with new name and email

     
        if(!photo){
            return res.status(400).json({ success: false ,message:'Photo is required'});
        }

        const uploadresponse = await cloudinary.uploader.upload(photo)
        const updatedUser = await UserModel.findByIdAndUpdate(iduser, {photo:uploadresponse.secure_url}, { new: true });
        res.status(200).json({ updatedUser });

    } catch (error) {
        // Log error and return 500 internal server error
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const checkAuth = async (req, res) => {
    
    if (!req.iduser) {
        return res.status(401).json({ success: false, message: 'Unauthenticated' });
    }

    const user = await UserModel.findById(req.iduser)

    // Return success response with user data
    res.status(200).json({ success: true, user });
}

export {Login,signup,logout,UpdateUserPhoto,checkAuth}