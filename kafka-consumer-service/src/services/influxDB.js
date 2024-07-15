import { InfluxDB, Point } from "@influxdata/influxdb-client";
import chalk from "chalk";

// Configuration for InfluxDB 2.x
const token =
  "C2e4JrRI4RhilIwFWKzqshVFT7sSF8prHJ4x5Dloh9TRSaj-Mo9H9D1DCdZw97cdKgzFYtNieUaGRfcdGKvAjQ==";
const org = "my-org";
const bucket = "test-bucket";

const influxDB = new InfluxDB({
  url: "http://localhost:8086",
  token: token,
});

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
    await writeApi.close();
    console.log("writeApi closed successfully");
  } catch (error) {
    console.error("Error closing writeApi:", error);
  } finally {
    process.exit();
  }
});
