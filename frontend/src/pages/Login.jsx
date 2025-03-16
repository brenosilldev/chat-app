import React, { useState} from 'react'
import { Lock, Mail, MessageSquare, User ,Eye,EyeOff, Loader} from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import { UserAuthStore } from '../store/useAuthstore'
export const Login = () => {	

	const {isLoggingIn,login} = UserAuthStore();
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ 
      email : '',
      password : ''
    })
  
  //   const validateForm = () => {}
    const handlesubmit = async(e) => {

		e.preventDefault();
	 	await login(formData)


    }
  
  
  return (
    <div className='grid min-h-screen lg:grid-cols-2'>
		<div className='flex flex-col items-center justify-center p-6 sm:p-28'>
			<div className='w-full max-w-md space-y-8'>
				<div className='mb-8 text-center'>
					<div className='flex flex-col items-center gap-2 group'>
						<div className='flex items-center justify-center transition-colors size-12 rounded-xl bg-primary/10 group-hover:bg-primary/20'>
							<MessageSquare  className="size-6 text-primary"/>
						</div>
						<h1 className='mt-2 text-2xl font-bold'>Welcome Back</h1>
						<p className='text-base-content/60'>Sign in to your account</p>

					</div>
				</div>
				<form onSubmit={'handlesubmit'} className='space-y-6'>		
					<div className="form-control">
						<label className="label">
							<span className="font-medium label-text">Email</span>
						</label>

						<div className="relative">
							{/* Ícone Mail */}
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 z-999">
								<Mail className="w-6 h-6 text-base-content/40" />
							
							</div>

							{/* Campo de Input */}
							<input
							type="text"
								className="w-full pl-12 input input-bordered"
								placeholder="E-mail"
								value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							/>
							
						</div>
					</div>
					<div className='form-control'>
						<label className='label'>
							<span className='font-medium label-text'>Password</span>
						</label>
						<div className='relative'>							
							<div className='absolute inset-y-0 left-0 flex items-center pl-3 z-999'>
									<Lock className='size-5 text-base-content/40'></Lock>
							
							</div>
							<input 
								type={showPassword ? 'text' : 'password'}
								className={`input input-bordered w-full pl-10`}
								placeholder='***************'
								value={formData.password}
								onChange={(e) => setFormData({...formData,password: e.target.value})}
							/>
							<button type='button' className='absolute inset-y-0 right-0 flex items-center pr-3' onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <Eye size={20} /> : <EyeOff size={20}/>}
							</button>

						</div>

					</div>
					<button className='w-full btn btn-primary' type='submit' onClick={handlesubmit} disabled={isLoggingIn}>
						{isLoggingIn ? (

							<Loader className='animate-spin'/>
						) :
							"Sign In"
						}
						
					</button>
					<div className='text-center'>
						<div className='text-base-content/60'>
							Dont't have an account?{" "}
							<Link to={'/signup'} className='link link-primary'>
								Sign Up
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
