import { ShoppingCart, LogIn, UserPlus, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900/95 backdrop-blur-md z-40 border-b border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* MOBILE NAVBAR */}
        <div className="flex items-center justify-between sm:hidden">
          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-emerald-400 tracking-wide"
          >
            Dash-Cart
          </Link>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="text-emerald-400"
                title="Dashboard"
              >
                <Lock size={20} />
              </Link>
            )}

            {user ? (
              <>
                <Link to="/cart" className="relative text-gray-300">
                  <ShoppingCart size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-xs px-1.5 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </Link>

                <button
                  onClick={logout}
                  className="text-gray-300"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-gray-300 text-xs"
                >
                  <LogIn size={16} />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-1 bg-emerald-600 px-2.5 py-1 rounded-md text-xs"
                >
                  <UserPlus size={16} />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* DESKTOP NAVBAR */}
        <div className="hidden sm:flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-extrabold text-emerald-400 tracking-wide"
          >
            Dash-Cart
          </Link>

          <nav className="flex items-center gap-4">
            <Link to="/" className="text-gray-300 hover:text-emerald-400">
              Home
            </Link>

            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="bg-emerald-700 px-3 py-1 rounded-md flex items-center gap-1"
              >
                <Lock size={16} /> Dashboard
              </Link>
            )}

            {user ? (
              <>
                <Link to="/cart" className="relative text-gray-300">
                  <ShoppingCart size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-xs px-1.5 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </Link>

                <button
                  onClick={logout}
                  className="bg-gray-700 px-3 py-1 rounded-md flex items-center gap-1"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gray-700 px-3 py-1 rounded-md flex items-center gap-1"
                >
                  <LogIn size={16} /> Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-emerald-600 px-3 py-1 rounded-md flex items-center gap-1"
                >
                  <UserPlus size={16} /> Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
