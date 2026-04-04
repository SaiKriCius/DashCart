import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
    const { cart } = useCartStore();

    // ✅ EMPTY CART — NO GRID, PERFECT CENTER
    if (cart.length === 0) {
        return (
            <div className="grow min-h-[70vh] flex items-center justify-center px-4">
                <EmptyCartUI />
            </div>
        );
    }

    // ✅ NON-EMPTY CART — GRID LAYOUT
    return (
        <div className="grow py-8 sm:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* NEW: Added a Page Header! */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-text-main tracking-tight">
                        Shopping <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-indigo-400">Cart</span>
                    </h1>
                    <p className="mt-2 text-text-muted">
                        Review your items and apply any available coupons before checkout.
                    </p>
                </motion.div>

                {/* GRID LAYOUT */}
                <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-10 xl:gap-12">

                    {/* LEFT COLUMN */}
                    <div className="w-full">
                        <div className="space-y-4 sm:space-y-6">
                            {cart.map((item) => (
                                <CartItem key={item._id} item={item} />
                            ))}

                            {/* DESKTOP: People Also Bought (original position) */}
                            <div className="hidden lg:block mt-12">
                                <PeopleAlsoBought />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN — STICKY */}
                    {/* Adjusted top-28 so it doesn't collide with your fixed Navbar */}
                    <div className="w-full self-start space-y-6 mt-8 lg:mt-0 lg:sticky lg:top-28">
                        <OrderSummary />
                        <GiftCouponCard />
                    </div>
                </div>

                {/* MOBILE: People Also Bought at bottom */}
                <div className="block lg:hidden mt-12">
                    <PeopleAlsoBought />
                </div>
            </div>
        </div>
    );
};

export default CartPage;

// Upgraded Empty State Component
const EmptyCartUI = () => (
    <motion.div
        className="flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        {/* Premium Glassmorphism Icon Box */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-surface-hover rounded-full flex items-center justify-center border border-border-subtle shadow-2xl mb-8">
            <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 text-text-muted" />
        </div>
        
        <h3 className="text-2xl sm:text-3xl font-bold text-text-main mb-3">Your cart is empty</h3>
        
        <p className="text-text-muted max-w-sm mb-8 leading-relaxed">
            Looks like you haven&apos;t added anything to your cart yet. Discover our latest eco-friendly trends!
        </p>
        
        {/* Upgraded Button */}
        <Link
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-sm sm:text-base font-bold text-text-main shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all duration-200 active:scale-95"
            to="/"
        >
            Start Shopping
        </Link>
    </motion.div>
);