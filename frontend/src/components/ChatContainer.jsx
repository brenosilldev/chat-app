import React, {  useEffect ,useRef} from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageSkeleton from './skeletons/MessageSkeleton'
import  ChatHeader  from './ChatHeader'
import { MessageInput } from './MessageInput'
import { UserAuthStore } from '../store/useAuthstore'
import FormatMessageTime from '../lib/utils'

export const ChatContainer = () => {
  const { messages,getMessages,isMessagesLoading,selectedUser,subscribreToMessages,unsubcribeToMessages } = useChatStore()
  const { authuser} = UserAuthStore()
  const messageEndREf = useRef(null);
  
  useEffect(() => {     
    const buscarMessages = async () => {        
        if (selectedUser?._id) {
         
            await getMessages(selectedUser._id);
        } else {
            console.warn("selectedUser._id está indefinido ou nulo!");
        }
    };
    subscribreToMessages()
    buscarMessages();

    return () => {
      unsubcribeToMessages()
    }
}, [getMessages, selectedUser._id, subscribreToMessages, unsubcribeToMessages]);

  useEffect(() => {
      if(messageEndREf.current && messages) 
      messageEndREf.current.scrollIntoView({ behavior: "smooth" });
  },[messages])

  if(isMessagesLoading) return (

    <div className="flex flex-col flex-1 overflow-auto base-100/50">      
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
    </div>
  )
  
  return (
    <div className="flex flex-col flex-1 overflow-auto base-100/50">
        <ChatHeader />
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authuser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndREf}
          >
            <div className=" chat-image avatar">
              <div className="border rounded-full size-10">
                <img
                  src={
                    message.senderId === authuser._id
                      ? authuser.photo || "/avatar.png"
                      : selectedUser.photo || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="mb-1 chat-header">
              <time className="ml-1 text-xs opacity-50">
                {FormatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="flex flex-col chat-bubble">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
        <MessageInput />
      </div>
  )
}
