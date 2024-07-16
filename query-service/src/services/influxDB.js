import { InfluxDB } from "@influxdata/influxdb-client";

// Configuration for InfluxDB 2.x
const url = "http://localhost:8086";
const token =
  "MV-W55fIYX_bCgnzdyScGdl5XWzinuVjuxSfNNQ_hWarlv-HxTswokCC3kvAk89eKkeJViPbG0IX4MTe9GEDdA==";
const org = "my-org";
const bucket = "test-bucket";

const influxDB = new InfluxDB({ url, token });

// const queryData = async (startTime, endTime, name, connection_name) => {
//   const queryApi = influxDB.getQueryApi(org);
//   const startTimeNanosecond = startTime * 1e6;
//   const endTimeNanosecond = endTime * 1e6;

//   console.log(startTime, "-->", startTimeNanosecond);
//   console.log(endTime, "-->", endTimeNanosecond);

//   let fluxQuery = `
//     from(bucket: "${bucket}")
//       |> range(start: ${startTimeNanosecond}, stop: ${endTimeNanosecond})
//       |> filter(fn: (r) => r._measurement == "data_measurement")

//   `;

//   // |> sort(columns: ["_time"])
//   // |> range(start: ${startTimeNanosecond}, stop: ${endTimeNanosecond})
//   // |> filter(fn: (r) => r.connection_name == "${connection_name}")
//   let data = [];
//   await new Promise((resolve, reject) => {
//     queryApi.queryRows(fluxQuery, {
//       next: (row, tableMeta) => {
//         const tableObject = tableMeta.toObject(row);
//         data.push(tableObject);
//       },
//       error: (error) => {
//         console.error("\nError querying data:", error);
//         reject(error);
//       },
//       complete: () => {
//         console.log("\nSuccess");
//         resolve();
//       },
//     });
//   });

//   return data;
// };

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

export default queryData;
