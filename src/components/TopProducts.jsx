import React from "react";

const TopProducts = () => {
  const products = [
    { name: "RTX 5070", sales: 128 },
    { name: "Ryzen 7 9700X", sales: 96 },
    { name: "32GB DDR5 RAM", sales: 74 },
    { name: "1TB NVMe SSD", sales: 61 },
  ];

  return (
    <div className="bg-white dark:bg-neutral-800 border dark:border-neutral-700 rounded-lg p-4 h-64 flex flex-col w-full h-full">
      <span className="font-semibold text-gray-800 dark:text-white mb-2">
        Top Products
      </span>
      <ul className="flex-1 flex flex-col gap-2 overflow-y-auto text-sm">
        {products.map((p) => (
          <li
            key={p.name}
            className="flex justify-between text-gray-600 dark:text-gray-300"
          >
            <span>{p.name}</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {p.sales} sold
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProducts;