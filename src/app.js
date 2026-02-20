import express from "express"
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes.js";
import pgRoutes from "./modules/pg/pg.routes.js";
import roomRoutes from "./modules/room/room.routes.js";
import studentRoutes from "./modules/student/student.routes.js";
import paymentRoutes from "./modules/payment/payment.routes.js"
import { errorHandler } from "./middleware/error.middleware.js";
import rateLimit from "express-rate-limit";

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },
});

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(morgan("dev"));

app.use(express.json({ limit: "10kb" }));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" , message : "Welcome to the new world Nityam" });
});

app.use("/api", apiLimiter);
app.use("/api/auth", authRoutes , authLimiter);
app.use("/api/pg", pgRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/payments" , paymentRoutes)

// Must be last
app.use(errorHandler);

export default app;