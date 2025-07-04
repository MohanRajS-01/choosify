import React, { useState, useEffect } from "react";
import "./ProductRecommendations.css";

function ProductRecommendations() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all products initially
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (category) => {
    setLoading(true);
    try {
      let url = "https://fakestoreapi.com/products";
      if (category) {
        url = `https://fakestoreapi.com/products/category/${category}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (!query.trim()) {
      fetchProducts();
    } else {
      fetchProducts(query.trim().toLowerCase());
    }
  };

  return (
    <div className="products-page">
      <h2>🛍️ A great product sells itself</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by category (e.g., men's clothing, electronics)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <div className="product-card-content">
              <h4>{product.title}</h4>
              <p>${product.price}</p>
              <a
                href={`https://fakestoreapi.com/products/${product.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="details-link"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductRecommendations;
