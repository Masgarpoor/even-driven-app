import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
  connection_name: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  parameters: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const Connection = mongoose.model("Connection", connectionSchema);

export default Connection;
