const FOOTER_COLUMNS = [
  { title: "Shop", links: ["Rings", "Earrings", "Necklaces", "Bracelets"] },
  { title: "Maison", links: ["Our Story", "Atelier", "Sustainability", "Boutiques"] },
  { title: "Care", links: ["Contact", "Shipping", "Ring Sizing", "Lifetime Care"] },
];

export default function Footer({ onLinkClick }) {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">Aurelle<small>​FINE JEWELRY · EST. 2026</small></div>
            <p>Timeless stainless steel & gold-plated jewelry crafted for everyday shine.</p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#shop" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (onLinkClick) onLinkClick(link);
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} Maison Aurelle. All rights reserved.</span>
          <nav className="footer-legal" aria-label="Legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}