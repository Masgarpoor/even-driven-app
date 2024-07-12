import axios from "axios";

const DATABASE_SERVICE_URI = "http://database-service:3001/api";
const HTTPS_CONNECTIONS_URI = "http://https-connection-service:3002/api";
const QUERY_SERVICE_URI = "http://query-service:3004/api";
// const DATABASE_SERVICE_URI = "http://localhost:3001/api";
// const HTTPS_CONNECTIONS_URI = "http://localhost:3002/api";

export default class RequestController {
  // database-servicev
  static async connectionsRequest(req, res) {
    try {
      const response = await axios({
        method: req.method,
        baseURL: DATABASE_SERVICE_URI,
        url: req.url,
        data: req.body,
      });

      res.status(response.status).json(response.data);
    } catch (error) {
      RequestController.handleRequestError(error, res);
    }
  }

  // https-service
  static async dataRequest(req, res) {
    const { connection_name } = req.params;
    try {
      const response = await axios({
        method: req.method,
        baseURL: HTTPS_CONNECTIONS_URI,
        url: `${connection_name}/data`,
        data: req.body,
      });

      res.status(response.status).json(response.data);
    } catch (error) {
      RequestController.handleRequestError(error, res);
    }
  }

  // Query-service
  static async queryRequest(req, res) {
    try {
      const { connection_name } = req.params;
      const query = new URLSearchParams(req.query).toString();

      const response = await axios({
        method: req.method,
        baseURL: QUERY_SERVICE_URI,
        url: `${connection_name}/data?${query}`,
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      RequestController.handleRequestError(error, res);
    }
  }

  static handleRequestError(error, res) {
    if (error.response) {
      // status code not in range 2**
      console.log("Response Error: ", error.response.data.message);
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      // Request sent but didn't receive response
      console.log("Request Error: No response received", error.request);
      res.status(500).json({
        success: false,
        message: `Request Error, No response received: ${error.request}`,
      });
    } else {
      // Other errors
      console.log("Error in sending request: ", error.message);
      res.status(500).json({
        success: false,
        message: `Error in sending request: ${error.message}`,
      });
    }
  }
}
