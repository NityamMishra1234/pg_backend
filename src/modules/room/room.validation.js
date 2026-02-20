import Joi from "joi";

const schemas = {
  create: Joi.object({
    pgId: Joi.string().required(),
    roomNumber: Joi.string().required(),
    totalBeds: Joi.number().min(1).required(),
  }),

  update: Joi.object({
    roomNumber: Joi.string(),
    totalBeds: Joi.number().min(1),
  }),
};

export const validateRoom = (type) => (req, res, next) => {
  const { error } = schemas[type].validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};