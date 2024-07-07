import axios from "axios";
import NodeCache from "node-cache";

const DATABASE_SERVICE_URI = "http://database-service:3001"; // or use your actual database service URI
const connectionCache = new NodeCache({ stdTTL: 3600 });

async function checkConnectionExists(req, res, next) {
  const { connection_name } = req.params;

  let connection = connectionCache.get(connection_name);

  if (connection) {
    console.log("Found connection in cache!");
    return next();
  }
  try {
    const response = await axios.get(
      `${DATABASE_SERVICE_URI}/api/connections/${connection_name}`
    );

    if (response.data.success) {
      connectionCache.set(connection_name, true);
      return next();
    } else {
      return res.status(404).json({
        success: false,
        message: "Connection not found",
      });
    }
  } catch (error) {
    if (error.response) {
      // Status code not in renge 2**
      console.log("Response Error: ", error.response.data);
      return res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      console.log("Request Error: No response received", error.request);
      return res.status(500).json({
        success: false,
        message: "No response received from server",
      });
    } else {
      console.log("Error in sending request: ", error.message);
      return res.status(500).json({
        success: false,
        message: "Error in sending request: " + error.message,
      });
    }
  }
}

export default checkConnectionExists;
