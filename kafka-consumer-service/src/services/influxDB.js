import { InfluxDB, Point } from "@influxdata/influxdb-client";
import chalk from "chalk";

// Configuration for InfluxDB 2.x
const url = "http://localhost:8086";
const token =
  "MV-W55fIYX_bCgnzdyScGdl5XWzinuVjuxSfNNQ_hWarlv-HxTswokCC3kvAk89eKkeJViPbG0IX4MTe9GEDdA==";
const org = "my-org";
const bucket = "test-bucket";

// Configuration for InfluxDB cloud
// const url = "https://us-east-1-1.aws.cloud2.influxdata.com"
// const token =
//   "Eonwt18jFJ7HZF4T4w4k80pChfihtOPMUZg5JsIqx8sXXvJb4H27oEaPW30LRDzskyFKXtpJWTOIJZujSncWGQ==";
// const org = "my-org"
// const bucket = "test-bucket";



const influxDB = new InfluxDB({ url, token });
const writeApi = influxDB.getWriteApi(org, bucket);

writeApi.useDefaultTags({ location: "consumer-server" });

// Function to write data to InfluxDB
export default async function writeDataToInflux(data) {
  try {
    const numericValue = parseFloat(data.value);
    if (isNaN(numericValue)) {
      throw new Error(`Invalid value for field 'value': ${data.value}`);
    }

    // Convert timestamp from milliseconds to nanoseconds
    const nanosecondTimestamp = parseInt(data.ts) * 1000000;
    if (isNaN(nanosecondTimestamp)) {
      throw new Error(`Invalid value for field 'ts': ${data.ts}`);
    }

    const point = new Point("data_measurement")
      .floatField("value", numericValue)
      .stringField("name", data.name)
      .timestamp(nanosecondTimestamp)
      .tag("connection_name", data.connection_name)
      .tag("tag", data.tag);

    writeApi.writePoint(point);
    console.log("Data point written to InfluxDB:", point);
  } catch (error) {
    console.error("Failed to write data to InfluxDB:", error);
  }
}

// Properly handle the closing of writeApi when the process exits
process.on("SIGINT", async () => {
  try {
    await writeApi.close(); // Ensure all data is written
    console.log("writeApi closed successfully");
  } catch (error) {
    console.error("Error closing writeApi:", error);
  } finally {
    process.exit();
  }
});
