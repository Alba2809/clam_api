import { Router } from "express";
import {
  getArtist,
  getArtists,
  createArtist,
  updateArtist,
  deleteArtist,
} from "../controllers/artist.controller.js";

const router = Router();

router.get("/", getArtists);
router.get("/:id", getArtist);
router.post("/", createArtist);
router.put("/:id", updateArtist)
router.delete("/:id", deleteArtist)

export default router;
