import React , { useEffect} from 'react'
import { useChatStore } from '../store/useChatStore'
import { Sidebar } from '../components/Sidebar'
import NoChatSelected  from '../components/NoChatSelected' 
import { ChatContainer } from '../components/ChatContainer'


export const Home = () => {
  const { selectedUser ,setSelectedUser} = useChatStore();
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedUser(null)
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setSelectedUser]);
  
  return (
    <div className="h-screen bg-base-200">
      <div className='flex pt-15'>
        <div className='w-full max-w-7xl rounded-lg shadow-cl h-[calc(100vh-5rem)]'>
            <div className='flex h-full overflow-hidden rounded-lg'>
                <Sidebar />
                {!selectedUser ? <NoChatSelected /> : <ChatContainer /> }
  
            </div>
          
        </div>

      </div>


      </div>
  )
}
