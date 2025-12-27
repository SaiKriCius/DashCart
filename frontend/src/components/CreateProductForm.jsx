import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, Edit } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
	"jeans",
	"t-shirts",
	"shoes",
	"glasses",
	"jackets",
	"suits",
	"bags",
	"cosmetics",
	"artificial jewellery",
];

const CreateProductForm = ({ editingProduct, clearEdit }) => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

	const { createProduct, updateProduct, loading } = useProductStore();

	// ✅ Prefill form when editing
	useEffect(() => {
		if (editingProduct) {
			setNewProduct({
				name: editingProduct.name,
				description: editingProduct.description,
				price: editingProduct.price,
				category: editingProduct.category,
				image: "",
			});
		}
	}, [editingProduct]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (editingProduct) {
			await updateProduct(editingProduct._id, newProduct);
			clearEdit();
		} else {
			await createProduct(newProduct);
		}

		setNewProduct({
			name: "",
			description: "",
			price: "",
			category: "",
			image: "",
		});
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => {
			setNewProduct((prev) => ({ ...prev, image: reader.result }));
		};
		reader.readAsDataURL(file);
	};

	return (
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='text-2xl font-semibold mb-6 text-emerald-300'>
				{editingProduct ? "Edit Product" : "Create New Product"}
			</h2>

			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-gray-300'>
						Product Name
					</label>
					<input
						type='text'
						value={newProduct.name}
						onChange={(e) =>
							setNewProduct({ ...newProduct, name: e.target.value })
						}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white'
						required
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-300'>
						Description
					</label>
					<textarea
						rows='3'
						value={newProduct.description}
						onChange={(e) =>
							setNewProduct({ ...newProduct, description: e.target.value })
						}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white'
						required
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-300'>
						Price
					</label>
					<input
						type='number'
						step='0.01'
						value={newProduct.price}
						onChange={(e) =>
							setNewProduct({ ...newProduct, price: e.target.value })
						}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white'
						required
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-300'>
						Category
					</label>
					<select
						value={newProduct.category}
						onChange={(e) =>
							setNewProduct({ ...newProduct, category: e.target.value })
						}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white'
						required
					>
						<option value=''>Select a category</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				<div className='flex items-center'>
					<input
						type='file'
						className='sr-only'
						accept='image/*'
						onChange={handleImageChange}
					/>
					<label className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md text-sm text-gray-300'>
						<Upload className='inline-block mr-2 h-5 w-5' />
						Upload Image
					</label>
					{newProduct.image && (
						<span className='ml-3 text-sm text-gray-400'>Image ready</span>
					)}
				</div>

				<button
					type='submit'
					disabled={loading}
					className='w-full flex justify-center py-2 px-4 rounded-md text-white bg-emerald-600 hover:bg-emerald-700'
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' />
							Processing...
						</>
					) : editingProduct ? (
						<>
							<Edit className='mr-2 h-5 w-5' />
							Update Product
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};

export default CreateProductForm;
