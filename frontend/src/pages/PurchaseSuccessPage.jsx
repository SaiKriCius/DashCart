import { ArrowRight, CheckCircle, HandHeart, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";

const PurchaseSuccessPage = () => {
    const [isProcessing, setIsProcessing] = useState(true);
    const { clearCart } = useCartStore();
    const [error, setError] = useState(null);
    const [orderNumber, setOrderNumber] = useState("");

    useEffect(() => {
        const handleCheckoutSuccess = (sessionId) => {
            clearCart();
            setIsProcessing(false);
            // Grab the last 8 characters of the Stripe session ID to make a realistic, unique order number!
            setOrderNumber(sessionId.slice(-8).toUpperCase());
        };

        const sessionId = new URLSearchParams(window.location.search).get("session_id");
        
        if (sessionId) {
            handleCheckoutSuccess(sessionId);
        } else {
            setIsProcessing(false);
            setError("No session ID found in the URL. Please contact support if you were charged.");
        }
    }, [clearCart]);

    // 1. Sleek Loading State
    if (isProcessing) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner fullScreen={false} />
            </div>
        );
    }

    // 2. Styled Error State
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 text-center shadow-2xl"
                >
                    <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
                    <p className="text-red-200 mb-6">{error}</p>
                    <Link to="/" className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg transition-colors font-medium">
                        <ArrowRight size={18} /> Return Home
                    </Link>
                </motion.div>
            </div>
        );
    }

    // 3. Premium Success State
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 overflow-hidden relative">
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                gravity={0.15}
                style={{ zIndex: 99, position: 'fixed', top: 0, left: 0 }}
                numberOfPieces={700}
                recycle={false}
                colors={['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981']} // Themed confetti!
            />

            <motion.div 
                className="max-w-md w-full bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
            >
                <div className="p-6 sm:p-8">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                            <CheckCircle className="text-primary w-20 h-20 relative z-10 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                        </div>
                    </div>
                    
                    <h1 className="text-3xl font-extrabold text-center mb-2">
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-indigo-400">
                            Purchase Successful!
                        </span>
                    </h1>

                    <p className="text-slate-300 text-center mb-1">
                        Thank you for your order. It has been confirmed.
                    </p>
                    <p className="text-primary text-center text-sm font-medium mb-8">
                        Check your email for order details and updates.
                    </p>
                    
                    {/* Order Details Receipt Box */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8">
                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                            <span className="text-sm text-slate-400">Order number</span>
                            <span className="text-sm font-bold text-white tracking-wider">
                                #{orderNumber}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Estimated delivery</span>
                            <span className="text-sm font-semibold text-primary">
                                3-5 business days
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-default">
                            <HandHeart size={18} />
                            Thanks for trusting us!
                        </button>
                        
                        <Link
                            to={"/"}
                            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center group"
                        >
                            Continue Shopping
                            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PurchaseSuccessPage;