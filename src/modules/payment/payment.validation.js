import Joi from "joi";

const schema = Joi.object({
  studentId: Joi.string().required(),
  amount: Joi.number().required(),
  paymentMode: Joi.string()
    .valid("CASH", "UPI", "BANK")
    .required(),
});

export const validatePayment = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};