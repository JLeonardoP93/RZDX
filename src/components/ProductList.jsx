import ProductCard from "./ProductCard";

function ProductList ({ products, addToCart }) {
  return (
    <div className="product-list">
      <h2>Productos</h2>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default ProductList;
