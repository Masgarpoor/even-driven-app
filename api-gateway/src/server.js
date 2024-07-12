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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gatway Service is running on port ${PORT}`);
});
