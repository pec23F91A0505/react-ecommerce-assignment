import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetails({ onAddToCart }) {
const { id } = useParams();

const [product, setProduct] = useState(null);
const [quantity, setQuantity] = useState(1);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
async function fetchProduct() {
try {
setLoading(true);
setError("");

    const response = await fetch(
      `http://localhost:5000/product/${id}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Product not found.");
      }
      throw new Error("Failed to load product.");
    }

    const data = await response.json();
    const productData = data.product || data.data || data;

    setProduct({
      ...productData,
      id: productData._id || productData.id,
    });
  } catch (err) {
    setError(err.message || "Unable to load product.");
  } finally {
    setLoading(false);
  }
}

fetchProduct();

}, [id]);

if (loading) {
return <h2>Loading product details...</h2>;
}

if (error || !product) {
return (
<div>
<h1>Product Not Found</h1>
<p>{error || "The product you are looking for does not exist."}</p>
<Link to="/products">Back to Products</Link>
</div>
);
}

return (
<div className="product-details">
<h1>{product.name}</h1>

  {product.image && (
    <img
      src={product.image}
      alt={product.name}
      style={{ maxWidth: "300px" }}
    />
  )}

  <h2>{product.name}</h2>
  <p>Price: ₹{product.price}</p>
  <p>Category: {product.category || "Not specified"}</p>
  <p>Description: {product.description || "No description available."}</p>

  <div>
    <span>Quantity: </span>

    <button
      onClick={() =>
        setQuantity((current) => Math.max(1, current - 1))
      }
    >
      -
    </button>

    <span style={{ margin: "0 15px" }}>{quantity}</span>

    <button onClick={() => setQuantity((current) => current + 1)}>
      +
    </button>
  </div>

  <br />

  <button onClick={() => onAddToCart(product, quantity)}>
    Add to Cart
  </button>

  <br />
  <br />

  <Link to="/products">Back to Products</Link>
</div>

);
}

export default ProductDetails;