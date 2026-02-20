import Joi from "joi";

const schemas = {
  create: Joi.object({
    name: Joi.string().min(3).required(),
    address: Joi.string().min(5).required(),
  }),

  update: Joi.object({
    name: Joi.string().min(3),
    address: Joi.string().min(5),
  }),
};

export const validatePG = (type) => (req, res, next) => {
  const { error } = schemas[type].validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};