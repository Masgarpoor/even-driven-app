import { InfluxDB } from "@influxdata/influxdb-client";

const token = "my-influxdb-token";
const org = "my-org";
const bucket = "test_db";

const influx = new InfluxDB({
  url: "http://influxdb:8086",
  token: token,
});

const queryData = async (startTime, endTime, name, connection_name) => {
  const queryApi = influx.getQueryApi(org);
  console.log(startTime);
  console.log(endTime);
  const query = `
    from(bucket: "${bucket}")
      |> range(start: ${startTime}, stop: ${endTime})
      |> filter(fn: (r) => r._measurement == "data_measurement")
      |> filter(fn: (r) => r._field == "value" or r._field == "name" or r._field == "ts")
      |> filter(fn: (r) => r.name == "${name}" and r.connection_name == "${connection_name}")
  `;


  // const query = `from(bucket: "test_db")
  // |> filter(fn: (r) => r["_measurement"] == "data_measurement")
  // |> filter(fn: (r) => r["_field"] == "ts" or r["_field"] == "name")
  // |> filter(fn: (r) => r["connection_name"] == "connection_1")
  // |> filter(fn: (r) => r["tag"] == "received")`
  try {
    const data = [];
    for await (const { values, tableMeta } of queryApi.iterateRows(query)) {
      const o = tableMeta.toObject(values);
      data.push(o);
    }
    return data;
  } catch (error) {
    console.error("Error querying data:", error);
    throw error;
  }
};

export default queryData;
