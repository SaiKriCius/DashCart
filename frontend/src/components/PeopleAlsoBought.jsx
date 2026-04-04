import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const PeopleAlsoBought = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await axios.get("/products/recommendations");
                setRecommendations(res.data);
            } catch (error) {
                toast.error(error.response.data.message || "An error occurred while fetching recommendations");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    // FIXED: Passed fullScreen={false} so it fits neatly inside the parent container!
    if (isLoading) return (
        <div className="mt-8 h-40">
            <LoadingSpinner fullScreen={false} />
        </div>
    );

    // FIXED: If there are no recommendations, don't render a floating, empty heading.
    if (recommendations.length === 0) return null;

    return (
        <motion.div 
            className='mt-12 pt-8 border-t border-border-subtle'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <h3 className='text-2xl font-bold text-text-main mb-6 flex items-center gap-2'>
                People also <span className="text-primary">bought</span>
            </h3>
            
            {/* The ProductCard component already handles all the heavy lifting for styling! */}
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
                {recommendations.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </motion.div>
    );
};

export default PeopleAlsoBought;