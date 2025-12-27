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

	return (
		<div className="py-8 md:py-16">
			<div className="mx-auto max-w-7xl px-4 2xl:px-0">

				{/* GRID LAYOUT — sticky-safe */}
				<div className="mt-6 sm:mt-8 lg:grid lg:grid-cols-[1fr_380px] lg:gap-8">

					{/* LEFT COLUMN */}
					<div className="w-full">
						{cart.length === 0 ? (
							<EmptyCartUI />
						) : (
							<div className="space-y-6">
								{cart.map((item) => (
									<CartItem key={item._id} item={item} />
								))}

								{/* DESKTOP: People Also Bought (original position) */}
								<div className="hidden lg:block mt-12">
									<PeopleAlsoBought />
								</div>
							</div>
						)}
					</div>

					{/* RIGHT COLUMN — TRUE STICKY */}
					{cart.length > 0 && (
						<div className="w-full lg:max-w-md lg:sticky lg:top-24 self-start space-y-6 mt-8 lg:mt-0">
							<OrderSummary />
							<GiftCouponCard />
						</div>
					)}
				</div>

				{/* MOBILE: People Also Bought at bottom */}
				{cart.length > 0 && (
					<div className="block lg:hidden mt-12">
						<PeopleAlsoBought />
					</div>
				)}
			</div>
		</div>
	);
};

export default CartPage;

const EmptyCartUI = () => (
	<motion.div
		className="flex flex-col items-center justify-center space-y-4 py-16"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<ShoppingCart className="h-24 w-24 text-gray-300" />
		<h3 className="text-2xl font-semibold">Your cart is empty</h3>
		<p className="text-gray-400">
			Looks like you {"haven't"} added anything to your cart yet.
		</p>
		<Link
			className="mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white hover:bg-emerald-600"
			to="/"
		>
			Start Shopping
		</Link>
	</motion.div>
);
