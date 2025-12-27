import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = ({ onEdit }) => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

	return (
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<table className='min-w-full divide-y divide-gray-700'>
				<thead className='bg-gray-700'>
					<tr>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>
							Product
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>
							Price
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>
							Category
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>
							Featured
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase'>
							Actions
						</th>
					</tr>
				</thead>

				<tbody className='bg-gray-800 divide-y divide-gray-700'>
					{products?.map((product) => (
						<tr key={product._id} className='hover:bg-gray-700'>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='flex items-center'>
									<img
										className='h-10 w-10 rounded-full object-cover'
										src={product.image}
										alt={product.name}
									/>
									<div className='ml-4 text-sm font-medium text-white'>
										{product.name}
									</div>
								</div>
							</td>

							<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
								₹{product.price.toFixed(2)}
							</td>

							<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
								{product.category}
							</td>

							<td className='px-6 py-4 whitespace-nowrap'>
								<button
									onClick={() => toggleFeaturedProduct(product._id)}
									className={`p-1 rounded-full ${
										product.isFeatured
											? "bg-yellow-400 text-gray-900"
											: "bg-gray-600 text-gray-300"
									}`}
								>
									<Star className='h-5 w-5' />
								</button>
							</td>

							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-3'>
								<button
									onClick={() => onEdit(product)}
									className='text-emerald-400 hover:text-emerald-300'
								>
									Edit
								</button>

								<button
									onClick={() => deleteProduct(product._id)}
									className='text-red-400 hover:text-red-300'
								>
									<Trash className='h-5 w-5' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</motion.div>
	);
};

export default ProductsList;
