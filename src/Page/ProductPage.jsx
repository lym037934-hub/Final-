import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import Navbar from "../components/Navbar";
import ProductToolbar from "../components/ProductToolbar";
import ProductCard from "../components/ProductCard";
import ProductDetailModal from "../components/ProductDetailModal";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // State controlled by ProductToolbar
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("newest");

  // Modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Product"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = async (product) => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const orderRef = doc(db, "Order", user.uid);

    const itemToAdd = {
      productId: product.id,
      product:
        product.product ||
        product.Product ||
        product.name ||
        "Untitled Product",
      category: product.category || product.Category || "",
      brand: product.brand || product.Brand || "",
      price: product.price ?? product.Price ?? 0,
      imageUrl: product.imageUrl || product.image || product.Image || "",
      quantity: 1,
      stock: product.stock ?? 10,
    };

    try {
      const docSnap = await getDoc(orderRef);

      if (docSnap.exists()) {
        const currentItems = docSnap.data().items || [];
        const existingIndex = currentItems.findIndex(
          (item) => item.productId === product.id
        );

        if (existingIndex > -1) {
          currentItems[existingIndex].quantity += 1;
          await updateDoc(orderRef, {
            items: currentItems,
            updatedAt: serverTimestamp(),
          });
        } else {
          await updateDoc(orderRef, {
            items: arrayUnion(itemToAdd),
            updatedAt: serverTimestamp(),
          });
        }
      } else {
        await setDoc(orderRef, {
          userId: user.uid,
          userEmail: user.email,
          status: "pending",
          items: [itemToAdd],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      alert("Added to cart!");
    } catch (error) {
      console.error("Error updating cart in Firestore:", error);
      alert("Failed to add item to cart.");
    }
  };

  // Filter & Sort logic based on Firestore document fields
  const filteredProducts = products
    .filter((product) => {
      const title = (
        product.product ||
        product.Product ||
        product.name ||
        ""
      ).toLowerCase();
      const brand = (product.brand || product.Brand || "").toLowerCase();
      const productCategory = product.category || product.Category || "";
      const query = search.trim().toLowerCase();

      // 1. Search filter: Matches product title or brand name
      const matchesSearch =
        query === "" || title.includes(query) || brand.includes(query);

      // 2. Category filter: Matches specific category or "All Categories"
      const matchesCategory =
        category === "All Categories" ||
        productCategory.toLowerCase() === category.toLowerCase();

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const priceA = a.price ?? a.Price ?? 0;
      const priceB = b.price ?? b.Price ?? 0;
      const nameA = (a.product || a.Product || a.name || "").toLowerCase();
      const nameB = (b.product || b.Product || b.name || "").toLowerCase();

      // 3. Sorting options
      if (sort === "price-asc") return priceA - priceB;
      if (sort === "price-desc") return priceB - priceA;
      if (sort === "name-asc") return nameA.localeCompare(nameB);
      if (sort === "name-desc") return nameB.localeCompare(nameA);
      if (sort === "newest") {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
        return dateB - dateA;
      }
      return 0;
    });

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Pass state and state setters as props into ProductToolbar */}
        <ProductToolbar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        {loading ? (
          <div className="text-center text-gray-400 py-12">
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No products found matching your search or category filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const imgUrl = product.imageUrl || product.image || product.Image;
              const title =
                product.product ||
                product.Product ||
                product.name ||
                product.title;
              const brand = product.brand || product.Brand;
              const category = product.category || product.Category;
              const rawPrice = product.price ?? product.Price;
              const rating = product.rating || product.Rating;

              return (
                <ProductCard
                  key={product.id}
                  image={imgUrl}
                  name={title}
                  brand={brand}
                  category={category}
                  price={rawPrice}
                  rating={rating}
                  onViewDetails={() => handleViewDetails(product)}
                  onAddToCart={() => handleAddToCart(product)}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductPage;