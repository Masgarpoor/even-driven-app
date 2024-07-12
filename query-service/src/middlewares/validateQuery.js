import validator from "validator";

export default function validateQuery(req, res, next) {
  try {
    const { startTime, endTime, name } = req.query;
    if (!startTime || !endTime || !name) {
      throw {
        status: 400,
        message: "Please enter query parameters: startTime, endTime, name",
      };
    }

    if (!validator.isISO8601(startTime) || !validator.isISO8601(endTime)) {
      throw {
        status: 400,
        message: "Invalid date: Pleast enter date in ISO format",
      };
    }

    const nameRegex = /^[a-zA-Z0-9_]+$/;
    if (!nameRegex.test(name)) {
      throw {
        status: 400,
        message:
          "Invalid name: Use only letters and numbers for the name without spaces",
      };
    }

    next();
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "Internal server error";
    console.log(`Error in validation query: ${message}`);

    res.status(status).json({
      success: false,
      message,
    });
  }
}
