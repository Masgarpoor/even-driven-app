import queryData from "../services/influxDB.js";
import {
  convertDateToTimestamp,
  convertDateToUTC,
} from "../services/convertDate.js";
export default class QueryController {
  static async getData(req, res) {
    try {
      const { connection_name } = req.params;
      let { startTime, endTime, name } = req.query;

      startTime = convertDateToTimestamp(convertDateToUTC(startTime));
      endTime = convertDateToTimestamp(convertDateToUTC(endTime));

      const data = await queryData(startTime, endTime, name, connection_name);
      console.table(data);
      if (data.length) {
        res.status(200).json({
          success: true,
          body: data,
          message: "Data fetched!",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}