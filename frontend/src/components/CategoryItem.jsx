import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
    return (
        <div className="relative overflow-hidden h-40 sm:h-56 lg:h-80 w-full rounded-xl border border-white/10 group shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50">
            <Link to={"/category" + category.href} className="block w-full h-full focus:outline-none">
                <div className="w-full h-full cursor-pointer relative">
                    
                    {/* Improved Gradient Overlay: Darkens slightly on hover for better text contrast */}
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-900/90 opacity-70 z-10 transition-opacity duration-300 group-hover:opacity-90" />

                    <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* Text Container with slight slide-up animation */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                        <h3 className="text-white text-base sm:text-xl font-bold mb-1 tracking-wide">
                            {category.name}
                        </h3>
                        
                        {/* Replaced generic gray text with a branded, animated call to action */}
                        <p className="text-primary text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                            Explore Collection &rarr;
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CategoryItem;