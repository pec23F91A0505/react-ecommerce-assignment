import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Products({ onAddToCart }) {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
async function fetchProducts() {
try {
setLoading(true);
setError("");

    const response = await fetch("http://localhost:5000/product/list");

    if (!response.ok) {
      throw new Error("Failed to load products.");
    }

    const data = await response.json();

    // Support common backend response formats.
    const productList = Array.isArray(data)
      ? data
      : data.products || data.data || [];

    setProducts(productList);
  } catch (err) {
    setError(
      "Unable to load products. Please check that the backend is running."
    );
  } finally {
    setLoading(false);
  }
}

fetchProducts();

}, []);

if (loading) {
return <h2 className="page-title">Loading products...</h2>;
}

if (error) {
return <p className="error-message">{error}</p>;
}

if (products.length === 0) {
return <h2 className="page-title">No products available.</h2>;
}

return (
<div>
<h1 className="page-title">Our Products</h1>

  <div className="product-container">
    {products.map((product) => (
      <ProductCard
        key={product._id || product.id}
        product={{
          ...product,
          id: product._id || product.id,
        }}
        onAddToCart={onAddToCart}
      />
    ))}
  </div>
</div>

);
}

export default Products;