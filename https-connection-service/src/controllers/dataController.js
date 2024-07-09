import axios from "axios";

import { sendDataToKafka, connectProducer } from "../services/kafkaProducer.js";

// Connectt producer to kafka
const connectProducerToKafka = async () => {
  try {
    await connectProducer();
  } catch (error) {
    console.log(error.message);
  }
};

connectProducerToKafka();

export default class DataController {
  static async receiveData(req, res) {
    try {
      const { connection_name } = req.params;
      const { name, value, ts } = req.body;
      const data = {
        connection_name,
        name,
        value,
        ts,
      };
      await sendDataToKafka(data);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
