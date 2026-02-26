require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const sensorRoutes = require('./routes/sensorRoutes');
const connectMQTT = require('./services/mqttService');

const app = express();

// Middleware
app.use(express.json());

// Connect to Database
connectDB();

// Initialize MQTT Subscriber (Bonus)
connectMQTT();

// Routes
app.use('/api/sensor', sensorRoutes); // 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});