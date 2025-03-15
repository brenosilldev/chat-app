import { create } from "zustand";
import { api } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set,get) => ({
    messages : [],
    users : [],
    selectedUser : null,
    isMessagesLoading : false,
    isUsersLoading : false,
    getUsers: async () => {
        try {
            set({isUsersLoading : true})
            const res = await api.get('/message/users')

            set({users : res.data})
            
        } catch (error) {
            toast.error(error.response.data.error)
        }finally{
            set({isUsersLoading : false})
        }
    },
    getMessages: async (iduser) => {
      
        set({isMessagesLoading : true})

        try {
            const res = await api.post(`/message/${iduser}`)     
            set({messages : res.data})
 
        } catch (error) {

            toast.error(error.response.data.error)
        }finally{
            set({isMessagesLoading : false})
        }
    },
    sendMessages: async (MessageData) => {
        const {selectedUser,messages} = get()
    
        try {
            const res = await api.post(`/message/send/${selectedUser._id}`,MessageData)
            set({messages : [...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.error)
        }
    },
    setSelectedUser : (user) => set({selectedUser : user})
}));