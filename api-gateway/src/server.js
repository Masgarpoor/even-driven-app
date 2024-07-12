import app from "./app.js";

// import os from "os";
// import cluster from "cluster";

// const numCPU = os.cpus().length;

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);

//   for (let i = 0; i < numCPU; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
//     cluster.fork();
//   });
// } else {

//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`Worker ${process.pid} started and running on port ${PORT}`);
//   });
// }


  // const PORT = process.env.PORT || 3000;
  // app.listen(PORT, () => {
  //   console.log(`API Gateway started and running on port ${PORT}`);
  // });


import fs from "fs";
import https from "https";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "/security/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "/security/cert.pem")),
};

const httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(PORT, () => {
  console.log(`API Gatway Service is running on port ${PORT}`);
});
