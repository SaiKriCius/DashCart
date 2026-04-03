import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

function App() {
    const { user, checkAuth, checkingAuth } = useUserStore();
    const { getCartItems } = useCartStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (!user) return;
        getCartItems();
    }, [getCartItems, user]);

    if (checkingAuth) return <LoadingSpinner />;

    return (
        <div className="min-h-screen relative selection:bg-primary selection:text-white">
            {/* Background gradient (using our new CSS variables) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[80vh]" 
                    style={{
                        background: 'radial-gradient(ellipse at top, var(--color-glow-start) 0%, var(--color-glow-mid) 45%, transparent 100%)'
                    }}
                />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 pt-20 flex flex-col min-h-screen">
                <Navbar />
                
                {/* Main content wrapper to ensure consistent spacing */}
                <main className="grow container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
                        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
                        <Route
                            path="/secret-dashboard"
                            element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />}
                        />
                        <Route path="/category/:category" element={<CategoryPage />} />
                        <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
                        <Route
                            path="/purchase-success"
                            element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/purchase-cancel"
                            element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
                        />
                    </Routes>
                </main>
            </div>

            <Toaster position="bottom-right" />
        </div>
    );
}

export default App;