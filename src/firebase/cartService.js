import { db, auth } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";

export const handleAddToCart = async (productData) => {
  const user = auth.currentUser;

  if (!user) {
    alert("Please log in to add items to your cart.");
    return;
  }

  // Reference to the order document matching the logged-in user's UID
  const orderRef = doc(db, "Orders", user.uid);

  // Construct item format based on your Product document structure
  const itemToAdd = {
    productId: productData.id,
    product: productData.name,
    category: productData.category || "",
    brand: productData.brand || "",
    price: productData.price,
    imageUrl: productData.image || "",
    quantity: 1,
    stock: productData.stock || 10,
  };

  try {
    const docSnap = await getDoc(orderRef);

    if (docSnap.exists()) {
      // If order document exists, update items array or append new item
      const currentItems = docSnap.data().items || [];
      const existingItemIndex = currentItems.findIndex(
        (item) => item.productId === productData.id
      );

      if (existingItemIndex > -1) {
        // Increment quantity if item already in cart
        currentItems[existingItemIndex].quantity += 1;
        await updateDoc(orderRef, {
          items: currentItems,
          updatedAt: serverTimestamp(),
        });
      } else {
        // Append new item to the items array
        await updateDoc(orderRef, {
          items: arrayUnion(itemToAdd),
          updatedAt: serverTimestamp(),
        });
      }
    } else {
      // Create new document for the user under Orders collection
      await setDoc(orderRef, {
        userId: user.uid,
        userEmail: user.email,
        items: [itemToAdd],
        status: "pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    alert("Item added to cart successfully!");
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Failed to add item to cart.");
  }
};