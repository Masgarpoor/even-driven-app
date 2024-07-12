import Influx from "influx";

const influx = new Influx.InfluxDB({
  host: "influxdb",
  port: "8086",
  database: "test_db",
  username: "username",
  password: "password",
});

const queryData = async (startTime, endTime, name, connection_name) => {
  // console.log(startTime);
  // console.log(new Date(new Date(startTime).toISOString()).toLocaleString());
  // console.log(endTime);
  // console.log(new Date(new Date(endTime).toISOString()).toLocaleString());
  // console.log(name);
  const query = `SELECT "value", "name", "ts" FROM "test_db"."autogen"."data_measurement"
                 WHERE "ts" >= ${startTime} AND "ts" < ${endTime} AND "name" = '${name}' AND "connection_name"='${connection_name}'`; // !! To enter the amount of time, we must use the single qute
  const data = await influx.query(query);
  return data;
};

export default queryData;
