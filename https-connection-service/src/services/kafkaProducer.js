import {Kafka} from "kafkajs";
import { v4 as uuidv4 } from "uuid";

const CLIENT = process.env.CLIENT || "https-connection-service";
const KAFKA_BROKER = process.env.KAFKA_BROKER || "kafka:9092";

const kafka = new Kafka({ clientId: CLIENT, brokers: [KAFKA_BROKER] });
const producer = kafka.producer();

export async function connectProducer() {
  try {
    await producer.connect();
    console.log("Kafka Producer is connected and ready.");
  } catch (error) {
    console.error("Kafka Producer connection error:", error.message);
  }
}

export async function sendDataToKafka(data) {
  try {
    const topic = process.env.KAFKA_TOPIC || "test_topic";
    const messages = [
      {
        key: uuidv4(),
        value: JSON.stringify({
          ...data,
          id: uuidv4(),
          tag: "received",
        }),
      },
    ];

    const payloads = {
      topic,
      messages,
    };

    await producer.send(payloads);
    console.log("Message sent to Kafka:", payloads);
  } catch (error) {
    console.error("Failed to send message to Kafka:", error.message);
  }
}

