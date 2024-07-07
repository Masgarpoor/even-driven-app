import Connection from "../models/connectionModel.js";

export default class ConnectionController {
  // Create new Connection
  static async createConnection(req, res) {
    try {
      const { connection_name } = req.params;
      const { parameters } = req.body;
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
    const { connection_name } = req.params;
    const { new_connection_name, parameters } = req.body;
    const updated_at = Date.now();

    if (!new_connection_name || !parameters) {
      return res.status(400).json({
        success: false,
        message: "Please send New Connection Name and Parameters.",
      });
    }

    if (new_connection_name === connection_name) {
      return res.status(400).json({
        success: false,
        message: "Please send new connection name.",
      });
    }

    try {
      const updatedConnection = await Connection.findOneAndUpdate(
        { connection_name },
        {
          $set: {
            connection_name: new_connection_name,
            parameters,
            updated_at,
          },
        },
        { new: true }
      );

      if (updatedConnection) {
        res.status(200).json({
          success: true,
          body: updatedConnection,
          message: "The connection updated.",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Connection Not Found to Update.",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Delete connection
  static async deleteConnection(req, res) {
    try {
      const { connection_name } = req.params;
      const deletedConnection = await Connection.findOneAndDelete(
        { connection_name },
        {
          new: true,
        }
      );

      if (deletedConnection) {
        res.status(200).json({
          success: true,
          body: deletedConnection,
          message: "Connection deleted.",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Connection Not Found to delete.",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async existConnection(req, res) {
    try {
      const { connection_name } = req.params;

      const connection = await Connection.findOne({ connection_name });
      if (connection) {
        res.status(200).json({
          success: true,
          messsage: "Connection Found!",
        });
      } else {
        throw new Error("Connection Not Found");
      }
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}
