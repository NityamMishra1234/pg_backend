import cron from "node-cron";
import Student from "../student/student.model.js";

export const startDueChecker = () => {
  cron.schedule("0 9 * * *", async () => {
    console.log("Running due payment check...");

    const today = new Date();

    const dueStudents = await Student.find({
      isActive: true,
      paymentDueDate: { $lte: today },
    });

    dueStudents.forEach((student) => {
      console.log(
        `Reminder: ${student.name} payment is due`
      );

      // 🔥 Later integrate:
      // - Email
      // - SMS
      // - WhatsApp
      // - Push notification
    });
  });
};