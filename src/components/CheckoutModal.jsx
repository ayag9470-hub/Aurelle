import React, { useState } from "react";

const egp = new Intl.NumberFormat("en-EG", {
  style: "currency",
  currency: "EGP",
  maximumFractionDigits: 0,
});

// قائمة شاملة لجميع محافظات مصر ومدنها
const GOVERNORATES_DATA = {
  "Cairo": [
    "Cairo", "Nasr City", "Maadi", "Heliopolis", "Zamalek", "New Cairo", "Shoubra", 
    "El Marg", "Ain Shams", "Helwan", "Mokattam", "El Shorouk", "Badr", "New Capital", 
    "Abbaseya", "Garden City", "Manial", "Zeitoun", "Matareya", "Salam City", "Dar El Salam"
  ],
  "Giza": [
    "Giza", "Dokki", "Mohandessin", "6th of October", "Sheikh Zayed", "Haram", 
    "Faisal", "Imbaba", "Agouza", "Badrashein", "Hawamdia", "Oaseem", "Atfih", 
    "Al Ayat", "Kerdasa", "Abu Nomros", "Warraq", "Smart Village"
  ],
  "Alexandria": [
    "Alexandria", "Smouha", "Miami", "Gleem", "Montaza", "Agami", "Borg El Arab", 
    "Abu Qir", "Sidi Gaber", "Mandara", "Shorouk", "San Stefano", "Maamoura", 
    "Ibrahimia", "Camp Cesar", "Sporting", "Victoria", "Dekheila"
  ],
  "Gharbia": [
    "Tanta", "El Mahalla El Kubra", "Zefta", "Kafr El Zayat", "Samanoud", 
    "Basion", "Qutour", "El Santa", "Mahalla Diwan", "Shoon"
  ],
  "Dakahlia": [
    "Mansoura", "Mit Ghamr", "Talkha", "Belqas", "Aga", "Sinbillawin", 
    "Dikirnis", "Manzala", "Sherbin", "Matariya", "Gamaliya", "Bani Ebeid", 
    "Nabaroh", "Meet Salsil"
  ],
  "Sharqia": [
    "Zagazig", "10th of Ramadan", "Belbeis", "Minya El Qamh", "Abu Hammad", 
    "Faqus", "Hehia", "Diyarb Negm", "Kafr Saqr", "Husseiniya", "New Salhia", 
    "Qenayat", "Awlad Saqr"
  ],
  "Qalyubia": [
    "Banha", "Shubra El Kheima", "Qalyoub", "Qanater El Khairia", "Khanka", 
    "Shebin El Qanater", "Toukh", "Khosous", "Kafr Shukr", "El Oubour"
  ],
  "Monufia": [
    "Shebin El Kom", "Menouf", "Sadat City", "Ashmoun", "Tala", "Quwaysina", 
    "Shouhada", "Barakat", "Sers El Layan"
  ],
  "Beheira": [
    "Damanhour", "Kafr El Dawwar", "Rashid", "Edku", "Abu Hommos", 
    "Hosh Eissa", "Delengat", "Itay El Baroud", "Wadi El Natrun", "Badr", 
    "Mahmoudiyah", "Nubaria", "Kom Hamada"
  ],
  "Kafr El Sheikh": [
    "Kafr El Sheikh", "Desouk", "Metoubes", "Baltim", "Fouwa", 
    "Biyala", "Qallin", "Hamoul", "Bourlos", "Sidi Salem", "Riadh"
  ],
  "Faiyum": ["Faiyum", "Ibshaway", "Tamiya", "Sits", "Youssef El Seddik", "Atsa", "New Faiyum"],
  "Beni Suef": ["Beni Suef", "Nasser", "Beba", "Fashn", "Ehnasia", "Somasta", "New Beni Suef", "Wasta"],
  "Minya": ["Minya", "Mallawi", "Samalut", "Abu Qurqas", "Maghagha", "Bani Mazar", "Deir Mawas", "New Minya", "Edwa"],
  "Asyut": ["Asyut", "Dairut", "Manfalut", "Abnoug", "Abu Tig", "El Badari", "Sahel Selim", "Fateh", "New Asyut", "Ghanayem"],
  "Sohag": ["Sohag", "Akhmim", "Girga", "Balyana", "Tahta", "Tima", "Maragha", "Saqulta", "Dar El Salam", "New Sohag", "Monsha"],
  "Qena": ["Qena", "Nag Hammadi", "Dishna", "Farshut", "Qus", "Naqada", "Abu Tesht", "New Qena"],
  "Luxor": ["Luxor", "Karnak", "Armant", "Esna", "New Luxor", "Bayadiya", "Qarna"],
  "Aswan": ["Aswan", "Edfu", "Kom Ombo", "Daraw", "Abu Simbel", "New Aswan", "Nasr El Nuba"],
  "Red Sea": ["Hurghada", "Safaga", "Marsa Alam", "Quseir", "Ras Ghareb", "Shalatin", "Halaib"],
  "New Valley": ["Kharga", "Dakhla", "Farafra", "Baris", "Mut"],
  "Matrouh": ["Marsa Matrouh", "El Alamein", "El Dabaa", "El Hamam", "Sidi Barrani", "Siwa", "Sallum", "Negaila"],
  "North Sinai": ["Arish", "Sheikh Zuweid", "Rafah", "Bir El Abd", "Nakhl", "Hasana"],
  "South Sinai": ["Sharm El Sheikh", "Dahab", "Nuweiba", "Taba", "Saint Catherine", "Tor Sinai", "Ras Sedr"],
  "Port Said": ["Port Said", "Port Fouad"],
  "Suez": ["Suez", "Arbaeen", "Ganayen", "Attaka", "Sokhna"],
  "Ismailia": ["Ismailia", "Fayed", "Qantara Sharq", "Qantara Gharb", "Tall El Kebir", "Abu Suwir", "Nefesha"],
  "Damietta": ["Damietta", "New Damietta", "Faraskur", "Zarqa", "Kafr Saad", "Ras El Bar", "Mit Abu Ghaleb"]
};

export default function CheckoutModal({ isOpen, onClose, items, onOrderSuccess }) {
  const [step, setStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("visa");
  
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    governorate: "",
    city: "",
    street: "",
    landmark: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardHolder: "",
    cardNumber: "",
    mm: "",
    yy: "",
    cvv: "",
    walletPhone: "",
    valuPhone: "",
  });

  if (!isOpen) return null;

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (!price) return 0;
    const cleaned = String(price).replace(/[^0-9.]/g, "");
    return parseFloat(cleaned) || 0;
  };

  const subtotal = items.reduce((sum, item) => sum + parsePrice(item.price), 0);

  const calculateShipping = (gov) => {
    if (!gov) return 0;
    if (gov === "Gharbia" || gov === "Kafr El Sheikh" || gov === "Cairo" || gov === "Giza") return 50;
    if (gov === "Alexandria" || gov === "Dakahlia" || gov === "Sharqia" || gov === "Qalyubia") return 65;
    return 85; 
  };

  const shippingCost = calculateShipping(shippingData.governorate);
  const taxCost = Math.round(subtotal * 0.05); 
  const total = subtotal + shippingCost + taxCost;

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    if (name === "governorate") {
      setShippingData({ ...shippingData, governorate: value, city: "" });
    } else {
      setShippingData({ ...shippingData, [name]: value });
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (!shippingData.firstName || !shippingData.phone || !shippingData.governorate || !shippingData.city || !shippingData.street) {
      alert("Please fill in all required shipping fields.");
      return;
    }
    setStep(2);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    onOrderSuccess();
    setStep(1);
  };

  // تم مطابقة الأسماء هنا بالضبط بناءً على الصور التي قمتِ بتحديثها
  const paymentMethods = [
    { id: "visa", name: "Credit / Debit Card", desc: "Visa, Mastercard", icon: "/icons/visa.png" },
    { id: "valu", name: "valU", desc: "Buy now, pay later installments", icon: "/icons/valu.png" },
    { id: "wallet", name: "Mobile Wallets", desc: "Vodafone Cash, Orange, Etisalat", icon: "/icons/wallet.png" },
    { id: "fawry", name: "Fawry Pay", desc: "Pay via Fawry stores or app", icon: "/icons/fawry.png" },
    { id: "meza", name: "Meeza Card", desc: "Egyptian National Card", icon: "/icons/meza.png" },
    { id: "aman", name: "Aman", desc: "Aman secure payment", icon: "/icons/aman.png" },
    { id: "cod", name: "Cash on Delivery", desc: "Pay cash upon receiving", icon: "/icons/cod.png" },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(255, 255, 255, 0.98)', zIndex: 9999, overflowY: 'auto', padding: '40px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)', border: '1px solid #eaeaea' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '30px' }}>
          <button 
            type="button"
            onClick={step === 2 ? () => setStep(1) : onClose}
            style={{ background: 'none', border: 'none', fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: '#111', fontWeight: '600' }}
          >
            ← {step === 2 ? "Back to Shipping" : "Back to Store"}
          </button>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontFamily: 'serif', letterSpacing: '1px', color: '#111' }}>
            {step === 1 ? "SHIPPING ADDRESS" : "SECURE PAYMENT"}
          </h1>
          <div style={{ width: '90px' }}></div>
        </div>

        {/* Steps Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '35px', fontSize: '0.9rem' }}>
          <div style={{ paddingBottom: '8px', borderBottom: step === 1 ? '2px solid #111' : '2px solid transparent', color: step === 1 ? '#111' : '#aaa', fontWeight: 'bold' }}>
            1. Shipping Details
          </div>
          <div style={{ paddingBottom: '8px', borderBottom: step === 2 ? '2px solid #111' : '2px solid transparent', color: step === 2 ? '#111' : '#aaa', fontWeight: 'bold' }}>
            2. Payment Method
          </div>
        </div>

        {/* STEP 1: SHIPPING ADDRESS */}
        {step === 1 && (
          <form onSubmit={handleNextToPayment}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: '#333' }}>First Name *</label>
                <input type="text" name="firstName" value={shippingData.firstName} onChange={handleShippingChange} required placeholder="Enter first name" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', background: '#fafafa' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Last Name *</label>
                <input type="text" name="lastName" value={shippingData.lastName} onChange={handleShippingChange} required placeholder="Enter last name" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', background: '#fafafa' }} />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Phone Number *</label>
              <input type="text" name="phone" placeholder="010xxxxxxxx" value={shippingData.phone} onChange={handleShippingChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', background: '#fafafa' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Governorate *</label>
                <select 
                  name="governorate" 
                  value={shippingData.governorate} 
                  onChange={handleShippingChange} 
                  required 
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', backgroundColor: '#fafafa' }}
                >
                  <option value="">Select Governorate</option>
                  {Object.keys(GOVERNORATES_DATA).map((gov) => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: '#333' }}>City / Center *</label>
                <select 
                  name="city" 
                  value={shippingData.city} 
                  onChange={handleShippingChange} 
                  required 
                  disabled={!shippingData.governorate}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', backgroundColor: '#fafafa' }}
                >
                  <option value="">Select City</option>
                  {shippingData.governorate && GOVERNORATES_DATA[shippingData.governorate]?.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Street Name, Building No *</label>
              <input type="text" name="street" placeholder="Street name and building number" value={shippingData.street} onChange={handleShippingChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', background: '#fafafa' }} />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Floor / Apartment / Landmark (Optional)</label>
              <input type="text" name="landmark" placeholder="Nearby landmark or apartment" value={shippingData.landmark} onChange={handleShippingChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', background: '#fafafa' }} />
            </div>

            <button type="submit" style={{ width: '100%', backgroundColor: '#111', color: '#fff', border: 'none', padding: '16px', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px', fontSize: '1rem', borderRadius: '8px' }}>
              CONTINUE TO PAYMENT →
            </button>
          </form>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === 2 && (
          <form onSubmit={handleSubmitOrder}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.1rem', color: '#333' }}>Select Payment Option</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginBottom: '25px' }}>
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    border: selectedPayment === method.id ? '2px solid #111' : '1px solid #e0e0e0',
                    borderRadius: '10px',
                    padding: '14px 18px',
                    cursor: 'pointer',
                    backgroundColor: selectedPayment === method.id ? '#f8f8f8' : '#fff',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img src={method.icon} alt={method.name} style={{ width: '32px', height: '32px', objectFit: 'contain' }} onError={(e)=>{e.target.style.display='none'}} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: '#222', fontSize: '0.95rem' }}>{method.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{method.desc}</div>
                  </div>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', border: selectedPayment === method.id ? '6px solid #111' : '2px solid #ccc'
                  }}></div>
                </div>
              ))}
            </div>

            {/* تفاصيل الكارت */}
            {(selectedPayment === 'visa' || selectedPayment === 'meza') && (
              <div style={{ backgroundColor: '#fcfcfc', padding: '24px', borderRadius: '10px', border: '1px solid #e2e2e2', marginBottom: '25px' }}>
                <h4 style={{ margin: '0 0 15px 0', fontSize: '0.95rem', color: '#333' }}>Enter Card Details</h4>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px' }}>Card Holder's Name</label>
                  <input type="text" name="cardHolder" autoComplete="off" placeholder="Full Name on Card" value={paymentDetails.cardHolder} onChange={handlePaymentChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff' }} />
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px' }}>Card Number</label>
                  <input type="text" name="cardNumber" autoComplete="off" placeholder="•••• •••• •••• ••••" value={paymentDetails.cardNumber} onChange={handlePaymentChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px' }}>MM</label>
                    <input type="text" name="mm" placeholder="MM" value={paymentDetails.mm} onChange={handlePaymentChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px' }}>YY</label>
                    <input type="text" name="yy" placeholder="YY" value={paymentDetails.yy} onChange={handlePaymentChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '5px' }}>CVV</label>
                    <input type="password" name="cvv" placeholder="CVV" value={paymentDetails.cvv} onChange={handlePaymentChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff' }} />
                  </div>
                </div>
              </div>
            )}

            {selectedPayment === 'wallet' && (
              <div style={{ backgroundColor: '#fcfcfc', padding: '24px', borderRadius: '10px', border: '1px solid #e2e2e2', marginBottom: '25px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: '#333' }}>Mobile Wallet Number</h4>
                <input type="text" name="walletPhone" placeholder="010xxxxxxxx" value={paymentDetails.walletPhone} onChange={handlePaymentChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff' }} />
              </div>
            )}

            {selectedPayment === 'valu' && (
              <div style={{ backgroundColor: '#fcfcfc', padding: '24px', borderRadius: '10px', border: '1px solid #e2e2e2', marginBottom: '25px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: '#333' }}>valU Account Verification</h4>
                <input type="text" name="valuPhone" placeholder="010xxxxxxxx" value={paymentDetails.valuPhone} onChange={handlePaymentChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff' }} />
              </div>
            )}

            {/* ملخص الحساب النهائي */}
            <div style={{ backgroundColor: '#fafafa', padding: '18px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#555' }}>
                <span>Subtotal:</span>
                <span>{egp.format(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#555' }}>
                <span>Shipping ({shippingData.governorate || "Standard"}):</span>
                <span>{egp.format(shippingCost)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem', color: '#555' }}>
                <span>Estimated Tax (5%):</span>
                <span>{egp.format(taxCost)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #ddd', fontSize: '1.1rem', fontWeight: 'bold' }}>
                <span>Total Amount:</span>
                <span style={{ color: '#b8860b' }}>{egp.format(total)}</span>
              </div>
            </div>

            <button type="submit" style={{ width: '100%', backgroundColor: '#111', color: '#fff', border: 'none', padding: '16px', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '1px', fontSize: '1rem', borderRadius: '8px' }}>
              COMPLETE ORDER
            </button>
          </form>
        )}
      </div>
    </div>
  );
}