import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
    { id: "create", label: "Create Product", icon: PlusCircle },
    { id: "products", label: "Products", icon: ShoppingBasket },
    { id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("create");
    const [editingProduct, setEditingProduct] = useState(null);

    const { fetchAllProducts } = useProductStore();

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    return (
        <div className='grow w-full py-8 sm:py-16'>
            <div className='relative z-10 container mx-auto px-4'>
                
                {/* Upgraded Gradient Title */}
                <motion.h1
                    className='text-3xl sm:text-4xl font-extrabold mb-10 text-center tracking-tight'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-indigo-400">
                        Admin Dashboard
                    </span>
                </motion.h1>

                {/* Premium Glassmorphism Tabs */}
                <div className='flex flex-wrap justify-center gap-3 mb-12'>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    if (tab.id !== "create") setEditingProduct(null);
                                }}
                                className={`flex items-center px-5 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm sm:text-base border ${
                                    isActive
                                        ? "bg-primary text-text-main border-primary shadow-lg shadow-primary/30 scale-105"
                                        : "bg-slate-900/50 text-text-muted border-border-subtle hover:bg-white/10 hover:text-text-main backdrop-blur-md"
                                }`}
                            >
                                <tab.icon className={`mr-2 h-5 w-5 ${isActive ? "animate-pulse" : ""}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content Area */}
                <motion.div
                    key={activeTab} // Adding the key here forces Framer Motion to animate when tabs switch!
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {activeTab === "create" && (
                        <CreateProductForm
                            editingProduct={editingProduct}
                            clearEdit={() => setEditingProduct(null)}
                        />
                    )}

                    {activeTab === "products" && (
                        <ProductsList
                            onEdit={(product) => {
                                setEditingProduct(product);
                                setActiveTab("create");
                            }}
                        />
                    )}

                    {activeTab === "analytics" && <AnalyticsTab />}
                </motion.div>
            </div>
        </div>
    );
};

export default AdminPage;