import products from "./product";
import ProductCard from "./ProductCard";

function ProductList({ addToCart }) {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {products.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
