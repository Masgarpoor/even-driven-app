import Joi from "joi";

function validateDataFormat(req, res, next) {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).json({
      success: false,
      message: "Invalid Content-Type. Expected application/json",
    });
  }
  const schema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z0-9_]+$/).required(),
    value: Joi.string().required(),
    ts: Joi.number().integer().required(),
  });

  const data = req.body;
  const { error } = schema.validate(data);

  if (!error) {
    next();
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid data format.",
    });
  }
}

export default validateDataFormat;
