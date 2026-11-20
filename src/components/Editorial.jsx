const STATS = [
  { value: "100", label: "Years of craft" },
  { value: "42", label: "Master artisans" },
  { value: "60h", label: "Per high piece" },
];

export default function Editorial() {
  return (
    <section className="section editorial" id="atelier" aria-labelledby="atelier-title">
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">The Atelier</span>
          <blockquote id="atelier-title">
            &ldquo;We do not make jewelry for a season. We make it for a lifetime — and the one
            after.&rdquo;
          </blockquote>
        </div>

        <div className="reveal">
          <p>
            For a century, four generations of artisans have shaped every Aurelle piece by hand on
            Rue de la Paix. Visit us for a private consultation, or begin a bespoke commission from
            anywhere in the world.
          </p>
          <a href="#" className="btn">Begin a commission</a>
          <div className="stats">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
