import React from "react";

const RecentOrders = () => {
  const orders = [
    { id: "#1042", customer: "Sok Dara", status: "Paid", total: "$120" },
    { id: "#1041", customer: "Chan Lita", status: "Pending", total: "$85" },
    { id: "#1040", customer: "Vann Bora", status: "Paid", total: "$240" },
    { id: "#1039", customer: "Dara Kim", status: "Paid", total: "$180" },
    { id: "#1038", customer: "Vicheka Lim", status: "Pending", total: "$95" },
    { id: "#1037", customer: "Bora Vann", status: "Paid", total: "$320" },
    { id: "#1036", customer: "Lita Chan", status: "Paid", total: "$150" },
    { id: "#1035", customer: "Sokha Mean", status: "Pending", total: "$75" },
  ];

  return (
    <div className="w-full h-full min-h-0 bg-white dark:bg-neutral-800 border dark:border-neutral-700 rounded-lg p-4 flex flex-col">
      
      {/* Title */}
      <span className="font-semibold text-gray-800 dark:text-white mb-3 block">
        Recent Orders
      </span>

      {/* Scrollable Table */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <table className="w-full text-sm text-left">
          
          {/* Table Header */}
          <thead className="sticky top-0 bg-white dark:bg-neutral-800">
            <tr className="text-gray-500 dark:text-gray-400 border-b dark:border-neutral-700">
              <th className="py-2">Order</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Status</th>
              <th className="py-2">Total</th>
            </tr>
          </thead>

          {/* Orders */}
          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                className="border-b last:border-0 dark:border-neutral-700 text-gray-700 dark:text-gray-300"
              >
                <td className="py-2">{o.id}</td>
                <td className="py-2">{o.customer}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      o.status === "Paid"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="py-2">{o.total}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default RecentOrders;