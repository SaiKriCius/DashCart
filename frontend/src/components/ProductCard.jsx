import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
    const { user } = useUserStore();
    const { addToCart } = useCartStore();
    
    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to add products to cart", { id: "login" });
            return;
        } else {
            // add to cart
            addToCart(product);
            toast.success("Added to cart!"); // Added a nice success feedback!
        }
    };

    return (
        <div className='flex w-full relative flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface-hover shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-primary/20 hover:border-primary/30'>
            {/* Image Container with Hover Zoom */}
            <div className='relative mx-3 mt-3 flex h-40 sm:h-48 lg:h-56 overflow-hidden rounded-lg group'>
                <img 
                    className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-110' 
                    src={product.image} 
                    alt={product.name} 
                    loading="lazy" /* THIS FIXES YOUR SCROLL LAG */
                />
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-base font-semibold text-text-main line-clamp-1">
                    {product.name}
                </h3>

                {/* Using our new Theme color */}
                <p className="text-primary text-lg font-bold">
                    ₹{product.price}
                </p>

                <button
                    onClick={handleAddToCart} /* FIXED BUG HERE */
                    className="
                        mt-2
                        w-full
                        bg-primary hover:bg-primary-dark
                        text-text-main font-medium
                        py-2.5
                        rounded-lg
                        flex items-center justify-center gap-2
                        text-sm
                        transition-colors duration-200
                        active:scale-95
                    "
                >
                    <ShoppingCart size={18} />
                    Add to cart
                </button>
            </div>
        </div>
    );
};
export default ProductCard;