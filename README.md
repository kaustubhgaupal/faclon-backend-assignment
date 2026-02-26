# IoT Sensor Backend Service

This Node.js backend service is built for the Faclon Labs Internship Pre-Assessment. It ingests IoT sensor temperature readings, persists them to a MongoDB Atlas database, and exposes an API to retrieve the latest reading for a specific device. It also includes a bonus MQTT subscriber.

## Features
* [cite_start]**REST API**: Endpoints to ingest sensor data and retrieve the latest reading[cite: 8, 9].
* [cite_start]**Database Integration**: Persists data using MongoDB Atlas and Mongoose[cite: 10, 36].
* [cite_start]**Validation**: Validates `deviceId` and `temperature` fields; defaults timestamp if missing[cite: 11, 12].
* [cite_start]**MQTT Subscriber (Bonus)**: Listens for real-time temperature updates on `iot/sensor/<deviceId>/temperature`[cite: 28].

## Prerequisites
* [cite_start]**Node.js**: v18+ or v20 LTS [cite: 37]
* [cite_start]**MongoDB**: MongoDB Atlas (Free Tier) account [cite: 36]

## Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone <your-github-repo-url>
    cd faclon-backend-assignment
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory:
    ```env
    PORT=3000
    # Replace with your actual MongoDB connection string
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/iot-db?retryWrites=true&w=majority
    MQTT_BROKER_URL=mqtt://broker.hivemq.com:1883
    ```

4.  **Run the Server**
    ```bash
    npm start
    ```
    *Server will start on port 3000.*

---

## API Documentation

### 1. Ingest Sensor Data
**Endpoint:** `POST /api/sensor/ingest`
**Description:** Ingests a temperature reading. [cite_start]If `timestamp` is omitted, the server uses the current time[cite: 12].

* **Request Body (JSON):**
    ```json
    {
      "deviceId": "sensor-01",
      "temperature": 32.1,
      "timestamp": 1705312440000
    }
    ```

* **curl Example:**
    ```bash
    curl -X POST http://localhost:3000/api/sensor/ingest \
      -H "Content-Type: application/json" \
      -d '{"deviceId": "sensor-01", "temperature": 32.1}'
    ```

### 2. Get Latest Reading
**Endpoint:** `GET /api/sensor/:deviceId/latest`
[cite_start]**Description:** Returns the most recent document for the given `deviceId`[cite: 9, 21].

* **curl Example:**
    ```bash
    curl http://localhost:3000/api/sensor/sensor-01/latest
    ```

---

## MQTT Bonus Task
The service automatically subscribes to the MQTT topic `iot/sensor/+/temperature`.

* [cite_start]**Topic Format:** `iot/sensor/<deviceId>/temperature` [cite: 28]
* **Payload:** Raw number or JSON (e.g., `25.5`)
* **Testing:** Use an MQTT client like MQTTX to publish to `iot/sensor/test-device/temperature`. The server will log "MQTT Data Saved to DB".

## Project Structure
