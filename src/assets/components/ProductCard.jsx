function ProductCard({ product, addToCart }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      width: "220px",
      textAlign: "center"
    }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", borderRadius: "6px" }}
      />

      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      <p style={{ color: product.inStock ? "green" : "red" }}>
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>

      <button
        disabled={!product.inStock}
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
