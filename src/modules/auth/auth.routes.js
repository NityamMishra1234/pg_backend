import express from "express";
import { register, login } from "./auth.controller.js";
import { validate } from "./auth.validation.js";

const router = express.Router();

router.post("/owner/register", validate("register"), register);
router.post("/owner/login", validate("login"), login);


export default router;