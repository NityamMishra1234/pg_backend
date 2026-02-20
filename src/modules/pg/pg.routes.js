import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "./pg.controller.js";
import { validatePG } from "./pg.validation.js";

const router = express.Router();

router.use(protect); 

router.post("/", validatePG("create"), create);
router.get("/", getAll);
router.get("/:id", getOne);
router.put("/:id", validatePG("update"), update);
router.delete("/:id", remove);

export default router;