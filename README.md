<img width="1394" height="854" alt="Screenshot 2026-02-26 085014" src="https://github.com/user-attachments/assets/86ebb41d-7dcd-4fdd-ae4d-58f46fbd2528" /># 🚀 IoT Sensor Backend Service

This Node.js backend service was developed for the Faclon Labs Internship Pre-Assessment.

The application ingests IoT sensor temperature readings, stores them in MongoDB Atlas, and provides an API to retrieve the latest reading for a specific device. It also includes a bonus MQTT subscriber for real-time data ingestion.

---

## 📌 Features

- REST API to ingest and retrieve sensor data
- MongoDB Atlas integration (Free Tier)
- Mongoose schema validation
- Automatic timestamp handling
- MQTT Subscriber for real-time temperature updates
- Proper HTTP status codes and error handling
- MVC-based folder structure

---

## 🛠️ Tech Stack

- Node.js (v18+ or v20 LTS recommended)
- Express.js
- MongoDB Atlas
- Mongoose
- MQTT (HiveMQ Public Broker)

---

## 📂 Project Structure

```
├── src
│   ├── config/db.js              # MongoDB connection
│   ├── controllers/              # API logic
│   ├── models/SensorData.js      # Mongoose Schema
│   ├── routes/                   # Express routes
│   ├── services/mqttService.js   # MQTT Subscriber
│   └── app.js                    # Entry point
├── .env                          # Environment variables
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone  https://github.com/kaustubhgaupal/faclon-backend-assignment.git
cd faclon-backend-assignment
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create Environment File

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/iot-db
MQTT_BROKER_URL=mqtt://broker.hivemq.com:1883
```


### 4️⃣ Run the Server

```bash
npm start
```

Server will run at:

```
http://localhost:3000
```

<img width="907" height="275" alt="Screenshot 2026-02-26 091927" src="https://github.com/user-attachments/assets/e77f4a68-9fc0-4a9e-a148-02ae4c4908fe" />



---

## 📡 API Documentation

---

### 1️⃣ Ingest Sensor Data

**Endpoint:**
```
POST /api/sensor/ingest
```

**Request Body:**

```json
{
  "deviceId": "sensor-01",
  "temperature": 32.5,
  "timestamp": 1705312440000
}
```

If `timestamp` is not provided, the server automatically uses current time.

---

### 🧪 CURL Example

```bash
curl -X POST http://localhost:3000/api/sensor/ingest \
-H "Content-Type: application/json" \
-d '{"deviceId":"sensor-01","temperature":32.5}'
```
<img width="1394" height="854" alt="Screenshot 2026-02-26 085014" src="https://github.com/user-attachments/assets/82575b8b-676f-4a80-9736-023ec6270be1" />


---

### 2️⃣ Get Latest Reading

**Endpoint:**
```
GET /api/sensor/:deviceId/latest
```


Example:

```bash
curl http://localhost:3000/api/sensor/sensor-01/latest
```

<img width="1447" height="868" alt="Screenshot 2026-02-26 085146" src="https://github.com/user-attachments/assets/4d049822-0b70-4b66-a13b-fa9ba597a908" />



---

## 📡 MQTT Bonus Feature

The application subscribes to:

```
iot/sensor/+/temperature
```

Topic format:

```
iot/sensor/<deviceId>/temperature
```

Example payload:

```
25.4
```

When a message is received, the temperature is automatically saved to MongoDB.

You can test using MQTTX or any MQTT client.

---

## 📷 API Testing Screenshots

(Place your screenshots inside an `images/` folder in your repo.)

### 🔹 POST – Ingest Sensor Data

![POST Ingest](images/post-ingest.png)

---

### 🔹 GET – Latest Reading

![GET Latest](images/get-latest.png)

---

### 🔹 MongoDB Atlas Stored Data

![MongoDB Atlas](images/mongodb-data.png)

---

## 🧠 Design Decisions

- Followed MVC architecture for clean separation of concerns
- Used Mongoose schema validation
- Implemented proper HTTP status codes (200, 400, 404, 500)
- Used environment variables for configuration security
- Designed for scalability and real-time ingestion support

---

## 🗄️ Database

MongoDB Atlas Free Tier Cluster  
Mongoose is used for schema modeling and database interaction.

---

## 🟢 Node Version

Recommended:

- Node.js v18+
- Node.js v20 LTS

---

## ✅ Submission Checklist

- GitHub repository link
- README with setup instructions
- MongoDB Atlas Free Tier used
- Curl examples included
- Node.js 18+ compatible
- Postman testing screenshots added

---

### 👨‍💻 Author

Kaustubh Gaupal  
Final Year CSE Student  
IIIT Nagpur
