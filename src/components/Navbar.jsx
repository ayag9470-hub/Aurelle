import React, { useEffect, useState } from "react";
import productsData from "../../products.json";

const NAV_LINKS = [
  { label: "Collections", href: "#featured" },
  { label: "High Jewelry", href: "#featured" },
  { label: "Bridal", href: "#atelier" },
  { label: "Atelier", href: "#atelier" },
];

export default function Navbar({ bagCount = 0, onBagClick, onSelectProduct }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (bagCount === 0) return;
    setBump(true);
    const timer = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(timer);
  }, [bagCount]);

  const closeMenu = () => setMenuOpen(false);
  const bagLabel = `Shopping bag, ${bagCount} item${bagCount === 1 ? "" : "s"}`;

  // تصفية المنتجات بناءً على ما يكتبه المستخدم في البحث
  const filteredProducts = searchQuery.trim() === "" ? [] : productsData.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <div className="announce">
        Complimentary insured shipping &amp; lifetime care on every piece
      </div>

      <header style={{ position: 'relative' }}>
        <nav className="container nav" aria-label="Primary">
          <div>
            <button
              type="button"
              className="icon-btn menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-panel"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 7h18M3 12h18M3 17h18" />
              </svg>
              <span className="sr-only">Menu</span>
            </button>
            <ul className="nav-links">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <a href="#" className="logo" aria-label="Maison Aurelle home">
            Aurelle<small>​FINE JEWELRY · EST. 2026 </small>
          </a>

          <div className="nav-actions">
            <a href="#" className="hide-sm">Boutiques</a>
            
            {/* زر البحث */}
            <button 
              type="button" 
              className="icon-btn" 
              aria-label="Search"
              onClick={() => setIsSearchOpen((prev) => !prev)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>

            <button type="button" className="icon-btn" aria-label={bagLabel} onClick={onBagClick}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 8h14l-1 13H6L5 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <span className={`bag-count${bump ? " bump" : ""}`} aria-hidden="true">
                {bagCount}
              </span>
            </button>
          </div>
        </nav>

        {/* صندوق البحث المنسدل الفاخر */}
        {isSearchOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            borderBottom: '1px solid #eee',
            padding: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
            zIndex: 1100,
            textAlign: 'center'
          }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
              <input
                type="text"
                placeholder="Search for rings, necklaces, bracelets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
              
              {/* نتائج البحث المباشرة */}
              {searchQuery.trim() !== "" && (
                <div style={{
                  marginTop: '10px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  textAlign: 'left',
                  backgroundColor: '#fff',
                  border: '1px solid #eee',
                  borderRadius: '4px'
                }}>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (onSelectProduct) onSelectProduct(item);
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 15px',
                          borderBottom: '1px solid #f5f5f5',
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                      >
                        <img 
                          src={item.image || item.img} 
                          alt={item.name} 
                          style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '3px' }} 
                        />
                        <div>
                          <h4 style={{ margin: '0 0 2px 0', fontSize: '0.9rem', fontWeight: '500' }}>{item.name}</h4>
                          <span style={{ fontSize: '0.8rem', color: '#666' }}>{item.price}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ padding: '15px', color: '#777', textAlign: 'center', margin: 0, fontSize: '0.9rem' }}>
                      No jewelry found matching your search.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mobile-panel" id="mobile-panel" data-open={menuOpen}>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={closeMenu}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href="#" onClick={closeMenu}>Boutiques</a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}