export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <span className="eyebrow">Aurelle Signature Collection</span>
        <h1 id="hero-title">
          Radiance, captured
          <br />
          in <em>gold.</em>
        </h1>
        <p>
          Exquisitely crafted to elevate your everyday elegance. Each piece from Aurelle blends modern luxury with timeless sparkle, designed to make you shine on every occasion.
        </p>
        <div className="cta-row">
          <a href="#featured" className="btn btn-primary">Discover the collection</a>
          <a href="#atelier" className="btn btn-ghost">Explore our story</a>
        </div>
      </div>

      <div className="hero-media">
        <img
          src="/photos/hero.jpg"
          alt="Aurelle luxury jewelry collection showcased elegantly on warm silk"
          fetchPriority="high"
        />
        <div className="hero-tag">
          <div className="serif">Aurelle Signature Piece</div>
          <span>Gold-plated & Pavé Crystals</span>
        </div>
      </div>
    </section>
  );
}