function logProcessPID(req, res, next) {
  console.log(`Request received by worker ${process.pid}`);
  next();
}


export default logProcessPID;