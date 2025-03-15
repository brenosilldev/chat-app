import React, { useState,useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { X ,Image,Send} from 'lucide-react'
import toast from 'react-hot-toast'

export const MessageInput = () => {
    const [text,setText] = useState('')
    const [imagepreview ,setImagePreview] = useState(null)
    const fileInputRef = useRef(null);
    const {sendMessages} = useChatStore()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(!file.type.startsWith('image/')){
            toast.error('Please select an image file')
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
     
    }

    const removeImagePreview = async() => {
        setImagePreview(null)
        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }
    }

    const SendMessage = async(e) =>{
        e.preventDefault();
        if(!text.trim() && !imagepreview) return
        try {
            await sendMessages({text : text.trim(),image: imagepreview})
            setText("")
            setImagePreview(null)
            if(fileInputRef.current){    
                fileInputRef.current.value = "";
            }
            
        } catch (error) {
            toast.error(error.response.data.error)
        }
        
      
    }

    return (
        <div className='w-full p-4'>
            {imagepreview && (
                <div className='flex items-center gap-2 mb-3'>
                    <div className='relative'>
                        <img src={imagepreview} alt="Preview" className='w-20 h-20 border obect-contain roudend-lg border-zinc-700' />
                        <button className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center' onClick={removeImagePreview}>
                            <X className='size-3'/>
                               
                        </button>
                    </div>


                </div>
            )}
            
            <form onSubmit={SendMessage} className='flex items-center gap-2'>
                <div className='flex flex-1 gap-2'>
                    <input type="text" className='w-full p-2 border-2 rounded-lg input-bordered input-sm sm:input-md' placeholder='' value={text} onChange={(e) => setText(e.target.value)}/>
                
                    <input type="file"  className='hidden' ref={fileInputRef} onChange={handleImageChange} accept='image/*'/>
                    <button
                        onClick={() => fileInputRef.current?.click()} className={`hidden sm:flex btn btn-circle ${imagepreview ? 'text-emerald-500' : 'text-zinc-500'}`}>
                        <Image size={20}/>
                    </button>
                         

                </div>
                <button
                    type='submit'
                    className='btn btn-sm btn-circle'
                    disabled={!text.trim() && !imagepreview}
                    
                    >
                    <Send  size={20}/>
                </button>
             
            </form>

        </div>
    )
}
