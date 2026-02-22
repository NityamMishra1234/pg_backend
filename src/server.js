import dotenv from "dotenv";
import connectDb from "../src/config/db.js"
import app from "../src/app.js";
import { startDueChecker } from "./modules/utils/cron.js";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env",
});


await connectDb();

const PORT = process.env.PORT || 5000;
startDueChecker();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});