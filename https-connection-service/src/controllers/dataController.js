import axios from "axios";

import sendDataToKafka from "../services/kafkaProducer.js";
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

      const connection = await sendDataToKafka(data);
      res.status(200).json({
        success: true,
        body: data,
        message: "Data received and sent to Kafka",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
