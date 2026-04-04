import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

// Custom SVG Icons to replace the deprecated Lucide brand icons
const FacebookIcon = ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

const TwitterIcon = ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    </svg>
);

const InstagramIcon = ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
);

const Footer = () => {
    return (
        <footer className="bg-bg-surface border-t border-border-subtle mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 sm:px-6 lg:px-8">
                
                {/* TOP GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    
                    {/* Column 1: Brand & Contact */}
                    <div className="space-y-6">
                        <Link
                            to="/"
                            className="text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-primary to-primary-dark tracking-wide"
                        >
                            Dash-Cart
                        </Link>
                        <p className="text-text-muted text-sm leading-relaxed">
                            Elevating your everyday style with sustainable, premium fashion and accessories. Built for the modern world.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-text-muted text-sm hover:text-primary transition-colors cursor-pointer">
                                <MapPin size={16} className="text-primary shrink-0" />
                                <span>123 Commerce St, Tech City, 10010</span>
                            </div>
                            <div className="flex items-center gap-3 text-text-muted text-sm hover:text-primary transition-colors cursor-pointer">
                                <Phone size={16} className="text-primary shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3 text-text-muted text-sm hover:text-primary transition-colors cursor-pointer">
                                <Mail size={16} className="text-primary shrink-0" />
                                <span>support@dashcart.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-text-main font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-text-muted text-sm hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity" />Home</Link></li>
                            <li><Link to="/cart" className="text-text-muted text-sm hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity" />Shopping Cart</Link></li>
                            <li><Link to="/login" className="text-text-muted text-sm hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity" />Sign In</Link></li>
                            <li><Link to="/signup" className="text-text-muted text-sm hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity" />Create Account</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Service */}
                    <div>
                        <h3 className="text-text-main font-bold text-lg mb-6">Customer Service</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-text-muted text-sm hover:text-primary transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="text-text-muted text-sm hover:text-primary transition-colors">Track Your Order</a></li>
                            <li><a href="#" className="text-text-muted text-sm hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-text-muted text-sm hover:text-primary transition-colors">Terms & Conditions</a></li>
                            <li><a href="#" className="text-text-muted text-sm hover:text-primary transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter & Socials */}
                    <div>
                        <h3 className="text-text-main font-bold text-lg mb-6">Stay in the Loop</h3>
                        <p className="text-text-muted text-sm mb-4">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                        <form className="mb-6 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-surface-hover border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                            />
                            <button
                                type="submit"
                                className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-lg shadow-primary/20 shrink-0"
                            >
                                Subscribe
                            </button>
                        </form>

                        {/* Social Icons (Using our custom SVGs!) */}
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 bg-surface-hover border border-border-subtle rounded-lg text-text-muted hover:text-primary hover:border-primary/30 transition-all hover:-translate-y-1">
                                <FacebookIcon size={18} />
                            </a>
                            <a href="#" className="p-2 bg-surface-hover border border-border-subtle rounded-lg text-text-muted hover:text-primary hover:border-primary/30 transition-all hover:-translate-y-1">
                                <TwitterIcon size={18} />
                            </a>
                            <a href="#" className="p-2 bg-surface-hover border border-border-subtle rounded-lg text-text-muted hover:text-primary hover:border-primary/30 transition-all hover:-translate-y-1">
                                <InstagramIcon size={18} />
                            </a>
                            <a href="#" className="p-2 bg-surface-hover border border-border-subtle rounded-lg text-text-muted hover:text-primary hover:border-primary/30 transition-all hover:-translate-y-1">
                                <YoutubeIcon size={18} />
                            </a>
                        </div>
                    </div>

                </div>

                {/* BOTTOM COPYRIGHT BAR */}
                <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-text-muted text-sm text-center md:text-left">
                        &copy; {new Date().getFullYear()} Dash-Cart. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-text-muted text-sm">
                        <span>Secured by Stripe</span>
                        <span className="w-1 h-1 bg-border-subtle rounded-full" />
                        <span>Fast Global Shipping</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;