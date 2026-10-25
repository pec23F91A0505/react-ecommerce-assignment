
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <p>{product.description}</p>
      <button onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
