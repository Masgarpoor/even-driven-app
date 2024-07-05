import kafka from "kafka-node";
import { v4 as uuidv4 } from "uuid";

const client = new kafka.KafkaClient({
  kafkaHost: "kafka:9092",
});
const producer = new kafka.Producer(client);

producer.on("ready", () => {
  console.log("Kafka Producer is connected and ready.");
});

producer.on("error", (err) => {
  console.error("Kafka Producer connection error:", err);
});

function sendDataToKafka(data) {
  return new Promise((resolve, reject) => {
    const message = [
      {
        topic: "test_topic",
        messages: JSON.stringify({ ...data, id: uuidv4(), tag: "received" }),
        partition: 0,
      },
    ];

    producer.send(message, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

export default sendDataToKafka;
