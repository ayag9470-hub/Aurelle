const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const PRODUCTS_FILE = path.join(__dirname, 'products.json');

// دالة مساعدة لقراءة المنتجات من الملف
const readProductsFromFile = () => {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading products.json:", err);
    return [];
  }
};

// دالة مساعدة لحفظ المنتجات في الملف
const writeProductsToFile = (products) => {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
  } catch (err) {
    console.error("Error writing to products.json:", err);
  }
};

// 1. مسار جلب كل المنتجات من ملف JSON
app.get('/api/products', (req, res) => {
  const products = readProductsFromFile();
  res.json(products);
});

// 2. مسار إضافة منتج جديد وإضافته فوراً لملف JSON
app.post('/api/products', (req, res) => {
  const products = readProductsFromFile();
  const newProduct = {
    id: `prod-${Date.now()}`,
    ...req.body
  };
  products.push(newProduct);
  writeProductsToFile(products);
  res.status(201).json({ message: "Product added successfully", product: newProduct });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} with products.json database`);
});