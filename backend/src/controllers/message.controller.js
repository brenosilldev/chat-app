
import cloudinary from "../lib/cloudinary.js";
import bcrypt from "bcryptjs"
import MessageModel from '../models/message.mode.js'
import UserModel from "../models/user.model.js";
import { getReceiverSocketId ,io} from "../lib/socket.js";


const getUsersForSidebar = async(req, res) =>{
    
    try{
        const loggeduserid = req.iduser;
        const filtredUsers = await UserModel.find({_id: {$ne:loggeduserid}}).select('-password');
        res.status(200).json(filtredUsers)

    }catch(error){
        console.log(error)
        res.status(500).json({error:'Internal server error'})

    }

}

const GetMessage = async (req, res) => {
    try{
        
        const id = req.params.id
        const myid = req.iduser


        const message = await MessageModel.find({
            $or:[
                {senderId:myid,receiverId:id},
                {senderId:id,receiverId:myid},
            ]
        })
        res.status(200).json(message)

    }catch(erro){
    
        res.status(500).json({error:'Internal serve error.'})
    }
}


const SendMessage = async(req,res) =>{

    try{
        const {text,image} = req.body;
      
        const id = req.params.id;
        const myid = req.iduser._id;
        
        let imageurl;

        if(image){
      
            const uploadresponse = await cloudinary.uploader.upload(image)        
            imageurl = uploadresponse.secure_url
        }


        const sendmessage = new MessageModel({
            senderId:myid,
            receiverId: id,
            text,
            image:imageurl
        })
       

        await sendmessage.save();

      
        const receiverrSocketId = getReceiverSocketId(id)

        if(receiverrSocketId){
            io.to(receiverrSocketId).emit('newMessage',sendmessage)
        }

        res.status(201).json(sendmessage)


    }catch(error){
        res.status(500).json({error:'Internal serve error.'})
    }
    
}


export {getUsersForSidebar,GetMessage,SendMessage}