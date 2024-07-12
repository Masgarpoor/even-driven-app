import { Kafka } from "kafkajs";

import writeDataToInflux from "./influxDB.js";

const CLIENT = "kafka-consumer-service";
const KAFKA_BROKER = process.env.KAFKA_BROKER || "kafka:9092";

const kafka = new Kafka({ CLIENT, brokers: [KAFKA_BROKER] });
const consumer = kafka.consumer({ groupId: "my-group" });

async function connectConsumer() {
  try {
    const KAFKA_TOPIC = process.env.KAFKA_TOPIC || "test_topic";
    await consumer.connect();
    await consumer.subscribe({ topic: KAFKA_TOPIC, fromBeginning: true });
    console.log("Kafka Consumer connected to kafka");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const data = JSON.parse(message.value.toString());
          console.log("Data received from Kafka:", data);

          await writeDataToInflux(data);
          console.log(
            `Data written to InfluxDB from topic: ${topic}, partition: ${partition}`
          );
        } catch (error) {
          console.error("Failed to write data to InfluxDB:", error.message);
        }
      },
    });
  } catch (error) {
    console.error("Kafka Consumer connection error:", error.message);
  }
}

connectConsumer().catch((error) =>
  console.error("Kafka Consumer connection error:", error.message)
);
