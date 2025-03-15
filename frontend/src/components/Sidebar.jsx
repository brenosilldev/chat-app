import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import  SidebarSkeleton  from './skeletons/SidebarSkeleton'
import { User } from 'lucide-react'
import { UserAuthStore } from '../store/userAuthstore'


export const Sidebar = () => {
    const {getUsers,users,selectedUser,setSelectedUser,isUsersLoading} = useChatStore()

    const {onlineUsers} = UserAuthStore()

    useEffect(() => {
        getUsers();
    },[getUsers])


    if(isUsersLoading) return <SidebarSkeleton />

    return (
     
            <aside className='flex flex-col w-20 h-full transition-all duration-200 border-r lg:w-72 border-base-300'>
                <div className='w-full p-5 border-b border-base-300'>
                    <div className='flex items-center gap-2'>
                        <User className='w-6 h-6' />
                        <span className='hidden font-medium lg:block'>Contacts</span>
                    </div>
                        
                </div>
            
            
                <div className='w-full py-3 overflow-y-auto'>
                    {users.map((user) => (
                        <button 
                            key={user?._id}
                            className={`flex items-center w-full gap-3 p-3 ${user?._id === selectedUser?._id ? 'bg-cyan-100' : 'hover:bg-base-200/50'}`}
                            onClick={() =>{
                                setSelectedUser(user) 
                               
                            } }
                        >

                            <div className='relative mx-auto lg:mx-0'>
                                <img src={user?.photo || '/avatar.png'} alt={user?.name} className='object-cover rounded-full size-12' />
                                {onlineUsers.includes(user?._id) && <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></span>}
                            </div>

                            <div className='hidden min-w-0 text-left lg:block'>
                                <div className='font-medium truncate'>
                                    {user?.name}
                                </div>
                                <div className='text-sm text-zinc-400'>
                                    {onlineUsers.includes(user?._id) ? 'Online' : 'Offline'}

                                </div>

                            </div>
                            
                        </button>
                    ))}

                </div>


               

                
            </aside>
    )
}
