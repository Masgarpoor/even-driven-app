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

  // Update Connection
  static async updateConnection(req, res) {
    const { id } = req.params;
    const { connection_name, parameters } = req.body;
    const updated_at = Date.now();

    if (connection_name && parameters) {
      try {
        const updatedConnection = await Connection.findByIdAndUpdate(
          id,
          {
            connection_name,
            parameters,
            updated_at,
          },
          { new: true }
        );

        res.status(200).json({
          success: true,
          body: updatedConnection,
          message: "The connection updated.",
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Please send Connection Name and parameters.",
      });
    }
  }

  // Delete connection
  static async deleteConnection(req, res) {
    try {
      const { id } = req.params;
      const deletedConnection = await Connection.findByIdAndDelete(id, {
        new: true,
      });
      res.status(200).json({
        success: true,
        body: deletedConnection,
        message: "Connection deleted.",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
