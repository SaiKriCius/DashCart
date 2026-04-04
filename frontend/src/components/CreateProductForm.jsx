import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, Edit, Image as ImageIcon } from "lucide-react";
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
                image: editingProduct.image || "", // Brought over the existing image if editing!
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
            className='bg-surface backdrop-blur-xl shadow-2xl rounded-2xl border border-border-subtle p-6 sm:p-8 mb-8 max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className='text-2xl sm:text-3xl font-bold mb-8 text-text-main flex items-center gap-3'>
                {editingProduct ? (
                    <>
                        <Edit className="text-primary h-8 w-8" /> 
                        Edit Product
                    </>
                ) : (
                    <>
                        <PlusCircle className="text-primary h-8 w-8" /> 
                        Create New Product
                    </>
                )}
            </h2>

            <form onSubmit={handleSubmit} className='space-y-6'>
                {/* PRODUCT NAME */}
                <div>
                    <label className='block text-sm font-medium text-slate-300 mb-1.5'>
                        Product Name
                    </label>
                    <input
                        type='text'
                        value={newProduct.name}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        className='block w-full bg-surface-hover border border-border-subtle rounded-lg py-2.5 px-4 text-text-main placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200'
                        placeholder="e.g., Vintage Denim Jacket"
                        required
                    />
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label className='block text-sm font-medium text-slate-300 mb-1.5'>
                        Description
                    </label>
                    <textarea
                        rows='4'
                        value={newProduct.description}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, description: e.target.value })
                        }
                        className='block w-full bg-surface-hover border border-border-subtle rounded-lg py-2.5 px-4 text-text-main placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none'
                        placeholder="Describe the product details..."
                        required
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* PRICE */}
                    <div>
                        <label className='block text-sm font-medium text-slate-300 mb-1.5'>
                            Price (₹)
                        </label>
                        <input
                            type='number'
                            step='0.01'
                            value={newProduct.price}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, price: e.target.value })
                            }
                            className='block w-full bg-surface-hover border border-border-subtle rounded-lg py-2.5 px-4 text-text-main placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200'
                            placeholder="0.00"
                            required
                        />
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <label className='block text-sm font-medium text-slate-300 mb-1.5'>
                            Category
                        </label>
                        <select
                            value={newProduct.category}
                            onChange={(e) =>
                                setNewProduct({ ...newProduct, category: e.target.value })
                            }
                            className='block w-full bg-surface-hover border border-border-subtle rounded-lg py-3 px-4 text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 appearance-none'
                            required
                        >
                            <option value='' className="bg-slate-800">Select a category</option>
                            {categories.map((category) => (
                                <option key={category} value={category} className="bg-slate-800 capitalize">
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* IMAGE UPLOAD (Fixed UX & Styled as Dropzone) */}
                <div>
                    <label className='block text-sm font-medium text-slate-300 mb-1.5'>
                        Product Image
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border-subtle border-dashed rounded-xl hover:border-primary/50 transition-colors bg-surface-hover relative group">
                        <div className="space-y-1 text-center">
                            <ImageIcon className="mx-auto h-12 w-12 text-text-muted group-hover:text-primary transition-colors" />
                            <div className="flex text-sm text-text-muted justify-center">
                                {/* FIXED THE BUG HERE: Added id to input and htmlFor to label */}
                                <label
                                    htmlFor="image-upload"
                                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        id="image-upload"
                                        type='file'
                                        className='sr-only'
                                        accept='image/*'
                                        onChange={handleImageChange}
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-slate-500">PNG, JPG, WEBP up to 5MB</p>
                        </div>
                    </div>

                    {/* IMAGE PREVIEW UI */}
                    {newProduct.image && (
                        <div className="mt-4 flex items-center gap-4 bg-surface-hover p-3 rounded-lg border border-border-subtle">
                            <img 
                                src={newProduct.image} 
                                alt="Preview" 
                                className="h-16 w-16 object-cover rounded-md border border-white/20" 
                            />
                            <div className="flex flex-col">
                                <span className="text-sm text-primary font-bold">Image Ready</span>
                                <span className="text-xs text-text-muted">Attached to product</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type='submit'
                    disabled={loading}
                    className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg shadow-primary/20 text-sm font-bold text-text-main bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-primary transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4'
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