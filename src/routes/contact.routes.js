import { Router } from "express";
import {
  register,
  getContacts
} from "../controllers/contact.controller.js";

const router = Router();

router.post("/", register);
router.get("/:id", getContacts);

export default router;
