import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);

	const { addToCart } = useCartStore();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(3);        // mobile
			else if (window.innerWidth < 1024) setItemsPerPage(4); // tablet
			else setItemsPerPage(5);                               // desktop
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// reset slider when layout changes
	useEffect(() => {
		setCurrentIndex(0);
	}, [itemsPerPage]);

	const nextSlide = () => {
		setCurrentIndex((prev) => prev + itemsPerPage);
	};

	const prevSlide = () => {
		setCurrentIndex((prev) => prev - itemsPerPage);
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

	return (
		<div className="py-12">
			<div className="container mx-auto px-4">
				<h2 className="text-center text-3xl sm:text-5xl font-bold text-emerald-400 mb-4">
					Featured
				</h2>

				<div className="relative">
					<div className="overflow-hidden">
						<div
							className="flex transition-transform duration-300 ease-in-out"
							style={{
								transform: `translateX(-${
									currentIndex * (100 / itemsPerPage)
								}%)`,
							}}
						>
							{featuredProducts?.map((product) => (
								<div
									key={product._id}
									className="w-1/3 sm:w-1/4 lg:w-1/5 shrink-0 px-2"
								>
									<div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full border border-emerald-500/30">
										<div className="overflow-hidden">
											<img
												src={product.image}
												alt={product.name}
												className="w-full h-24 sm:h-32 lg:h-40 object-cover"
											/>
										</div>

										<div className="p-1.5 sm:p-3 lg:p-4">
											<h3 className="text-xs sm:text-sm font-semibold mb-1 text-white truncate">
												{product.name}
											</h3>

											<div className="flex items-center justify-between gap-2">
												<p className="text-emerald-300 text-xs sm:text-sm font-medium">
													₹{product.price.toFixed(2)}
												</p>

												<button
													onClick={() => addToCart(product)}
													className="bg-emerald-600 hover:bg-emerald-500 text-white 
													py-1 px-2 rounded transition-colors duration-300 
													flex items-center justify-center"
												>
													<ShoppingCart className="w-4 h-4" />
													<span className="hidden sm:inline ml-1 text-xs">
														Add
													</span>
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute top-1/2 -left-4 -translate-y-1/2 p-2 rounded-full ${
							isStartDisabled
								? "bg-gray-400 cursor-not-allowed"
								: "bg-emerald-600 hover:bg-emerald-500"
						}`}
					>
						<ChevronLeft className="w-5 h-5" />
					</button>

					<button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute top-1/2 -right-4 -translate-y-1/2 p-2 rounded-full ${
							isEndDisabled
								? "bg-gray-400 cursor-not-allowed"
								: "bg-emerald-600 hover:bg-emerald-500"
						}`}
					>
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;
