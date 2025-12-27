import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
	const { fetchProductsByCategory, clearProducts, products, loading } =
		useProductStore();

	const { category } = useParams();

	useEffect(() => {
		clearProducts();
		fetchProductsByCategory(category);
	}, [category, clearProducts, fetchProductsByCategory]);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-xl text-gray-300">Loading...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<motion.h1
					className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-10"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</motion.h1>

				<motion.div
					className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
				>
					{products?.length === 0 && (
						<h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">
							No products found
						</h2>
					)}

					{products?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default CategoryPage;
