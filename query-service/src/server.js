import cluster from "cluster";

import app from "./app.js";

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < 2; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });
} else {
  const PORT = process.env.PORT || 3004;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started and running on port ${PORT}`);
  });
}

// const PORT = process.env.PORT || 3004;

// app.listen(PORT, () => {
//   console.log(`Query Service is running on port ${PORT}`);
// });
