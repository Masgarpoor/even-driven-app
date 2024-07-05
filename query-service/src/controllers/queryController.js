import queryData from "../services/influxDB.js";

async function getData(req, res) {
  try {
    const { startTime, endTime, name } = req.query;
    const data = await queryData(startTime, endTime, name);

    res.status(200).json({
      success: true,
      body: data,
      message: "Data fetched!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export default getData;
