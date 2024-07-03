import Connection from "../models/connectionModel.js";

export default class ConnectionController {
  // Create new Connection
  static async createConnection(req, res) {
    try {
      const { connection_name, parameters } = req.body;
      const newConnection = new Connection({ connection_name, parameters });

      await newConnection.save();
      res.status(201).json({
        success: true,
        body: newConnection,
        message: "New connection created!",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
