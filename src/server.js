import dotenv from "dotenv";
import connectDb from "../src/config/db.js"
import app from "../src/app.js";
import { startDueChecker } from "./modules/utils/cron.js";
import cors from "cors";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env",
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
await connectDb();

const PORT = process.env.PORT || 5000;
startDueChecker();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});