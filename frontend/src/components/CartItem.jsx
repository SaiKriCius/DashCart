import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useState, useEffect } from "react";

const DEFAULT_MAX_QTY = 10;

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	// support per-product max, fallback to default
	const MAX_QTY = item.maxQuantity ?? DEFAULT_MAX_QTY;

	const [inputValue, setInputValue] = useState(String(item.quantity));
	const [showMaxWarning, setShowMaxWarning] = useState(false);

	// keep input synced if quantity changes elsewhere
	useEffect(() => {
		setInputValue(String(item.quantity));
	}, [item.quantity]);

	const commitQuantity = () => {
		let value = Number(inputValue);

		if (!value || value < 1) value = 1;
		if (value > MAX_QTY) {
			value = MAX_QTY;
			setShowMaxWarning(true);
		}

		updateQuantity(item._id, value);
		setInputValue(String(value));
	};

	const increaseQty = () => {
		if (item.quantity >= MAX_QTY) {
			setShowMaxWarning(true);
			return;
		}
		updateQuantity(item._id, item.quantity + 1);
	};

	const decreaseQty = () => {
		updateQuantity(item._id, Math.max(1, item.quantity - 1));
	};

	return (
		<div className="rounded-xl border border-emerald-500/20 bg-gray-900/80 backdrop-blur-sm shadow-md p-4 md:p-6">
			<div className="flex items-start gap-4">

				{/* IMAGE */}
				<img
					src={item.image}
					alt={item.name}
					className="h-20 w-20 rounded-lg object-cover bg-white"
				/>

				{/* DETAILS */}
				<div className="flex-1">
					<h3 className="text-sm md:text-base font-semibold text-white">
						{item.name}
					</h3>

					<p className="mt-1 text-emerald-400 font-medium">
						₹{item.price}
					</p>

					<div className="mt-3 flex items-center justify-between">

						{/* QUANTITY CONTROLS */}
						<div className="flex flex-col">
							<div className="flex items-center gap-2">
								<button
									onClick={decreaseQty}
									className="rounded-md bg-gray-700 p-1 text-white hover:bg-gray-600"
								>
									<Minus size={14} />
								</button>

								<input
									type="number"
									min="1"
									max={MAX_QTY}
									inputMode="numeric"
									value={inputValue}
									onChange={(e) => {
										setInputValue(e.target.value);
										setShowMaxWarning(false);
									}}
									onBlur={commitQuantity}
									onKeyDown={(e) => {
										if (e.key === "Enter") e.target.blur();
									}}
									className="
										w-14
										text-center
										bg-gray-800
										border border-gray-600
										rounded-md
										text-white
										text-sm
										py-1
										[appearance:textfield]
										[&::-webkit-inner-spin-button]:appearance-none
										[&::-webkit-outer-spin-button]:appearance-none
									"
								/>

								<button
									onClick={increaseQty}
									disabled={item.quantity >= MAX_QTY}
									className={`
										rounded-md p-1 text-white
										${item.quantity >= MAX_QTY
											? "bg-gray-600 cursor-not-allowed opacity-50"
											: "bg-gray-700 hover:bg-gray-600"}
									`}
								>
									<Plus size={14} />
								</button>
							</div>

							{/* MAX WARNING */}
							{showMaxWarning && (
								<p className="mt-1 text-xs text-yellow-400">
									Max quantity allowed: {MAX_QTY}
								</p>
							)}
						</div>

						{/* REMOVE */}
						<button
							onClick={() => removeFromCart(item._id)}
							className="text-red-400 hover:text-red-500"
							title="Remove item"
						>
							<Trash2 size={18} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
