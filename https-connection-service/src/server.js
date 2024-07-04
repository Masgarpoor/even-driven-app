import app from "./app.js";

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`HTTPS Connection Service is running on port ${PORT}`);
});
