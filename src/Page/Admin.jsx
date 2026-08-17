import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Dashboard";
import ProductDashborad from "./ProductDashborad";

export default function Admin() {
  return (
    <Routes>

      <Route
        path="dashboard"
        element={<Dashboard />}
      />

      <Route
        path="product"
        element={<ProductDashborad />}
      />

      {/* /admin → /admin/dashboard */}
      <Route
        path=""
        element={<Navigate to="dashboard" replace />}
      />

    </Routes>
  );
}