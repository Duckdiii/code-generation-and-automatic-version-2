// app.js
const express = require('express');
const app = express();
app.use(express.json());

// --- ROUTES HERE ---
app.use('/api/customers', require('./src/routes/CustomerRoutes'));
app.use('/api/customers', require('./src/routes/CustomerRoutes'));
app.use('/api/products', require('./src/routes/ProductRoutes'));
app.use('/api/customers', require('./src/routes/CustomerRoutes'));
app.use('/api/customers', require('./src/routes/CustomerRoutes'));
app.use('/api/products', require('./src/routes/ProductRoutes'));
app.use('/api/products', require('./src/routes/ProductRoutes'));
app.use('/api/products', require('./src/routes/ProductRoutes'));
app.use('/api/products', require('./src/routes/ProductRoutes'));


app.listen(3000, () => console.log('Server running on port 3000'));