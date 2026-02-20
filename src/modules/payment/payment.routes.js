import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { validatePayment } from "./payment.validation.js";
import {
  create,
  getHistory,
  getDue,
} from "./payment.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", validatePayment, create);
router.get("/student/:studentId", getHistory);
router.get("/due", getDue);

export default router;