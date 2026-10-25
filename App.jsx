
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [cartCount, setCartCount] = useState(0);

  function handleAddToCart(product, quantity = 1) {
    setCartCount((count) => count + quantity);
    alert(product.name + " added to cart!");
  }

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={
            <Products
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/products"
          element={
            <Products
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProductDetails
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={<h1>Shopping Cart</h1>}
        />
        <Route path="/login" 
        element={<Login />}
         />
        <Route path="/register"
         element={<Register />} 
         />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
