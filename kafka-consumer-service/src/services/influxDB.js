import { InfluxDB, Point } from "@influxdata/influxdb-client";

const token = "my-influxdb-token";
const org = "my-org";
const bucket = "test_db";

const influxDB = new InfluxDB({
  url: "http://influxdb:8086",
  token: token,
});

const writeApi = influxDB.getWriteApi(org, bucket);

writeApi.useDefaultTags({ location: "server" });

export default async function writeDataToInflux(data) {
  try {
    const numericValue = parseFloat(data.value);

    if (isNaN(numericValue)) {
      throw new Error(`Invalid value for field 'value': ${data.value}`);
    }

    const point = new Point("data_measurement")
      .floatField("value", numericValue)
      .stringField("name", data.name)
      .timestamp(new Date(data.ts))  // Ensure timestamp is in Date format
      .tag("connection_name", data.connection_name)
      .tag("tag", data.tag);

    writeApi.writePoint(point);
    console.log("Data point written to InfluxDB:", point);
  } catch (error) {
    console.error("Failed to write data to InfluxDB:", error);
  }
}

process.on('SIGINT', async () => {
  try {
    await writeApi.close();
    console.log("writeApi closed successfully");
  } catch (error) {
    console.error("Error closing writeApi:", error);
  } finally {
    process.exit();
  }
});
