import { InfluxDB } from "@influxdata/influxdb-client";
import axios from "axios";
import https from "https";

// Configuration for InfluxDB 2.x
const url = "http://localhost:8086";
const token =
  "MV-W55fIYX_bCgnzdyScGdl5XWzinuVjuxSfNNQ_hWarlv-HxTswokCC3kvAk89eKkeJViPbG0IX4MTe9GEDdA==";
const org = "my-org";
const bucket = "test-bucket";

const influxDB = new InfluxDB({ url, token });

const queryData = async (startTime, endTime, name, connection_name) => {
  const queryApi = influxDB.getQueryApi(org);

  const startTimeNanosecond = startTime * 1e6;
  const endTimeNanosecond = endTime * 1e6;

  let fluxQuery = `
    from(bucket: "${bucket}")
      |> range(start: ${startTimeNanosecond}, stop: ${endTimeNanosecond})
      |> filter(fn: (r) => r._measurement == "data_measurement")
      |> filter(fn: (r) => r.connection_name == "${connection_name}")
      |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
  `;

  let data = [];
  await new Promise((resolve, reject) => {
    queryApi.queryRows(fluxQuery, {
      next: (row, tableMeta) => {
        const tableObject = tableMeta.toObject(row);
        data.push({
          name: tableObject.name,
          value: tableObject.value,
          connection_name: tableObject.connection_name,
          time: tableObject._time,
        });
      },
      error: (error) => {
        console.error("\nError querying data:", error);
        reject(error);
      },
      complete: () => {
        console.log("\nSuccess");
        resolve();
      },
    });
  });

  return data;
};

const deleteData = async (connection_name) => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  const url = "http://localhost:8086/api/v2/delete";
  const params = {
    org,
    bucket,
  };
  const data = {
    start: "1970-01-01T00:00:00Z",
    stop: "2030-01-01T00:00:00Z",
    predicate: `_measurement="data_measurement" AND connection_name="${connection_name}"`,
  };
  const headers = {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(url, data, {
      params,
      headers,
      httpsAgent,
    });
    console.log("Delete request sent successfully:", response.data);
  } catch (error) {
    console.error("Failed to send delete request:", error.response.data);
  }
};

export { queryData, deleteData };
