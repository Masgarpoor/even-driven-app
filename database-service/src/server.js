import cluster from "cluster";
import os from 'os';

import "dotenv/config";
import app from "./app.js";

// const numCPU = os.cpus().length;

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);

//   for (let i = 0; i < 2; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Database Service: Worker ${worker.process.pid} died. Forking a new worker...`);
//     cluster.fork();
//   });
// } else {
//   const PORT = process.env.PORT || 3001;  
//   app.listen(PORT, () => {
//     console.log(`Database Service: Worker ${process.pid} started and running on port ${PORT}`);
//   });
// }
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`MongoDB Service is running on port ${PORT}`);
});
