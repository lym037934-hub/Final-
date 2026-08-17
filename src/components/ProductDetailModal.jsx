import React, { useState, useEffect } from 'react';
import { Star, X, CheckCircle, XCircle } from 'lucide-react';

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  // Inline SVG fallback
  const fallbackImage =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='400' height='400' fill='%231f2937'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='20' font-family='sans-serif'>No Image Available</text></svg>";

  // Matches exact Firestore keys: imageUrl, product, brand, category, price, stock, status
  const rawImage = product.imageUrl || product.image || fallbackImage;
  const productName = product.product || product.Product || "Untitled Product";
  const category = product.category;
  const brand = product.brand || "Generic";
  const price = product.price;
  const stock = product.stock ?? 0;
  const status = product.status || (stock > 0 ? "In Stock" : "Out of Stock");
  const rating = product.rating;

  const [imgSrc, setImgSrc] = useState(rawImage);

  useEffect(() => {
    setImgSrc(rawImage);
  }, [product, rawImage]);

  const isAvailable = status.toString().toLowerCase() === "in stock" || stock > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white bg-gray-800/80 p-2 rounded-full backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative w-full md:w-1/2 aspect-square bg-gray-800">
          <img
            src={imgSrc}
            alt={productName}
            onError={() => {
              if (imgSrc !== fallbackImage) {
                setImgSrc(fallbackImage);
              }
            }}
            className="w-full h-full "
          />
          {category && (
            <span className="absolute top-3 left-3 bg-purple-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm uppercase">
              {category}
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            {/* Brand */}
            <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
              {brand}
            </span>

            {/* Product Title */}
            <h2 className="text-xl font-bold text-white mt-1 leading-snug">
              {productName}
            </h2>

            {/* Rating */}
            {rating && (
              <div className="flex items-center gap-1.5 mt-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-200 text-sm font-medium">{rating}</span>
              </div>
            )}

            {/* Price */}
            <div className="mt-3 text-2xl font-bold text-white">
              {typeof price === 'number' ? `$${price.toFixed(2)}` : (price || "$0.00")}
            </div>

            {/* Stock & Status Grid */}
            <div className="mt-5 pt-4 border-t border-gray-800 grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-800">
                <span className="text-gray-400 text-xs block">Stock Quantity</span>
                <span className="text-gray-100 font-semibold text-base mt-0.5 block">
                  {stock} units
                </span>
              </div>

              <div className="bg-gray-800/50 p-3 rounded-xl border border-gray-800">
                <span className="text-gray-400 text-xs block">Status</span>
                <div className="flex items-center gap-1.5 mt-1">
                  {isAvailable ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`font-semibold text-sm ${isAvailable ? 'text-emerald-400' : 'text-red-400'}`}>
                    {status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-800">
            <button
              onClick={onClose}
              className="flex-1 text-sm font-medium text-gray-300 border border-gray-700 rounded-xl py-2.5 hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
            <button
              disabled={!isAvailable}
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className={`flex-1 text-sm font-semibold text-white rounded-xl py-2.5 transition-colors shadow-lg ${
                isAvailable 
                  ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/30' 
                  : 'bg-gray-700 cursor-not-allowed opacity-50'
              }`}
            >
              {isAvailable ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailModal;