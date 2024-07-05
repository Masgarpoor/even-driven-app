import "./services/kafkaConsumer.js";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Kafka Consumer Service is running on port ${PORT}`);
});
