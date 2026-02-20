import mongoose from "mongoose";

const pgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
    
  },
  { timestamps: true }
);

const PG = mongoose.model("PG", pgSchema);

export default PG;