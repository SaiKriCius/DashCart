import { useEffect, useRef, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);
	const [isMobile, setIsMobile] = useState(false);

	const startX = useRef(0);
	const lastX = useRef(0);
	const startTime = useRef(0);
	const isDragging = useRef(false);

	const { addToCart } = useCartStore();

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;

			if (width < 640) {
				setIsMobile(true);
				setItemsPerPage(2);
			} else {
				setIsMobile(false);
				if (width < 1024) setItemsPerPage(3);
				else if (width < 1280) setItemsPerPage(4);
				else setItemsPerPage(5);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		setCurrentIndex(0);
	}, [itemsPerPage]);

	const nextSlide = (step = itemsPerPage) => {
		setCurrentIndex((prev) =>
			Math.min(prev + step, featuredProducts.length - itemsPerPage)
		);
	};

	const prevSlide = (step = itemsPerPage) => {
		setCurrentIndex((prev) => Math.max(prev - step, 0));
	};

	/* ---------- MOMENTUM SWIPE ---------- */
	const onTouchStart = (e) => {
		startX.current = e.touches[0].clientX;
		lastX.current = startX.current;
		startTime.current = Date.now();
		isDragging.current = true;
	};

	const onTouchMove = (e) => {
		if (!isDragging.current) return;
		lastX.current = e.touches[0].clientX;
	};

	const onTouchEnd = () => {
		if (!isDragging.current) return;

		const distance = startX.current - lastX.current;
		const duration = Date.now() - startTime.current;
		const velocity = Math.abs(distance / duration);

		let step = 1;
		if (velocity > 0.6) step = 2;
		if (velocity > 1) step = 3;

		if (distance > 50) nextSlide(step);
		else if (distance < -50) prevSlide(step);

		isDragging.current = false;
	};

	const isStartDisabled = currentIndex === 0;
	const isEndDisabled =
		currentIndex >= featuredProducts.length - itemsPerPage;

	return (
		<div className="py-10">
			<div className="container mx-auto px-4">
				<h2 className="text-center text-3xl sm:text-5xl font-bold text-emerald-400 mb-6">
					Featured
				</h2>

				<div className="relative">
					<div
						className="overflow-hidden"
						onTouchStart={isMobile ? onTouchStart : undefined}
						onTouchMove={isMobile ? onTouchMove : undefined}
						onTouchEnd={isMobile ? onTouchEnd : undefined}
					>
						<div
							className="flex transition-transform duration-300 ease-out"
							style={{
								transform: `translateX(-${
									currentIndex * (100 / itemsPerPage)
								}%)`,
							}}
						>
							{featuredProducts.map((product) => (
								<div
									key={product._id}
									className={`shrink-0 px-2 ${
										isMobile
											? "w-[45%]" // 👈 PEEK EFFECT
											: "w-1/3 lg:w-1/4 xl:w-1/5"
									}`}
								>
									<div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-emerald-500/30">
										<img
											src={product.image}
											alt={product.name}
											className="w-full h-28 sm:h-36 lg:h-44 object-cover"
										/>

										<div className="p-2 sm:p-3">
											<h3 className="text-xs sm:text-sm font-semibold text-white truncate">
												{product.name}
											</h3>

											<div className="mt-2 flex items-center justify-between gap-2">
												<p className="text-emerald-300 text-xs sm:text-sm font-medium">
													₹{product.price.toFixed(2)}
												</p>

												<button
													onClick={() => addToCart(product)}
													className="bg-emerald-600 hover:bg-emerald-500 text-white 
													p-1.5 rounded flex items-center justify-center"
												>
													<ShoppingCart className="w-4 h-4" />
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* DESKTOP ARROWS */}
					{!isMobile && (
						<>
							<button
								onClick={() => prevSlide()}
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
								onClick={() => nextSlide()}
								disabled={isEndDisabled}
								className={`absolute top-1/2 -right-4 -translate-y-1/2 p-2 rounded-full ${
									isEndDisabled
										? "bg-gray-400 cursor-not-allowed"
										: "bg-emerald-600 hover:bg-emerald-500"
								}`}
							>
								<ChevronRight className="w-5 h-5" />
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;
