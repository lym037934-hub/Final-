import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { checkAdminStatus } from "./firebase/checkRole";
import Homepage from "./Page/Homepage";
import LoginPage from "./Page/LoginPage";
import RegisterPage from "./Page/RegisterPage";
import ProductPage from "./Page/ProductPage";
import ProfilePage from "./Page/ProfilePage";
import CartPage from "./Page/CartPage"; // 1. Import CartPage
import { AuthProvider } from "./Hook/AuthContext";
import Admin from "./Page/Admin";
import MyProfile from "./Page/MyProfile";

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await checkAdminStatus();
      } else {
        console.log("No user is currently logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <Routes>
        {/* Normal pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/cart" element={<CartPage />} /> {/* 2. Add Cart Route */}

        {/* Admin pages */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;