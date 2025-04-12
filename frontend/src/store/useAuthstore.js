import {create} from "zustand"
import { api } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client"


export const UserAuthStore = create((set,get) => ({
    authuser: null,
    isSigninUp:false,
    isLoggingIn:false,
    isUpdatePhoto:false,
    onlineUsers : [],
    isCheckAuth: true,
    socket: null,
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
    CheckAuth : async() =>{
        try{
            const res = await api.get("/user/check")
            set({authuser: res.data.user, isCheckAuth: true})
            get().SocketConnection()
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
            
            get().SocketDesconnection()
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

            get().SocketConnection()
            return true

        } catch (error) {
            toast.error(error.response.data.message)

            return true
        }finally{
            set({isLoggingIn:false})
        }
    

    },
    SocketConnection : ()=>{
        const {authuser} = get()
        if(!authuser || get().socket?.connected) return;

        const socket = io("https://chat-app-iyd0.onrender.com", { query :{
            userid : authuser._id

        }});

        socket.connect();
        set({socket:socket})

        socket.on("getOnlineUsers", (usersid) => {
            set({onlineUsers : usersid})
        })
    },
    SocketDesconnection : ()=>{
        if(get().socket?.connected) get().socket.disconnect();
     }


}));