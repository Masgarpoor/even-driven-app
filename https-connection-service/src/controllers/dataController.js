import { sendDataToKafka } from "../services/kafkaProducer.js";

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
      const result = await sendDataToKafka(data);

      if (result.success) {
        res.status(200).json(result)
      }else {
        res.status(500).json(result)
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
