import { useState, useEffect } from "react";
import { usePosterImages } from "../Hook/usePosterImages";

function PosterCarousel() {
  const { images, loading, error } = usePosterImages();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) {
    return (
      <div className="w-full h-full animate-pulse bg-gray-300 rounded-lg" />
    );
  }

  if (error || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500 bg-gray-100 rounded-lg">
        No posters available
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Poster ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <button
        onClick={() => setCurrent((current - 1 + images.length) % images.length)}
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition text-sm sm:text-base"
      >
        ‹
      </button>
      <button
        onClick={() => setCurrent((current + 1) % images.length)}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition text-sm sm:text-base"
      >
        ›
      </button>

      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default PosterCarousel;