import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CategoryItem = ({ category }) => {
    return (
        <div className="group rounded-2xl border border-border-subtle overflow-hidden bg-bg-surface shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50 flex flex-col h-full">
            <Link to={"/category" + category.href} className="flex flex-col h-full focus:outline-none">
                
                {/* TOP HALF: IMAGE */}
                {/* We set a fixed height for the image area, and hide overflow so the zoom stays inside! */}
                <div className="relative w-full h-40 sm:h-56 lg:h-64 overflow-hidden shrink-0 bg-white/5">
                    {/* Subtle overlay that lightens slightly on hover to make the image pop */}
                    <div className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-300 group-hover:opacity-0" />
                    
                    <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                    />
                </div>

                {/* BOTTOM HALF: TEXT PANEL */}
                <div className="p-4 sm:p-5 grow flex flex-col justify-between border-t border-border-subtle bg-bg-surface transition-colors duration-300 group-hover:bg-surface-hover">
                    <h3 className="text-text-main text-lg sm:text-xl font-bold tracking-wide transition-colors">
                        {category.name}
                    </h3>
                    
                    {/* Animated Call to Action */}
                    <div className="mt-3 flex items-center gap-2 text-primary text-sm font-semibold opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Explore Collection</span>
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </div>

            </Link>
        </div>
    );
};

export default CategoryItem;