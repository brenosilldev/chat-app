import {create} from "zustand"
import { api } from "../lib/axios";
import toast from "react-hot-toast";
export const UserAuthStore = create((set) => ({
    authuser: null,
    isSigninUp:false,
    isLoggingIn:false,
    isUpdatePhoto:false,
    onlineUsers : [],
    updatePhoto: async(photo)=>{
   
        set({isUpdatePhoto  : true})
        try{
            const res = await api.put('/user/updatephoto', photo, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            set({authuser: res.data})
            toast.success('Photo success.')

        } catch (error) {
            console.log("error in update profile:", error);
            const errorMessage = error.response?.data?.message
            toast.error(errorMessage);
        }

        finally{
            set({isUpdatePhoto:false})
        }

    },
    isCheckAuth: true,
    CheckAuth : async() =>{
        try{
            const res = await api.get("/user/check")
            set({authuser: res.data.user, isCheckAuth: true})

        }catch(err){
            console.log(err)
            set({authuser: null, isCheckAuth: true})
        }finally{
            set({isCheckAuth: false})
        }

    },
    singup : async (data) => {

        set({isSigninUp :true})

        try {
            const ret = await api.post('/user/signup', data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            set({authuser : ret.data })
           toast.success(ret.message)

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro ao se cadastrar";
            toast.error(errorMessage);
        
        }finally{
            set({isSigninUp:false})
        }

    },
    logout : async () =>{

        try {   
            
            await api.post('/user/logout', {}, {
                headers: {
                "Content-Type": "application/json"
                }
            });
            set({authuser: null});
            toast.success('Loggout')

        } catch (error) {
            toast.error(error.response.data.message)
        }
    
    },
    login : async(data) =>{
        set({isLoggingIn:true})
        try{
               
            const res = await api.post('/user/login', data, {
                headers: {
                "Content-Type": "application/json"
                }
            });

            set({authuser: res.data});
            toast.success('Success')

            return true

        } catch (error) {
            toast.error(error.response.data.message)

            return true
        }finally{
            set({isLoggingIn:false})
        }
    

    }
}));