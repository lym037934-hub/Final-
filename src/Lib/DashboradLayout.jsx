import React, { useEffect, useState } from "react";
import { collection, getDocs, getAggregateFromServer, sum, count } from "firebase/firestore";
import { db } from "../firebase/firebase";

import SalesChart from "../components/SalesChart";
import RecentOrders from "../components/RecentOrders";
import TopProducts from "../components/TopProducts";
import StatCard from "../components/StatCard";

const DashboardLayout = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        // 1. Fetch Users Count
        const usersColl = collection(db, "users");
        const usersSnapshot = await getAggregateFromServer(usersColl, {
          totalUsers: count(),
        });
        setCustomerCount(usersSnapshot.data().totalUsers);

        // 2. Fetch Orders & Revenue from totals collection
        const totalsColl = collection(db, "totals");
        const totalsSnapshot = await getAggregateFromServer(totalsColl, {
          orderCount: count(),
          revenueSum: sum("totalAmount"),
          // Optional: sum("totalItems") if you want total quantity of items sold instead
        });

        setTotalOrders(totalsSnapshot.data().orderCount || 0);
        setTotalRevenue(totalsSnapshot.data().revenueSum || 0);
      } catch (error) {
        console.error("Error fetching metrics from Firestore: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardMetrics();
  }, []);

  return (
    <div className="grid w-full min-h-[800px] grid-cols-6 grid-rows-9 gap-2">

      {/* 1 - Revenue */}
      <div className="col-span-2 row-span-3 min-w-0">
        <StatCard 
          label="Revenue" 
          value={loading ? "..." : `$${totalRevenue.toLocaleString()}`} 
          accent="text-blue-600" 
        />
      </div>

      {/* 2 - Orders */}
      <div className="col-span-2 row-span-3 min-w-0">
        <StatCard 
          label="Orders" 
          value={loading ? "..." : totalOrders.toString()} 
          accent="text-green-600" 
        />
      </div>

      {/* 5 - Customers */}
      <div className="col-span-2 row-span-3 min-w-0">
        <StatCard 
          label="Customers" 
          value={loading ? "..." : customerCount.toString()} 
          accent="text-purple-600" 
        />
      </div>

      {/* 4 - Sales Chart */}
      <div className="col-span-4 row-span-5 min-w-0 min-h-0">
        <SalesChart />
      </div>

      {/* 3 - Right Side */}
      <div className="col-span-2 row-span-5 min-w-0 min-h-0">
        <div className="w-full h-full rounded-lg flex items-center justify-center text-white border-red-500">
          <TopProducts />
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;