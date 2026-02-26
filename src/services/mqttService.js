const mqtt = require('mqtt');
const SensorData = require('../models/SensorData');

const connectMQTT = () => {
  const client = mqtt.connect(process.env.MQTT_BROKER_URL || 'mqtt://broker.hivemq.com');

  client.on('connect', () => {
    console.log('MQTT Broker Connected');
    // Subscribe to wildcard topic to capture all devices
    // Topic format: iot/sensor/<deviceId>/temperature [cite: 28]
    client.subscribe('iot/sensor/+/temperature', (err) => {
      if (!err) {
        console.log('Subscribed to iot/sensor/+/temperature');
      }
    });
  });

  client.on('message', async (topic, message) => {
    try {
      // Parse deviceId from topic string
      // Topic parts: ['iot', 'sensor', 'deviceId', 'temperature']
      const topicParts = topic.split('/');
      const deviceId = topicParts[2];

      // Parse payload (assuming payload is just the temperature value or a JSON)
      const msgString = message.toString();
      let temperature;
      
      // Handle if message is JSON or raw number
      if (!isNaN(msgString)) {
         temperature = parseFloat(msgString);
      } else {
         const json = JSON.parse(msgString);
         temperature = json.temperature;
      }

      console.log(`MQTT Received - Device: ${deviceId}, Temp: ${temperature}`);

      // Persist to MongoDB [cite: 28]
      if (deviceId && temperature !== undefined) {
        await SensorData.create({
          deviceId,
          temperature,
          timestamp: Date.now()
        });
        console.log('MQTT Data Saved to DB');
      }
    } catch (error) {
      console.error('Error processing MQTT message:', error.message);
    }
  });
};

module.exports = connectMQTT;