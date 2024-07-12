import PQueue from 'p-queue';
import axios from 'axios';

const queue = new PQueue({ concurrency: 10 });

queue.on('completed', (result, job) => {
  console.log(`Job completed with result: ${JSON.stringify(result)}`);
});

queue.on('failed', (error, job) => {
  console.log(`Job failed with error: ${error}`);
});


export default function addJobToQueue(jobData) {
  return queue.add(async () => {
    try {
      const { method, url, data, headers } = jobData;
      const response = await axios({
        method,
        url,
        data,
        timeout: 30000,  
      });

      console.log("Response Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in sending request:", error.message);
      throw error;
    }
  });
}
