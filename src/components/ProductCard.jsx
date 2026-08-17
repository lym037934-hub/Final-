import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const ProductCard = ({
  id,
  image,
  name,
  brand,
  category,
  price,
  rating,
  stock,
  onViewDetails,
  onAddToCart,
}) => {
  const fallbackImage =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%231f2937'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='20' font-family='sans-serif'>No Image Available</text></svg>";

  const [imgSrc, setImgSrc] = useState(image || fallbackImage);

  useEffect(() => {
    setImgSrc(image || fallbackImage);
  }, [image]);

  return (
    <div className="group h-full flex flex-col bg-gray-900 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
      
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-800">
        <img
          src={imgSrc}
          alt={name || "Product image"}
          onError={() => {
            if (imgSrc !== fallbackImage) {
              setImgSrc(fallbackImage);
            }
          }}
          className="w-full h-full transition-transform duration-300 group-hover:scale-105 "
        />
        {category && (
          <span className="absolute top-3 left-3 bg-purple-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm uppercase">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-gray-100 font-semibold text-base leading-snug line-clamp-2">
          {name || "Untitled Product"}
        </h3>
        <p className="text-gray-500 text-sm mt-1">{brand || "Generic"}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-gray-300 text-sm font-medium">{rating ?? "N/A"}</span>
        </div>

        {/* Price */}
        <p className="text-white text-xl font-bold mt-3">
          {typeof price === 'number' ? `$${price.toFixed(2)}` : (price || "$0.00")}
        </p>

        <div className="flex-1" />

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={onViewDetails}
            className="flex-1 text-sm font-medium text-gray-200 border border-gray-700 rounded-xl py-2.5 hover:bg-gray-800 hover:border-gray-600 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => onAddToCart({ id, name, brand, category, price, image, stock })}
            className="flex-1 text-sm font-semibold text-white bg-purple-600 rounded-xl py-2.5 hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20"
          >
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;