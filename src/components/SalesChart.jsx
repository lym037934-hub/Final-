
import React from "react";

const SalesChart = () => (
  <div className="w-full h-full bg-white dark:bg-neutral-800 border dark:border-neutral-700 rounded-lg p-4 flex flex-col">
    <span className="font-semibold text-gray-800 dark:text-white mb-2">
      Sales Overview
    </span>

    <div className="flex-1 flex items-end gap-2 min-h-0">
      {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
        <div
          key={i}
          style={{ height: `${h}%` }}
          className="flex-1 bg-blue-400 dark:bg-blue-500 rounded-t-md"
        ></div>
      ))}
    </div>
  </div>
);

export default SalesChart;

