const SensorData = require('../models/SensorData');

// @desc    Ingest sensor reading
// @route   POST /api/sensor/ingest
// [cite: 8]
exports.ingestReading = async (req, res) => {
  try {
    const { deviceId, temperature, timestamp } = req.body;

    // Validation for required fields [cite: 11]
    if (!deviceId || temperature === undefined) {
      return res.status(400).json({ error: 'deviceId and temperature are required' });
    }

    // Timestamp logic handled by Schema default if undefined [cite: 12]
    const newReading = new SensorData({
      deviceId,
      temperature,
      timestamp
    });

    await newReading.save(); // [cite: 10]

    res.status(201).json({
      message: 'Reading ingested successfully',
      data: newReading
    });
  } catch (error) {
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};

// @desc    Get latest reading for a device
// @route   GET /api/sensor/:deviceId/latest
// [cite: 9, 21]
exports.getLatestReading = async (req, res) => {
  try {
    const { deviceId } = req.params;

    // Find one document matching deviceId, sorted by timestamp descending
    const latestReading = await SensorData.findOne({ deviceId })
      .sort({ timestamp: -1 })
      .exec();

    if (!latestReading) {
      return res.status(404).json({ message: 'No readings found for this device' });
    }

    res.status(200).json(latestReading);
  } catch (error) {
    res.status(500).json({ error: 'Server Error', details: error.message });
  }
};