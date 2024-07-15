import { Kafka } from "kafkajs";

import writeDataToInflux from "./influxDB.js";

const CLIENT = "kafka-consumer-service";
const KAFKA_BROKER = process.env.KAFKA_BROKER || "localhost:9092";
const KAFKA_TOPIC = process.env.KAFKA_TOPIC || "test";

const kafka = new Kafka({ CLIENT, brokers: [KAFKA_BROKER] });
const consumer = kafka.consumer({ groupId: "my-group" });

consumer.on(consumer.events.CONNECT, () => {
  console.log("Kafka Consumer connected to kafka");
});

consumer.on(consumer.events.FETCH_START, () => {
  console.log("Consumer fetche start... ");
});

async function connectConsumer() {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: KAFKA_TOPIC, fromBeginning: true });

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
