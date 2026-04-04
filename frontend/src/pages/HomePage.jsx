import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
  { href: "/cosmetics", name: "Cosmetics", imageUrl: "/cosmetics.png" },
  {
    href: "/artificial jewellery",
    name: "Artificial Jewellery",
    imageUrl: "/artificial jewellery.png",
  },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-text-main overflow-hidden">
      
      {/* HERO SECTION - Upgraded for a premium feel */}
      <section className="pt-12 sm:pt-20 pb-12 text-center px-4 max-w-4xl mx-auto">        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
          Explore Our{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-indigo-400">
            Categories
          </span>
        </h1>

        <p className="text-base sm:text-lg text-text-muted mt-6 max-w-2xl mx-auto leading-relaxed">
          Discover the latest trends in eco-friendly fashion. High-quality materials, curated just for you.
        </p>
      </section>

      {/* CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {!isLoading && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="flex flex-col gap-8">
            {/* Added a subtle section header for better visual hierarchy */}
            <h2 className="text-3xl font-bold text-center">
              Featured <span className="text-primary">Products</span>
            </h2>
            <FeaturedProducts featuredProducts={products} />
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;