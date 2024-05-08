import { Router } from "express";
import {
  register,
  getStaff
} from "../controllers/staff.controller.js";

const router = Router();

router.post("/", register);
router.get("/:id", getStaff);

export default router;
