function validateDataFormat(req, res, next) {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).json({
      success: false,
      message: "Invalid Content-Type. Expected application/json",
    });
  }

  const { name, value, ts } = req.body;
  if (
    typeof name === "string" &&
    typeof value === "string" &&
    typeof ts === "number"
  ) {
    next();
  }
}

export default validateDataFormat;
