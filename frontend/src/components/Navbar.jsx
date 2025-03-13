import { UserAuthStore } from "../store/userAuthstore";
import { Link } from 'react-router-dom';
import { Lock, Mail, LogOut ,MessageSquare, User ,Eye,EyeOff, Loader,Settings} from 'lucide-react'

const Navbar = () => {
    const { logout ,authuser} = UserAuthStore()

    return (
        <header className='border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
            <div className='container mx-auto  px-6 sm:px-10  h-16'>

                <div className='flex items-center justify-between h-full'>

                    <div className='flex items-center gap-8'>
                        <Link to='/' className='flex items-center gap-2.5 hover:opacity-80 transition-all' >
                            <div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare  className="w-5 h-5 text-primary"/>
                            </div>
                            <h1 className='text-lg font-bold'>Chatty</h1>
                        </Link>
                    </div>

                    <div className='flex items-center gap-2'> 
                        <Link to='/settings' className='btn btn-sm gap-2 transition-colors'  >
                         
                            <Settings  className="w-5 h-5 text-white"/>
                        
                            
                        </Link>

                        {authuser && (
                            <>

                                <Link to='/profile' className='btn btn-sm gap-2' >
                         
                                    <User  className="w-5 h-5 text-white"/>
                                
                                    
                                </Link>
                                <button className='flex gap-2 items-center btn btn-sm' onClick={logout}>

                                    <LogOut   className="w-5 h-5 text-white"/>
                                   
                                </button>
                            </>
                        )}

                    </ div>

                </div>
            </div>
        </header>
    )
}

export  {Navbar};