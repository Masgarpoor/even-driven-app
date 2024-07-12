import axios from "axios";
import https from "https";

import chalk from "chalk";

const NUMBER_OF_CONNECTIONS = 10;
const RATE = 100; // 100 ms interval, 10 data per second
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const success = chalk.bold.green;
const faild = chalk.bold.red;

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
  const ts = new Date().getTime();

  return {
    name: `${nameList[Math.floor(Math.random() * nameList.length)]}`,
    value: (Math.random() * 100).toFixed(2),
    ts,
  };
};

const sendRequest = async (url, data) => {
  try {
    const response = await axios.post(url, data, { httpsAgent });

    console.log(
      success(`Request sent and recieved ${JSON.stringify(response.data)}`)
    );
  } catch (error) {
    console.error(
      faild(
        `Failed to send request to ${url}:`,
        JSON.stringify(error.response.data)
      )
    );
  }
};

const query = async () => {
  const startTime = "1403-04-23T01:00:00";
  const endTime = "1403-04-23T02:00:00";
  const name = "temperature";
  const connectionName = "connection_84";

  try {
    const response = await axios.get(
      `https://localhost:3000/api/${connectionName}/data?startTime=${startTime}&endTime=${endTime}&name=${name}`,
      { httpsAgent }
    );
    const result = response.data.body;
    
    console.log(success(`Query sent and recieved :`));
    console.table(result);
  } catch (error) {
    console.log(error);
  }
};

const main = () => {
  const connectionNames = generateConnectionNames(NUMBER_OF_CONNECTIONS);

  setInterval(async () => {
    for (let connectionName of connectionNames) {
      const connectionUrl = `https://localhost:3000/api/connections/${connectionName}`;
      const dataUrl = `https://localhost:3000/api/${connectionName}/data`;

      const connectionParam = { parameters: generateParameters() };
      const requestData = generateRandomDate();

      await sendRequest(connectionUrl, connectionParam);
      await sendRequest(dataUrl, requestData);

      // Adding delay between each connection request
      await new Promise((resolve) => setTimeout(resolve, RATE));
    }
  }, RATE);
};

// main();
query();
