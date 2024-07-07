import Influx from "influx";

const influx = new Influx.InfluxDB({
  host: "influxdb",
  port: "8086",
  database: "test_db",
  username: "username",
  password: "password",
  schema: [
    {
      measurement: "data_measurement",
      fields: {
        value: Influx.FieldType.FLOAT,
        name: Influx.FieldType.STRING,
      },
      tags: ["connection_name", "tag"], // Tags used for indexing and querying
    },
  ],
});

export default function writeDataToInflux(data) {
  return influx.writePoints([
    {
      measurement: "data_measurement",
      tags: { connection_name: data.connection_name, tag: data.tag },
      fields: { value: data.value, name: data.name },
      timestamp: data.ts,
    },
  ]);
}
