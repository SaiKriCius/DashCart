import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard"; // IMPORTING our upgraded component!

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  const startX = useRef(0);
  const lastX = useRef(0);
  const startTime = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setIsMobile(true);
        setItemsPerPage(2);
      } else {
        setIsMobile(false);
        if (width < 1024) setItemsPerPage(3);
        else if (width < 1280) setItemsPerPage(4);
        else setItemsPerPage(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerPage]);

  const nextSlide = (step = itemsPerPage) => {
    setCurrentIndex((prev) =>
      Math.min(prev + step, featuredProducts.length - itemsPerPage)
    );
  };

  const prevSlide = (step = itemsPerPage) => {
    setCurrentIndex((prev) => Math.max(prev - step, 0));
  };

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    lastX.current = startX.current;
    startTime.current = Date.now();
    isDragging.current = true;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    lastX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;

    const distance = startX.current - lastX.current;
    const duration = Date.now() - startTime.current;
    const velocity = Math.abs(distance / duration);

    let step = 1;
    if (velocity > 0.6) step = 2;
    if (velocity > 1) step = 3;

    if (distance > 50) nextSlide(step);
    else if (distance < -50) prevSlide(step);

    isDragging.current = false;
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  return (
    <div className="py-4"> {/* Reduced top padding since HomePage handles the spacing now */}
      <div className="container mx-auto px-4 relative group">
        
        {/* We removed the duplicate heading here since HomePage.jsx renders one right above it! */}

        <div className="relative">
          <div
            className="overflow-hidden py-4 -my-4" /* Added py-4 so the card hover shadows don't get cut off */
            onTouchStart={isMobile ? onTouchStart : undefined}
            onTouchMove={isMobile ? onTouchMove : undefined}
            onTouchEnd={isMobile ? onTouchEnd : undefined}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`,
              }}
            >
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className={`shrink-0 px-2 sm:px-3 ${
                    isMobile
                      ? "w-[50%]" // Adjusted to 50% so exactly 2 fit nicely on mobile
                      : "w-1/3 lg:w-1/4 xl:w-1/5"
                  }`}
                >
                  {/* Replaced 40 lines of code with our single, perfectly styled component! */}
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP NAVIGATION BUTTONS */}
          {!isMobile && (
            <>
              <button
                onClick={() => prevSlide()}
                disabled={isStartDisabled}
                className={`absolute top-1/2 -left-4 sm:-left-6 -translate-y-1/2 p-3 rounded-full transition-all duration-300 z-10 shadow-lg border ${
                  isStartDisabled
                    ? "bg-surface-hover border-white/5 text-slate-500 cursor-not-allowed opacity-50"
                    : "bg-slate-800 border-border-subtle text-text-main hover:bg-primary hover:border-primary hover:scale-110 shadow-black/50 opacity-0 group-hover:opacity-100"
                }`}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() => nextSlide()}
                disabled={isEndDisabled}
                className={`absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 p-3 rounded-full transition-all duration-300 z-10 shadow-lg border ${
                  isEndDisabled
                    ? "bg-surface-hover border-white/5 text-slate-500 cursor-not-allowed opacity-50"
                    : "bg-slate-800 border-border-subtle text-text-main hover:bg-primary hover:border-primary hover:scale-110 shadow-black/50 opacity-0 group-hover:opacity-100"
                }`}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;