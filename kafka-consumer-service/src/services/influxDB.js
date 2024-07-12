import Influx from "influx";

const influx = new Influx.InfluxDB({
  host: "influxdb",
  port: 8086,
  database: "test_db",
  username: "username",
  password: "password",
  schema: [
    {
      measurement: "data_measurement",
      fields: {
        value: Influx.FieldType.FLOAT,
        name: Influx.FieldType.STRING,
        ts: Influx.FieldType.INTEGER,
      },
      tags: ["connection_name", "tag"], // Tags used for indexing and querying
    },
  ],
});

export default function writeDataToInflux(data) {
  try {
    const numericValue = parseFloat(data.value);
    if (isNaN(numericValue)) {
      throw (`Invalid value for field 'value': ${data.value}`);
    }
    return influx.writePoints([
      {
        measurement: "data_measurement",
        tags: { connection_name: data.connection_name, tag: data.tag },
        fields: { value: numericValue, name: data.name, ts: data.ts },
      },
    ]);
  } catch (error) {
    console.error("Failed to write data to InfluxDB:", error);
  }
}
