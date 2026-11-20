import React from "react";

const egp = new Intl.NumberFormat("en-EG", {
  style: "currency",
  currency: "EGP",
  maximumFractionDigits: 0,
});

export default function CartDrawer({ isOpen, onClose, items, onRemoveItem, onCheckout }) {
  if (!isOpen) return null;

  // دالة لتنظيف وتحويل السعر إلى رقم مهما كانت صيغته
  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (!price) return 0;
    const cleaned = String(price).replace(/[^0-9.]/g, "");
    return parseFloat(cleaned) || 0;
  };

  const total = items.reduce((sum, item) => sum + parsePrice(item.price), 0);

  return (
    <div className="cart-overlay" onClick={onClose} style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end'
    }}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()} style={{
        width: '100%', maxWidth: '400px', backgroundColor: '#fff', height: '100%', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'serif' }}>Shopping Bag ({items.length})</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
          {items.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#777', marginTop: '40px' }}>Your bag is empty.</p>
          ) : (
            items.map((item, index) => {
              const numericPrice = parsePrice(item.price);
              return (
                <div key={index} style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'center' }}>
                  <img 
                    src={item.image || item.img} 
                    alt={item.name} 
                    style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '4px' }} 
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem' }}>{item.name}</h4>
                    <p style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#666' }}>{item.detail || item.description}</p>
                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#b8860b' }}>
                      {egp.format(numericPrice)}
                    </span>
                  </div>
                  <button 
                    onClick={() => onRemoveItem(index)}
                    style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '1.2rem' }}
                  >
                    ✕
                  </button>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div style={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 'bold' }}>
              <span>Total:</span>
              <span style={{ color: '#b8860b' }}>{egp.format(total)}</span>
            </div>
            <button 
              onClick={onCheckout}
              style={{
                width: '100%', backgroundColor: '#000', color: '#fff', border: 'none', padding: '14px', cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '8px', fontWeight: 'bold'
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}