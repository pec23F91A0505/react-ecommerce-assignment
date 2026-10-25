
import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import products from "./data/products";
import "./App.css";

function App() {
  const [cartCount, setCartCount] = useState(0);

  function handleAddToCart(product) {
    setCartCount((count) => count + 1);
    alert(product.name + " added to cart!");
  }

  return (
    <div>
      <Navbar />
      <h1 className="page-title">Our Products</h1>

      <p className="cart-count">Cart Items: {cartCount}</p>

      <div className="product-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default App;