import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { PackageSearch } from "lucide-react";

const CategoryPage = () => {
    const { fetchProductsByCategory, clearProducts, products, loading } = useProductStore();
    const { category } = useParams();

    useEffect(() => {
        clearProducts();
        fetchProductsByCategory(category);
    }, [category, clearProducts, fetchProductsByCategory]);

    if (loading) {
        return (
            // Swapped the plain text for your actual loading component, centered beautifully
            <div className="grow flex items-center justify-center min-h-[60vh]">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="grow w-full py-8 sm:py-16">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Heading with Theme Gradient and automatic capitalization */}
                <motion.h1
                    className="text-center text-4xl sm:text-5xl font-extrabold capitalize mb-10 tracking-tight"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-indigo-400">
                        {category}
                    </span>
                </motion.h1>

                {/* Better Empty State handling */}
                {products?.length === 0 ? (
                    <motion.div
                        className="flex flex-col items-center justify-center py-20 px-4 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* A nice glassmorphism icon container */}
                        <div className="w-24 h-24 bg-surface-hover rounded-full flex items-center justify-center mb-6 border border-border-subtle shadow-lg">
                            <PackageSearch size={48} className="text-text-muted" />
                        </div>
                        
                        <h2 className="text-2xl sm:text-3xl font-bold text-text-main mb-4">
                            No products found in this category
                        </h2>
                        <p className="text-text-muted mb-8 max-w-md mx-auto">
                            We're working on adding more items to this collection. Check back soon or explore our other amazing products!
                        </p>
                        
                        {/* Call to Action to keep them on the site */}
                        <Link 
                            to="/"
                            className="bg-primary hover:bg-primary-dark text-text-main px-6 py-3 rounded-lg font-medium transition-all active:scale-95 shadow-lg shadow-primary/20"
                        >
                            Explore Other Categories
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {products?.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;