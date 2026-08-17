import React, { useState, useEffect } from "react";
import ProductTable from "../components/ProductTable";
import StatCard from "../components/StatCard";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal"; // 1. Import Edit Modal
import { Plus } from "lucide-react";

import { db } from "../firebase/firebase";
import { collection, addDoc, doc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";

const ProductLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 2. State for handling Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [stats, setStats] = useState({
    totalProducts: 0,
    inStockTotal: 0,
    lowStockCount: 0,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Product"),
      (snapshot) => {
        let totalCount = snapshot.docs.length;
        let totalUnits = 0;
        let lowStockCount = 0;

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const stockNum = Number(data.stock) || 0;

          totalUnits += stockNum;

          if (data.status === "Low Stock" || (stockNum > 0 && stockNum <= 5)) {
            lowStockCount += 1;
          }
        });

        setStats({
          totalProducts: totalCount,
          inStockTotal: totalUnits,
          lowStockCount: lowStockCount,
        });
      },
      (error) => {
        console.error("Error listening for product metrics: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAddProduct = async (productData) => {
    try {
      const docRef = await addDoc(collection(db, "Product"), {
        ...productData,
        createdAt: serverTimestamp(),
      });
      console.log("Document added with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding product to Firestore: ", error);
      throw error;
    }
  };

  // 3. Open Modal with clicked product details
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  // 4. Update product in Firestore
  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      const productRef = doc(db, "Product", productId);
      await updateDoc(productRef, {
        ...updatedData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating product in Firestore: ", error);
      throw error;
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </button>
      </div>

      <div className="grid w-full grid-cols-6 grid-rows-[auto_1fr] gap-4 min-h-[700px]">
        <div className="col-span-2 min-w-0">
          <StatCard
            label="Products"
            value={stats.totalProducts.toString()}
            accent="text-blue-600"
          />
        </div>

        <div className="col-span-2 min-w-0">
          <StatCard
            label="In Stock"
            value={stats.inStockTotal.toString()}
            accent="text-green-600"
          />
        </div>

        <div className="col-span-2 min-w-0">
          <StatCard
            label="Low stock"
            value={stats.lowStockCount.toString()}
            accent="text-purple-600"
          />
        </div>

        <div className="col-span-6 min-w-0 min-h-0">
          {/* 5. Pass handleEditClick to ProductTable */}
          <ProductTable onEdit={handleEditClick} />
        </div>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      {/* 6. Render Edit Modal */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onUpdateProduct={handleUpdateProduct}
      />
    </div>
  );
};

export default ProductLayout;