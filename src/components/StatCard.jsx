import React from "react";

const StatCard = ({ label, value, accent }) => (
  <div className="bg-white dark:bg-neutral-800 border dark:border-neutral-700 rounded-lg p-4 flex flex-col gap-1 w-full h-full">
    <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    <span className={`text-2xl font-bold ${accent}`}>{value}</span>
  </div>
);

export default StatCard;