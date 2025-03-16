import { UserAuthStore } from "../store/useAuthstore";
import { Link } from 'react-router-dom';
import { Lock, Mail, LogOut ,MessageSquare, User ,Eye,EyeOff, Loader,Settings} from 'lucide-react'

const Navbar = () => {
    
    const { logout ,authuser} = UserAuthStore()

    return (
        <header className='fixed top-0 z-40 w-full border-b border-base-300 backdrop-blur-lg bg-base-100/80'>
            <div className='container h-16 px-6 mx-auto sm:px-10'>

                <div className='flex items-center justify-between h-full'>

                    <div className='flex items-center gap-8'>
                        <Link to='/' className='flex items-center gap-2.5 hover:opacity-80 transition-all' >
                            <div className='flex items-center justify-center transition-colors w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary/20'>
                                <MessageSquare  className="w-5 h-5 text-primary"/>
                            </div>
                            <h1 className='text-lg font-bold'>Chatty</h1>
                        </Link>
                    </div>

                    <div className='flex items-center gap-2'> 
                        <Link to='/settings' className='gap-2 transition-colors btn btn-sm'  >
                         
                            <Settings  className="w-5 h-5"/>
                        
                            
                        </Link>

                        {authuser && (
                            <>

                                <Link to='/profile' className='gap-2 btn btn-sm' >
                         
                                    <User  className="w-5 h-5 "/>
                                
                                    
                                </Link>
                                <button className='flex items-center gap-2 btn btn-sm' onClick={logout}>

                                    <LogOut   className="w-5 h-5 "/>
                                   
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