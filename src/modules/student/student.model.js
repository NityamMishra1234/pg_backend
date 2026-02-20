import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
      index: true,
    },
    pgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PG",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    bedNumber: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
      index: true,
    },
    aadhaarNumber: {
      type: String,
      required: true,
    },
    motherName: String,
    fatherName: String,
    guardianPhone: String,

    paymentType: {
      type: String,
      enum: ["MONTHLY", "YEARLY"],
      required: true,
    },
    monthlyAmount: Number,
    yearlyAmount: Number,

    paymentDueDate: Date,

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

// 🔥 Text Search Index
studentSchema.index({
  name: "text",
  email: "text",
  phone: "text",
});

const Student = mongoose.model("Student", studentSchema);

export default Student;