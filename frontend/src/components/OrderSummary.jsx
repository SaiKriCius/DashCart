import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight, CreditCard } from "lucide-react";
import axios from "../lib/axios";

const OrderSummary = () => {
    const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

    const savings = subtotal - total;
    const formattedSubtotal = subtotal.toFixed(2);
    const formattedTotal = total.toFixed(2);
    const formattedSavings = savings.toFixed(2);

    const handlePayment = async () => {
        try {
            const res = await axios.post("/payments/create-checkout-session", {
                products: cart,
                couponCode: coupon ? coupon.code : null,
            });
            window.location.href = res.data.url;
        } catch (error) {
            console.error("Payment error:", error);
            // Optionally add a toast.error here if you want to show users if the network fails!
        }
    };

    return (
        <motion.div
            className='space-y-6 rounded-2xl border border-border-subtle bg-surface backdrop-blur-xl p-6 sm:p-8 shadow-2xl flex flex-col h-fit'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className='text-xl sm:text-2xl font-bold text-text-main'>
                Order Summary
            </h2>

            <div className='space-y-4 grow'>
                <div className='space-y-3 text-sm sm:text-base'>
                    {/* ORIGINAL PRICE */}
                    <dl className='flex items-center justify-between gap-4'>
                        <dt className='font-medium text-slate-300'>Original price</dt>
                        <dd className='font-semibold text-text-main'>₹{formattedSubtotal}</dd>
                    </dl>

                    {/* SAVINGS */}
                    {savings > 0 && (
                        <dl className='flex items-center justify-between gap-4'>
                            <dt className='font-medium text-slate-300'>Savings</dt>
                            <dd className='font-semibold text-primary'>-₹{formattedSavings}</dd>
                        </dl>
                    )}

                    {/* COUPON */}
                    {coupon && isCouponApplied && (
                        <dl className='flex items-center justify-between gap-4'>
                            <dt className='font-medium text-slate-300'>
                                Coupon (<span className="uppercase font-bold text-text-main">{coupon.code}</span>)
                            </dt>
                            <dd className='font-semibold text-primary'>-{coupon.discountPercentage}%</dd>
                        </dl>
                    )}
                    
                    {/* TOTAL (Emphasized) */}
                    <dl className='flex items-center justify-between gap-4 border-t border-border-subtle pt-4 mt-4'>
                        <dt className='text-lg font-bold text-text-main'>Total</dt>
                        <dd className='text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-primary to-indigo-400'>
                            ₹{formattedTotal}
                        </dd>
                    </dl>
                </div>
            </div>

            <div className="pt-2">
                {/* PROCEED TO CHECKOUT BUTTON */}
                <button
                    className='flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 text-sm sm:text-base font-bold text-text-main shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900'
                    onClick={handlePayment}
                >
                    <CreditCard size={20} />
                    Proceed to Checkout
                </button>

                {/* CONTINUE SHOPPING LINK */}
                <div className='mt-6 flex items-center justify-center gap-2'>
                    <span className='text-sm font-medium text-text-muted'>or</span>
                    <Link
                        to='/'
                        className='group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-indigo-400 transition-colors'
                    >
                        Continue Shopping
                        <MoveRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default OrderSummary;