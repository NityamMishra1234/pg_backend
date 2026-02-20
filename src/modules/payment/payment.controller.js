import { asyncHandler } from "../utils/asyncHandler.js";
import {
  addPayment,
  getStudentPayments,
  getDueStudents,
} from "./payment.service.js";

export const create = asyncHandler(async (req, res) => {
  const payment = await addPayment(req.body, req.user.id);

  res.status(201).json({
    success: true,
    message: "Payment recorded successfully",
    data: payment,
  });
});

export const getHistory = asyncHandler(async (req, res) => {
  const payments = await getStudentPayments(
    req.params.studentId,
    req.user.id
  );

  res.json({
    success: true,
    data: payments,
  });
});

export const getDue = asyncHandler(async (req, res) => {
  const students = await getDueStudents(req.user.id);

  res.json({
    success: true,
    data: students,
  });
});