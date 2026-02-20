import express from "express"
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./modules/auth/auth.routes.js";
import pgRoutes from "./modules/pg/pg.routes.js";
import roomRoutes from "./modules/room/room.routes.js";
import studentRoutes from "./modules/student/student.routes.js";
import paymentRoutes from "./modules/payment/payment.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/pg", pgRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/payments" , paymentRoutes)

// Must be last
app.use(errorHandler);

export default app;