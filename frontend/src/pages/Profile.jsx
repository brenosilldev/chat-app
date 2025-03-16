import React, { useState } from 'react'
import { UserAuthStore } from '../store/useAuthstore'
import { Camera,User,Mail } from "lucide-react"

export const Profile = () => {
  const {authuser,isUpdatePhoto,updatePhoto} = UserAuthStore()

  const [imagem,setimagem] = useState('')
  const handleImageUpload = async(e) =>{
    const photo = e.target.files[0]
    if(!photo) return;


    const reader = new FileReader();
    
    reader.readAsDataURL(photo)
    reader.onload = async()=>{
      const base64Image = reader.result
      setimagem(base64Image)
      await updatePhoto({photo: base64Image})
    }

  }
  return (


      <div className='h-screen pt-20'>
          <div className="max-w-2xl p-4 py-10 mx-auto">
            <div className='p-6 space-y-8 bg-base-300 rounded-xl'>
              <div className='text-center '>
                  <h1 className='text-2xl font-semibold'>Profile</h1>
                  <p className='mt-2'>Your profile information</p>

              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <img
                    src={imagem || authuser?.photo || "/avatar.png"}
                    alt="Profile"
                    className="object-cover border-4 rounded-full size-32 "
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute bottom-0 right-0 
                      bg-base-content hover:scale-105
                      p-2 rounded-full cursor-pointer 
                      transition-all duration-200
                      ${isUpdatePhoto ? "animate-pulse pointer-events-none" : ""}
                    `}
                  >
                    <Camera className="w-5 h-5 text-base-200" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatePhoto}
                    />
                  </label>
                </div>
                <p className="text-sm text-zinc-400">
                  {isUpdatePhoto ? "Uploading..." : "Click the camera icon to update your photo"}
                </p>
              </div>
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <User className="w-4 h-4" />
                      Name
                  </div>
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authuser?.name || 'Teste'} </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authuser?.email}</p>
                </div>
              </div>
              <div className="p-6 mt-6 bg-base-300 rounded-xl">
                  <h2 className="mb-4 text-lg font-medium">Account Information</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                      <span>Member Since</span>
                      <span>{authuser?.createdAt?.split("T")[0]}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span>Account Status</span>
                      <span className="text-green-500">Active</span>
                    </div>
                  </div>
              </div>


            </div>

          </div>
        </div>
      )


}
