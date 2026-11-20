import React, { useState, useEffect } from "react";
import productsData from "../../products.json";

const egp = new Intl.NumberFormat("en-EG", {
  style: "currency",
  currency: "EGP",
  maximumFractionDigits: 0,
});

export default function ProductDetailView({ product, onBack, onAddToCart, onSelectProduct }) {
  // تطلع لأول الصفحة تلقائياً أول ما المنتج يتغير
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // حالة لتحديد المنتج اللي الماوس واقف عليه في قسم "You May Also Like"
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!product) return null;

  const relatedProducts = productsData.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#fff', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* زر الرجوع */}
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '0.95rem',
            cursor: 'pointer',
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#666',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
        >
          &larr; Back to collection
        </button>

        {/* تفاصيل المنتج الأساسية */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'start' }}>
          
          <div style={{ backgroundColor: '#f9f9f9', borderRadius: '8px', overflow: 'hidden' }}>
            <img 
              src={product.image || product.img} 
              alt={product.alt || product.name} 
              style={{ width: '100%', height: '450px', objectFit: 'cover' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {product.badge && (
              <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#888', marginBottom: '12px' }}>
                {product.badge}
              </span>
            )}

            <h1 style={{ fontFamily: 'serif', fontSize: '2.2rem', marginBottom: '16px', fontWeight: 'normal' }}>
              {product.name}
            </h1>

            <p style={{ color: '#666', fontSize: '1.05rem', marginBottom: '24px', lineHeight: '1.6' }}>
              {product.description || product.detail}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {typeof product.price === "number" ? egp.format(product.price) : product.price}
              </span>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                padding: '16px 32px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                width: '100%',
                marginBottom: '20px'
              }}
            >
              Add to Bag
            </button>
          </div>
        </div>

        {/* المنتجات ذات الصلة بتصميم مطابق للصفحة الرئيسية */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '80px', borderTop: '1px solid #eee', paddingTop: '50px' }}>
            <h3 style={{ fontFamily: 'serif', fontSize: '1.5rem', textAlign: 'center', marginBottom: '35px' }}>
              You May Also Like
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
              {relatedProducts.map((item, index) => (
                <div 
                  key={item.id}
                  style={{ textAlign: 'center' }}
                >
                  {/* كارت الصورة مع تأثير الـ Hover وزر Add to Bag */}
                  <div 
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => onSelectProduct(item)}
                    style={{ 
                      position: 'relative', 
                      backgroundColor: '#f9f9f9', 
                      borderRadius: '6px', 
                      overflow: 'hidden', 
                      marginBottom: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <img 
                      src={item.image || item.img} 
                      alt={item.name} 
                      style={{ 
                        width: '100%', 
                        height: '260px', 
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        transform: hoveredIndex === index ? 'scale(1.03)' : 'scale(1)'
                      }} 
                    />

                    {/* زر Add to Bag اللي بيظهر لما الماوس يقف على الصورة */}
                    {hoveredIndex === index && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // عشان ما يفتحش صفحة المنتج لما تدوسي على زرار الشراء مباشرة
                          onAddToCart(item);
                        }}
                        style={{
                          position: 'absolute',
                          bottom: '15px',
                          left: '15px',
                          right: '15px',
                          backgroundColor: '#000',
                          color: '#fff',
                          border: 'none',
                          padding: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          opacity: 0.95
                        }}
                      >
                        Add to Bag
                      </button>
                    )}
                  </div>

                  <h4 
                    onClick={() => onSelectProduct(item)}
                    style={{ fontSize: '1rem', marginBottom: '6px', fontWeight: '500', cursor: 'pointer' }}
                  >
                    {item.name}
                  </h4>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>
                    {typeof item.price === "number" ? egp.format(item.price) : item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}