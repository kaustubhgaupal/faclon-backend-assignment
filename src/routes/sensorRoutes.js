const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

// POST /api/sensor/ingest
router.post('/ingest', sensorController.ingestReading);

// GET /api/sensor/:deviceId/latest
router.get('/:deviceId/latest', sensorController.getLatestReading);

module.exports = router;