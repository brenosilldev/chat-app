import React, { useState} from 'react'
import { UserAuthStore } from '../store/userAuthstore'
import { Lock, Mail, MessageSquare, User ,Eye,EyeOff, Loader} from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import { toast} from "react-hot-toast"

export const SignUpPage = () => {
	  const {singup} =  UserAuthStore()
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setloading] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email : '',
		password : ''
	})

	const validateForm = async () => {
		if(!formData.name.trim()) return toast.error('Name is required')
		if(!formData.email.trim()) return toast.error('E-mail is required')
		if(!formData.password.trim()) return toast.error('Password is required')
		setloading(true)
	}
	const handlesubmit = async(e) => {
		e.preventDefault();
		validateForm()
	 	await singup(formData)
		setloading(false)

	}



  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
		<div className='flex flex-col items-center justify-center p-6 sm:p-28'>
			<div className='w-full max-w-md space-y-8'>
				<div className='text-center mb-8'>
					<div className='flex flex-col items-center gap-2 group'>
						<div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
							<MessageSquare  className="size-6 text-primary"/>
						</div>
						<h1 className='text-2xl font-bold mt-2'>Create Account</h1>
						<p className='text-base-content/60'>Get Start with your free account</p>

					</div>
				</div>
				<form onSubmit={'handlesubmit'} className='space-y-6'>
					<div className='form-control'>
						<label className='label'>
							<span className='label-text font-medium'>Name</span>
						</label>
						<div className='relative '>
							<div className='absolute z-999 inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
								<User className='size-5 text-base-content/40'  />

							</div>
							<input 
								type='text'
								className={`input input-bordered w-full pl-10`}
								placeholder='Name'
								value={formData.name}
								onChange={(e) => setFormData({...formData,name: e.target.value})}
							/>

						</div>

					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Email</span>
						</label>

						<div className="relative">
							{/* Ícone Mail */}
							<div className="absolute z-999 inset-y-0 left-0 pl-3 flex items-center">
								<Mail className="h-6 w-6 text-base-content/40" />							
							</div>

							{/* Campo de Input */}
							<input
							type="email"
								className="input input-bordered w-full pl-12"
								placeholder="E-mail"
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							/>
							
						</div>
					</div>
					<div className='form-control'>
						<label className='label'>
							<span className='label-text font-medium'>Password</span>
						</label>
						<div className='relative'>							
							<div className='absolute z-999 inset-y-0 left-0 pl-3 flex items-center'>
									<Lock className='size-5 text-base-content/40'></Lock>
							
							</div>
							<input 
								type={showPassword ? 'text' : 'password'}
								className={`input input-bordered w-full pl-10`}
								placeholder='***************'
								value={formData.password}
								onChange={(e) => setFormData({...formData,password: e.target.value})}
							/>
							<button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center' onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <Eye size={20} /> : <EyeOff size={20}/>}
							</button>

						</div>

					</div>
					<button className='btn btn-primary w-full' type='submit' onClick={handlesubmit} disabled={loading ? true : false  }>
						{loading ? (

							<Loader className='animate-spin'/>
						) :
							"Create Account"
						}
						
					</button>
					<div className='text-center'>
						<div className='text-base-content/60'>
							Already have an account?{" "}
							<Link to={'/login'} className='link link-primary'>
								Sign in
							</Link>

						</div>

					</div>

				</form>


			</div>
			
		</div>

		
		<AuthImagePattern title={'Ajbnfei'}  subtitle={'dnmvgoindreoi'}/>

		


      </div>

  )
}
