import Joi from "joi";

const schemas = {
  create: Joi.object({
    pgId: Joi.string().required(),
    roomId: Joi.string().required(),
    bedNumber: Joi.number().required(),

    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    aadhaarNumber: Joi.string().required(),

    motherName: Joi.string().required(),
    fatherName: Joi.string().required(),
    guardianPhone: Joi.string().required(),

    paymentType: Joi.string()
      .valid("MONTHLY", "YEARLY")
      .required(),

    monthlyAmount: Joi.number().when("paymentType", {
      is: "MONTHLY",
      then: Joi.required(),
    }),

    yearlyAmount: Joi.number().when("paymentType", {
      is: "YEARLY",
      then: Joi.required(),
    }),
  }),

  changeBed: Joi.object({
    newRoomId: Joi.string().required(),
    newBedNumber: Joi.number().required(),
  }),
};

export const validateStudent = (type) => (req, res, next) => {
  const { error } = schemas[type].validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};