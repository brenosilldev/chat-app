
import UserModel from "../models/user.model.js";


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

        res.status(200).json({        
            success: true, 
            message: "User created successfully"
                       
        })
    
       



    } catch (error) {
        console.log(error);
    }

}

const Login = async(req, res) => {

    try {    

    } catch (error) {
        console.log(error);
    }
}


const logout = async(req, res) => {
    
}

export {Login,signup,logout}