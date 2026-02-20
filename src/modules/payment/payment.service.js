import Payment from "./payment.model.js";
import Student from "../student/student.model.js";

export const addPayment = async (data, ownerId) => {
  const { studentId, amount, paymentMode } = data;

  const student = await Student.findOne({
    _id: studentId,
    ownerId,
    isActive: true,
  });

  if (!student) throw new Error("Student not found");

  const now = new Date();

  const payment = await Payment.create({
    ownerId,
    studentId,
    amount,
    paymentMode,
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });

  // 🔥 Move Due Date Forward
  if (student.paymentType === "MONTHLY") {
    student.paymentDueDate.setMonth(
      student.paymentDueDate.getMonth() + 1
    );
  } else {
    student.paymentDueDate.setFullYear(
      student.paymentDueDate.getFullYear() + 1
    );
  }

  await student.save();

  return payment;
};

export const getStudentPayments = async (studentId, ownerId) => {
  return await Payment.find({
    studentId,
    ownerId,
  }).sort({ createdAt: -1 });
};

export const getDueStudents = async (ownerId) => {
  const today = new Date();

  return await Student.find({
    ownerId,
    isActive: true,
    paymentDueDate: { $lte: today },
  });
};