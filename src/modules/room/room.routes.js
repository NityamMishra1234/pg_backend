import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { validateRoom } from "./room.validation.js";
import {
  create,
  getByPG,
  update,
  remove,
} from "./room.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", validateRoom("create"), create);
router.get("/:pgId", getByPG);
router.put("/:id", validateRoom("update"), update);
router.delete("/:id", remove);

export default router;