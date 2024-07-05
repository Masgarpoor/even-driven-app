import Influx from "influx";

const influx = new Influx.InfluxDB({
  host: "localhost",
  port: "8086",
  database: "test_db",
  username: "username",
  password: "password",
});

const queryData = (startTime, endTime, name) => {
  const query = `
    SELECT * FROM data_measurement
    WHERE time >= '${startTime}' AND time <= '${endTime}' AND name = '${name}'
  `;
  return influx.query(query);
};

export default queryData;
