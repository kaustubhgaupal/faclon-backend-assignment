const mongoose = require('mongoose');

const SensorSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true // [cite: 11]
  },
  temperature: {
    type: Number,
    required: true // [cite: 11]
  },
  timestamp: {
    type: Number, // Epoch ms [cite: 25]
    required: true,
    default: () => Date.now() // Default to current time if missing [cite: 12]
  },
  createdAt: {
    type: Date,
    default: Date.now // [cite: 26]
  }
});

module.exports = mongoose.model('SensorData', SensorSchema);