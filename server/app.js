const express = require('express');
const connectDB = require('./config/db');
const countryRoutes = require('./routes/countryRoutes');
const cors = require('cors');

const app = express();

connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Routes
app.get('/', (req, res) => res.send('API Running'));
app.use('/api/countries', countryRoutes);

// Define the port to listen on
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
