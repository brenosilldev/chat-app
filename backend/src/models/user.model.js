import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,    
        required: true
    },
    email: {
        type: String,        
        required: true,
        unique: true
    },
    password: {
        type: String,        
        required: true
    },
    role: {
        type: String,        
        required: false,
        default: ''
    },
    photo: {
        type: String,        
        required: false,
        default: ''
    },
    },
    {timestamps: true}    
)

const UserModel = mongoose.model('User', userSchema);
export default UserModel