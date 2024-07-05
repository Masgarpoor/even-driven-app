import kafka from "kafka-node";

import writeDataToInflux from "./influxDB.js";

const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const consumer = new kafka.Consumer(client, [
  { topic: "test_topic", partition: 0 },
]);

consumer.on("message", async (message) => {
  try {
    const data = JSON.parse(message.value);
    console.log("offset is " + message.offset);
    console.log("partition is " + message.partition);
    console.log(message);
    await writeDataToInflux(data);
  } catch (error) {
    console.error("Failed to write data to InfluxDB:", err);
  }
});

consumer.on('error', (err) => {
  console.error('Kafka Consumer error:', err);
});
