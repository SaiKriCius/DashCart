import { XCircle, ArrowLeft, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
    return (
        <div className='min-h-[80vh] flex items-center justify-center px-4 overflow-hidden relative'>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className='max-w-md w-full bg-surface backdrop-blur-xl rounded-2xl border border-border-subtle shadow-2xl overflow-hidden relative z-10'
            >
                <div className='p-6 sm:p-8'>
                    
                    {/* Glowing Error Icon */}
                    <div className='flex justify-center mb-6'>
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
                            <XCircle className='text-red-500 w-20 h-20 relative z-10 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]' />
                        </div>
                    </div>

                    {/* Gradient Title */}
                    <h1 className='text-3xl font-extrabold text-center mb-2'>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-rose-400">
                            Purchase Cancelled
                        </span>
                    </h1>

                    <p className='text-slate-300 text-center mb-6'>
                        Your order has been cancelled. No charges have been made to your account.
                    </p>

                    {/* Glassmorphism Info Box */}
                    <div className='bg-surface-hover border border-border-subtle rounded-xl p-4 mb-8 flex items-start gap-3'>
                        <HelpCircle className="text-text-muted w-5 h-5 shrink-0 mt-0.5" />
                        <p className='text-sm text-text-muted text-left leading-relaxed'>
                            If you encountered any issues during the checkout process, please don&apos;t hesitate to contact our support team.
                        </p>
                    </div>

                    {/* Styled Return Button */}
                    <div className='space-y-4'>
                        <Link
                            to={"/"}
                            className='w-full bg-surface-hover hover:bg-white/10 border border-border-subtle text-text-main font-bold py-3 px-4 rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center group'
                        >
                            {/* Arrow slides to the LEFT on hover to indicate going back */}
                            <ArrowLeft className='mr-2 transition-transform group-hover:-translate-x-1' size={18} />
                            Return to Shop
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PurchaseCancelPage;