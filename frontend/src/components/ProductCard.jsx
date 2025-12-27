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
		}
	};

	return (
		<div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg'>
			<div className='relative mx-3 mt-3 flex h-28 sm:h-40 lg:h-48 overflow-hidden rounded-xl '>
				<img className='object-cover w-full' src={product.image} alt='product image' />
				

			</div>

			<div className="p-3">
				<h3 className="text-sm font-semibold text-white truncate">
					{product.name}
				</h3>

				<p className="text-emerald-400 text-sm font-medium mt-1">
					₹{product.price}
				</p>

				<button
					onClick={() => addToCart(product)}
					className="
						mt-3
						w-full
						bg-emerald-600 hover:bg-emerald-500
						text-white
						py-1.5
						rounded-md
						flex items-center justify-center gap-2
						text-sm
					"
				>
					<ShoppingCart size={16} />
					Add to cart
				</button>
			</div>
		</div>
	);
};
export default ProductCard;
