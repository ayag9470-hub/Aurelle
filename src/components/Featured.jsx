import { useState } from "react";
import productsData from "../../products.json";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Rings", value: "rings" },
  { label: "Earrings", value: "earrings" },
  { label: "Bracelets", value: "bracelets" },
  { label: "Necklaces", value: "necklaces" },
];

const egp = new Intl.NumberFormat("en-EG", {
  style: "currency",
  currency: "EGP",
  maximumFractionDigits: 0,
});

export default function Featured({ onAddToCart, onNotify, onProductClick }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [wishlist, setWishlist] = useState(() => new Set());

  const products = productsData;

  const toggleWish = (product) => {
    const isSaved = wishlist.has(product.id);
    setWishlist((prev) => {
      const next = new Set(prev);
      if (isSaved) next.delete(product.id);
      else next.add(product.id);
      return next;
    });
    onNotify?.(isSaved ? "Removed from wishlist" : "Saved to wishlist");
  };

  return (
    <section className="section" id="featured" aria-labelledby="featured-title">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">Featured Pieces</span>
            <h2 id="featured-title" className="serif">
              Quietly <em>extraordinary</em>
            </h2>
          </div>
          <a href="#" className="link-arrow">View all jewelry &rarr;</a>
        </div>

        {/* فلاتر الأقسام الاحترافية */}
        <div className="filters reveal" role="group" aria-label="Filter by category">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={`chip ${activeFilter === filter.value ? "active" : ""}`}
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid">
          {products.map((product, index) => {
            const isSaved = wishlist.has(product.id);
            const productCategory = (product.category || "").toLowerCase();
            const isHidden = activeFilter !== "all" && productCategory !== activeFilter;

            if (isHidden) return null;

            return (
              <article
                key={product.id}
                className="card reveal"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="card-media">
                  <img 
                    src={product.image || product.img} 
                    alt={product.alt || product.name} 
                    loading="lazy" 
                    onClick={() => onProductClick?.(product)}
                    style={{ cursor: 'pointer' }}
                  />
                  {product.badge && <span className="badge">{product.badge}</span>}
                  <button
                    type="button"
                    className="wish"
                    aria-pressed={isSaved}
                    aria-label={`${isSaved ? "Remove" : "Add"} ${product.name}`}
                    onClick={() => toggleWish(product)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="quick-add"
                    onClick={() => onAddToCart(product)}
                  >
                    Add to bag
                  </button>
                </div>
                <div className="card-info">
                  <div>
                    <h3 
                      onClick={() => onProductClick?.(product)}
                      style={{ cursor: 'pointer' }}
                    >
                      {product.name}
                    </h3>
                    <p>{product.description || product.detail}</p>
                  </div>
                  <span className="price">
                    {typeof product.price === "number" ? egp.format(product.price) : product.price}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}