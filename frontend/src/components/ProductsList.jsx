import { motion } from "framer-motion";
import { Trash, Star, Edit, PackageOpen } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = ({ onEdit }) => {
    const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

    // Empty State Handling
    if (!products || products.length === 0) {
        return (
            <motion.div
                className="flex flex-col items-center justify-center py-16 px-4 bg-slate-900/50 backdrop-blur-md rounded-xl border border-white/10 shadow-xl max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                    <PackageOpen size={40} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Products Found</h3>
                <p className="text-slate-400 text-center max-w-sm">
                    Your store is currently empty. Start adding some awesome products to see them listed here!
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            className='bg-slate-900/60 backdrop-blur-lg shadow-2xl rounded-xl border border-white/10 overflow-hidden max-w-4xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Added overflow-x-auto so the table can scroll horizontally on mobile devices without breaking the page layout! */}
            <div className="overflow-x-auto">
                <table className='min-w-full divide-y divide-white/10'>
                    <thead className='bg-slate-800/50'>
                        <tr>
                            <th className='px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider'>
                                Product
                            </th>
                            <th className='px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider'>
                                Price
                            </th>
                            <th className='px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider'>
                                Category
                            </th>
                            <th className='px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider'>
                                Featured
                            </th>
                            <th className='px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-white/5'>
                        {products?.map((product) => (
                            <tr key={product._id} className='hover:bg-white/5 transition-colors duration-200'>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <div className='flex items-center gap-4'>
                                        <div className="relative h-12 w-12 rounded-lg border border-white/10 overflow-hidden shrink-0">
                                            <img
                                                className='h-full w-full object-cover'
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className='text-sm font-semibold text-white'>
                                            {product.name}
                                        </div>
                                    </div>
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-primary'>
                                    ₹{product.price.toFixed(2)}
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap text-sm text-slate-300 capitalize'>
                                    {product.category}
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <button
                                        onClick={() => toggleFeaturedProduct(product._id)}
                                        className={`p-2 rounded-lg transition-all duration-200 ${
                                            product.isFeatured
                                                ? "bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 border border-yellow-400/30"
                                                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent"
                                        }`}
                                        title={product.isFeatured ? "Remove from Featured" : "Mark as Featured"}
                                    >
                                        {/* If it is featured, the star gets filled in! */}
                                        <Star className={`h-5 w-5 ${product.isFeatured ? "fill-current" : ""}`} />
                                    </button>
                                </td>

                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2'>
                                    {/* Upgraded Action Buttons with icons instead of plain text */}
                                    <button
                                        onClick={() => onEdit(product)}
                                        className='p-2 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary-dark border border-primary/20 rounded-lg transition-all duration-200'
                                        title="Edit Product"
                                    >
                                        <Edit className="h-5 w-5" />
                                    </button>

                                    <button
                                        onClick={() => deleteProduct(product._id)}
                                        className='p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20 rounded-lg transition-all duration-200'
                                        title="Delete Product"
                                    >
                                        <Trash className='h-5 w-5' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default ProductsList;