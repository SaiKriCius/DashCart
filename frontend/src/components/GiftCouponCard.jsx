import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { Ticket, Tag, CheckCircle, X } from "lucide-react";

const GiftCouponCard = () => {
    const [userInputCode, setUserInputCode] = useState("");
    const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

    useEffect(() => {
        getMyCoupon();
    }, [getMyCoupon]);

    useEffect(() => {
        if (coupon) setUserInputCode(coupon.code);
    }, [coupon]);

    const handleApplyCoupon = () => {
        if (!userInputCode) return;
        applyCoupon(userInputCode);
    };

    const handleRemoveCoupon = async () => {
        await removeCoupon();
        setUserInputCode("");
    };

    return (
        <motion.div
            className='rounded-2xl border border-border-subtle bg-surface backdrop-blur-xl p-6 sm:p-8 shadow-2xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <h3 className='text-lg font-bold text-text-main mb-4 flex items-center gap-2'>
                <Ticket className="text-primary w-5 h-5" />
                Promo Code
            </h3>

            {isCouponApplied && coupon ? (
                /* ================= APPLIED STATE ================= */
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between shadow-inner'
                >
                    <div className='flex items-center gap-3'>
                        <CheckCircle className="text-primary w-6 h-6 shrink-0" />
                        <div>
                            <p className='text-sm font-extrabold text-text-main uppercase tracking-wider'>
                                {coupon.code}
                            </p>
                            <p className='text-xs font-medium text-primary mt-0.5'>
                                {coupon.discountPercentage}% OFF applied!
                            </p>
                        </div>
                    </div>

                    <button
                        type='button'
                        className='p-1.5 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200'
                        onClick={handleRemoveCoupon}
                        title="Remove Coupon"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </motion.div>
            ) : (
                /* ================= INPUT STATE ================= */
                <div className='space-y-4'>
                    <div>
                        <label htmlFor='voucher' className='mb-2 block text-sm font-medium text-slate-300'>
                            Do you have a voucher or gift card?
                        </label>
                        <input
                            type='text'
                            id='voucher'
                            className='block w-full uppercase bg-surface-hover border border-border-subtle rounded-lg py-2.5 px-4 text-text-main placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200'
                            placeholder='ENTER CODE'
                            value={userInputCode}
                            onChange={(e) => setUserInputCode(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type='button'
                        className='flex w-full items-center justify-center rounded-lg bg-white/10 border border-border-subtle px-5 py-2.5 text-sm font-bold text-text-main hover:bg-white/20 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/30'
                        onClick={handleApplyCoupon}
                    >
                        Apply Code
                    </button>

                    {/* AVAILABLE COUPON HINT */}
                    {coupon && (
                        <div className='mt-4 p-3 bg-surface-hover border border-border-subtle rounded-lg flex items-start gap-2'>
                            <Tag className="text-indigo-400 w-4 h-4 mt-0.5 shrink-0" />
                            <div>
                                <p className='text-sm font-medium text-slate-300'>Available for you</p>
                                <p className='text-xs text-text-muted mt-1'>
                                    Use code <span className="font-bold text-indigo-400 uppercase tracking-wide">{coupon.code}</span> for {coupon.discountPercentage}% off your order!
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default GiftCouponCard;