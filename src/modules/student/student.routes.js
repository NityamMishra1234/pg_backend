import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { validateStudent } from "./student.validation.js";
import {
  create,
  changeBed,
  remove,
  search,
  list,
  getByBed
} from "./student.controller.js";

const router = express.Router();

router.use(protect);

// Add student
router.post("/", validateStudent("create"), create);

// Change bed
router.put("/:id/change-bed", validateStudent("changeBed"), changeBed);

// Soft delete
router.delete("/:id", remove);

router.get("/", list);

router.get("/bed/:roomId/:bedNumber", getByBed);

router.get("/search", search);

export default router;