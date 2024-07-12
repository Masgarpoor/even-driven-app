import axios from "axios";

const NUMBER_OF_CONNECTIONS = 1;
const RATE = 100; // 100 ms interval, 10 data per second

const generateConnectionNames = (numberOfConnection) => {
  return Array.from(
    { length: numberOfConnection },
    (_, index) => `connection_${Math.floor(Math.random() * 100)}`
  );
};

const generateParameters = () => {
  return {
    param1: `value${Math.ceil(Math.random() * 100)}`,
    param2: `value${Math.ceil(Math.random() * 100)}`,
  };
};

const generateRandomTimeStamp = () => {
  const startDate = Date.now();
  const endDate = new Date("2035-01-01").getTime();

  return Math.ceil(Math.random() * (endDate - startDate)) + startDate;
};

const generateRandomDate = () => {
  const nameList = ["temperature", "humidity"];
  return {
    name: `${nameList[Math.floor(Math.random() * nameList.length)]}`,
    value: (Math.random() * 100).toFixed(2),
    ts: generateRandomTimeStamp(),
  };
};

async function sendConnection() {
  const connectionNames = generateConnectionNames(NUMBER_OF_CONNECTIONS);
  const start = Date.now();
  for (let connectionName of connectionNames) {
    const pid = process.pid;
    const parameters = {
      parameters: generateParameters(),
    };
    try {
      await axios.post(
        `https://localhost:3000/api/connections/${connectionName}`,
        parameters
      );
      console.log(`Connection ${connectionName} send to MongoDB with ${pid}`);
    } catch (error) {
      console.log(
        `Failed to send connection ${connectionName}:`,
        error
      );
    }
  }
  const end = Date.now() - start;
  console.log(`Time to send connections: ${end}`);
}

async function sendData() {
  const connectionNames = generateConnectionNames(NUMBER_OF_CONNECTIONS);
  const start = Date.now();
  for (let connectionName of connectionNames) {
    const pid = process.pid;
    const data = generateRandomDate();
    try {
      await axios.post(
        `https://localhost:3000/api/${connectionName}/data`,
        data
      );
      console.log(
        `Data ${JSON.stringify(
          data
        )} send to https-connection-service with ${pid} by ${connectionName}`
      );
    } catch (error) {
      console.log(`Failed to send data ${JSON.stringify(data)} by ${connectionName}:`, error.response.data);
    }
  }
  const end = Date.now() - start;
  console.log(`Time to send data: ${end}`);
}

sendConnection()
// sendData();


