import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
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

				{/* LOGO */}
				<div className="flex justify-center sm:justify-between items-center">
					<Link
						to="/"
						className="text-3xl sm:text-2xl font-extrabold text-emerald-400 tracking-wide"
					>
						Dash-Cart
					</Link>

					{/* DESKTOP NAV */}
					<nav className="hidden sm:flex items-center gap-4">
						<Link to="/" className="text-gray-300 hover:text-emerald-400">
							Home
						</Link>

						{user && (
							<Link to="/cart" className="relative text-gray-300 hover:text-emerald-400">
								<ShoppingCart size={20} />
								{cart.length > 0 && (
									<span className="absolute -top-2 -right-2 bg-emerald-500 text-xs px-1.5 rounded-full">
										{cart.length}
									</span>
								)}
							</Link>
						)}

						{isAdmin && (
							<Link
								to="/secret-dashboard"
								className="bg-emerald-700 px-3 py-1 rounded-md flex items-center gap-1"
							>
								<Lock size={16} /> Dashboard
							</Link>
						)}

						{user ? (
							<button
								onClick={logout}
								className="bg-gray-700 px-3 py-1 rounded-md flex items-center gap-1"
							>
								<LogOut size={16} /> Logout
							</button>
						) : (
							<>
								<Link
									to="/signup"
									className="bg-emerald-600 px-3 py-1 rounded-md flex items-center gap-1"
								>
									<UserPlus size={16} /> Sign Up
								</Link>
								<Link
									to="/login"
									className="bg-gray-700 px-3 py-1 rounded-md flex items-center gap-1"
								>
									<LogIn size={16} /> Login
								</Link>
							</>
						)}
					</nav>
				</div>

				{/* MOBILE SECONDARY HOME */}
				<nav className="sm:hidden mt-2 text-center">
					<Link
						to="/"
						className="text-sm text-gray-400 hover:text-emerald-400"
					>
						Home
					</Link>
				</nav>

				{/* MOBILE ACTIONS */}
				<nav className="sm:hidden mt-3 flex justify-center gap-3">
					<Link
						to="/signup"
						className="bg-emerald-600 px-4 py-1.5 rounded-md"
					>
						Sign Up
					</Link>
					<Link
						to="/login"
						className="bg-gray-700 px-4 py-1.5 rounded-md"
					>
						Login
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
