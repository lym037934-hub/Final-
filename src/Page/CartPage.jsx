import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { doc, onSnapshot, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch real-time cart data from the Order collection tied to user.uid
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const orderRef = doc(db, "Order", user.uid);

    const unsubscribe = onSnapshot(
      orderRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setCartItems(docSnap.data().items || []);
        } else {
          setCartItems([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching cart from Firestore:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Sync quantity changes to Firestore
  const updateQuantity = async (productId, delta) => {
    const user = auth.currentUser;
    if (!user) return;

    const orderRef = doc(db, "Order", user.uid);

    const updatedItems = cartItems.map((item) => {
      if (item.productId === productId) {
        const newQty = item.quantity + delta;
        const validQty = newQty > 0 && newQty <= item.stock ? newQty : item.quantity;
        return { ...item, quantity: validQty };
      }
      return item;
    });

    try {
      await updateDoc(orderRef, {
        items: updatedItems,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  // Sync item removals to Firestore
  const removeItem = async (productId) => {
    const user = auth.currentUser;
    if (!user) return;

    const orderRef = doc(db, "Order", user.uid);
    const updatedItems = cartItems.filter((item) => item.productId !== productId);

    try {
      await updateDoc(orderRef, {
        items: updatedItems,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Write ONLY total price and total item count to totals collection
  const handleCheckout = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setIsProcessing(true);

    try {
      await addDoc(collection(db, "totals"), {
        totalAmount: subtotal,
        totalItems: totalItemCount,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      // Clear the active cart in `Order` collection
      const orderRef = doc(db, "Order", user.uid);
      await updateDoc(orderRef, { items: [], updatedAt: serverTimestamp() });

      navigate("/");
    } catch (error) {
      console.error("Error saving total to totals collection:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-500 dark:text-gray-400 flex items-center justify-center">
        Loading cart...
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col items-center justify-center p-6 transition-colors duration-300">
        <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm text-center">
          Looks like you haven't added any products to your cart yet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/20 active:scale-95 flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 md:p-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-3 transition-colors group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to Home
            </button>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <ShoppingBag className="text-purple-600 dark:text-purple-400" /> Shopping Cart
            </h1>
          </div>
          
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 self-start sm:self-end">
            {totalItemCount} items selected
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 text-gray-400 text-xs uppercase tracking-wider">
                    <th className="p-4 sm:p-5">Product</th>
                    <th className="p-4 sm:p-5">Price</th>
                    <th className="p-4 sm:p-5 text-center">Quantity</th>
                    <th className="p-4 sm:p-5">Total</th>
                    <th className="p-4 sm:p-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {cartItems.map((item) => (
                    <tr key={item.productId} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="p-4 sm:p-5 flex items-center gap-4">
                        <img
                          src={item.imageUrl}
                          alt={item.product}
                          className="w-16 h-16 object-cover rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate max-w-[160px] sm:max-w-xs">
                            {item.product}
                          </h3>
                          <span className="inline-block mt-1 text-xs font-medium bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-md border border-purple-100 dark:border-purple-900/50">
                            {item.category}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 sm:p-5 font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </td>

                      <td className="p-4 sm:p-5">
                        <div className="flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-xl w-max mx-auto bg-gray-50 dark:bg-gray-950 p-1">
                          <button
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition rounded-lg hover:bg-white dark:hover:bg-gray-800 disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 font-semibold text-sm select-none">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, 1)}
                            className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition rounded-lg hover:bg-white dark:hover:bg-gray-800 disabled:opacity-30"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>

                      <td className="p-4 sm:p-5 font-bold text-purple-600 dark:text-purple-400 whitespace-nowrap">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>

                      <td className="p-4 sm:p-5 text-center">
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 h-fit shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Free</span>
              </div>
            </div>

            <div className="my-6 border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between items-center">
              <span className="text-base font-bold text-gray-900 dark:text-white">Total Amount</span>
              <span className="text-2xl font-black text-purple-600 dark:text-purple-400">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 disabled:bg-purple-400 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/25 active:scale-95"
            >
              {isProcessing ? "Processing..." : "Proceed to Checkout"} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}