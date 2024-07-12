import PQueue from 'p-queue';
import axios from 'axios';

// تعریف صف با محدودیت تعداد همزمان پردازش‌ها
const queue = new PQueue({ concurrency: 10 });

queue.on('completed', (result, job) => {
  console.log(`Job completed with result: ${result}`);
});

queue.on('failed', (error, job) => {
  console.log(`Job failed with error: ${error}`);
});


export default function addJobToQueue(jobData) {
  return queue.add(async () => {
    try {
      const { method, url, data, headers } = jobData;
      console.log(`Processing ${method} request to ${url}`);
      console.log(`Data: ${JSON.stringify(data)}`); 
      console.log(`Headers: ${JSON.stringify(headers)}`);

      const response = await axios({
        method,
        url,
        data,
        headers,
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
