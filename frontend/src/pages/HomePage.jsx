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
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="pt-5 sm:pt-5 pb-10 text-center px-4">        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-emerald-400">
          Explore Our Categories
        </h1>

        <p className="text-base sm:text-lg text-gray-300 mt-4 max-w-md mx-auto">
          Discover the latest trends in eco-friendly fashion
        </p>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {!isLoading && products.length > 0 && (
        <section className="pb-20">
          <FeaturedProducts featuredProducts={products} />
        </section>
      )}
    </div>
  );
};

export default HomePage;
