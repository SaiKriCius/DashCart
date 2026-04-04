import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, loading } = useUserStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Removed the console.log here for better security in production!
        login(email, password);
    };

    return (
        <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8 grow'>
            <motion.div
                className='sm:mx-auto sm:w-full sm:max-w-md'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Fixed the title and applied our brand gradient */}
                <h2 className='mt-6 text-center text-3xl sm:text-4xl font-extrabold'>
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-indigo-400">
                        Welcome Back
                    </span>
                </h2>
                <p className="mt-2 text-center text-sm text-text-muted">
                    Sign in to your account to continue
                </p>
            </motion.div>

            <motion.div
                className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                {/* Applied Glassmorphism to the main form container */}
                <div className='bg-surface backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-border-subtle'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        
                        {/* EMAIL INPUT */}
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-slate-300'>
                                Email address
                            </label>
                            <div className='mt-1 relative rounded-lg shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Mail className='h-5 w-5 text-text-muted' aria-hidden='true' />
                                </div>
                                <input
                                    id='email'
                                    type='email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='block w-full px-3 py-2.5 pl-10 bg-surface-hover border border-border-subtle rounded-lg text-text-main placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 sm:text-sm'
                                    placeholder='you@example.com'
                                />
                            </div>
                        </div>

                        {/* PASSWORD INPUT */}
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-slate-300'>
                                Password
                            </label>
                            <div className='mt-1 relative rounded-lg shadow-sm'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-text-muted' aria-hidden='true' />
                                </div>
                                <input
                                    id='password'
                                    type='password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='block w-full px-3 py-2.5 pl-10 bg-surface-hover border border-border-subtle rounded-lg text-text-main placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 sm:text-sm'
                                    placeholder='••••••••'
                                />
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-lg shadow-primary/20 text-sm font-bold text-text-main bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-primary transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100'
                        >
                            {loading ? (
                                <>
                                    <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    <LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
                                    Login
                                </>
                            )}
                        </button>
                    </form>

                    {/* SIGN UP LINK */}
                    <div className="mt-8 pt-6 border-t border-border-subtle">
                        <p className='text-center text-sm text-text-muted'>
                            Not a member yet?{" "}
                            <Link to='/signup' className='font-semibold text-primary hover:text-indigo-400 transition-colors inline-flex items-center group'>
                                Sign up now 
                                <ArrowRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;