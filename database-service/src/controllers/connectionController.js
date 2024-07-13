import mongoose from "mongoose";
import Connection from "../models/connectionModel.js";

export default class ConnectionController {
  // Create new Connection
  static async createConnection(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { connection_name } = req.params;
      const { parameters } = req.body;
      if (!connection_name || !parameters) {
        throw {
          status: 400,
          message: "Invalid request parameters: Please send parameters",
        };
      }

      const existingConnection = await Connection.findOne({
        connection_name,
      }).session(session);
      if (existingConnection) {
        throw { status: 409, message: `${connection_name} already exists` };
      }

      const newConnection = new Connection({ connection_name, parameters });
      await newConnection.save({ session });

      await session.commitTransaction();
      res.status(201).json({
        success: true,
        body: newConnection,
        message: "New connection created!",
      });
    } catch (error) {
      await session.abortTransaction();
      const status = error.status || 500;
      const message = error.message || "Internal server error";
      console.error("Error creating connection:", message);

      res.status(status).json({
        success: false,
        message,
      });
    } finally {
      session.endSession();
    }
  }

  // Update Connection
  static async updateConnection(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { connection_name } = req.params;
      const { new_connection_name, parameters } = req.body;
      const updated_at = Date.now();

      if (!new_connection_name || !parameters) {
        throw {
          status: 400,
          message: "Invalid request parameters: Please send new connection name and parameters",
        };
      }

      if (new_connection_name === connection_name) {
        throw {
          status: 400,
          message: "Please send new connection name",
        };
      }

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
      ).session(session);

      if (updatedConnection) {
        await session.commitTransaction();
        res.status(200).json({
          success: true,
          body: updatedConnection,
          message: "The connection updated.",
        });
      } else {
        throw {
          status: 404,
          message: "Connection not found to update",
        };
      }
    } catch (error) {
      await session.abortTransaction();
      const status = error.status || 500;
      const message = error.message || "Internal server error";
      console.error("Error updating connection:", message);

      res.status(status).json({
        success: false,
        message,
      });
    } finally {
      session.endSession();
    }
  }

  // Delete connection
  static async deleteConnection(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { connection_name } = req.params;
      const deletedConnection = await Connection.findOneAndDelete(
        { connection_name },
        {
          new: true,
        }
      ).session(session);

      if (deletedConnection) {
        await session.commitTransaction();
        
        res.status(200).json({
          success: true,
          body: deletedConnection,
          message: "Connection deleted.",
        });
      } else {
        throw {
          status: 404,
          message: "Connection not found to delete",
        };
      }
    } catch (error) {
      await session.abortTransaction();
      const status = error.status || 500;
      const message = error.message || "Interval server error";
      console.log("Error deleting connection:", message);

      res.status(status).json({
        success: false,
        message,
      });
    } finally {
      session.endSession();
    }
  }

  static async existConnection(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const { connection_name } = req.params;

      const connection = await Connection.findOne({ connection_name }).session(
        session
      );
      if (connection) {
        await session.commitTransaction();
        res.status(200).json({
          success: true,
          messsage: "Connection found",
        });
      } else {
        throw {
          status: 404,
          message: "Connection Not Found",
        };
      }
    } catch (error) {
      await session.abortTransaction();
      const status = error.status || 500;
      const message = error.message || "Interval server error";
      console.log("Error finding connection: ", message);

      res.status(status).json({
        success: false,
        message,
      });
    } finally {
      session.endSession();
    }
  }
}
