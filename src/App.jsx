import React, { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Values from "./components/Values.jsx";
import Featured from "./components/Featured.jsx";
import Editorial from "./components/Editorial.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import ProductDetailView from "./components/ProductDetailView.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";

export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("aurelle_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [toast, setToast] = useState({ message: "", visible: false });
  const toastTimer = useRef();

  useEffect(() => {
    localStorage.setItem("aurelle_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setToast((current) => ({ ...current, visible: false })),
      2200
    );
  }, []);

  const handleAddToCart = useCallback(
    (product) => {
      setCartItems((prevItems) => [...prevItems, product]);
      showToast(`${product.name} added to bag`);
    },
    [showToast]
  );

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
  };

  const handleOpenCheckout = () => {
    if (cartItems.length === 0) {
      showToast("Your shopping bag is empty");
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    setIsCheckoutOpen(false);
    showToast("Order placed successfully!");
  };

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selectedProduct, allProducts]);

  return (
    <>
      <Navbar
        bagCount={cartItems.length}
        onBagClick={() => setIsCartOpen(true)}
      />

      <main>
        {selectedProduct ? (
          <ProductDetailView
            product={selectedProduct}
            allProducts={allProducts}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onSelectProduct={(product) => setSelectedProduct(product)}
          />
        ) : (
          <>
            <Hero />
            <Values />
            <Featured 
              products={allProducts}
              loading={allProducts.length === 0}
              onAddToCart={handleAddToCart} 
              onNotify={showToast}
              onProductClick={(product) => setSelectedProduct(product)}
            />
            <Editorial />
            <Newsletter />
          </>
        )}
      </main>

      <Footer 
        onLinkClick={(linkName) => {
          setSelectedProduct(null);
          window.scrollTo({ top: 600, behavior: 'smooth' });
        }} 
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleOpenCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      <div className={`toast${toast.visible ? " show" : ""}`} role="status" aria-live="polite">
        {toast.message}
      </div>
    </>
  );
}