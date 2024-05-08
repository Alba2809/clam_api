import { Router } from "express";
import {
  getArtist,
  getArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  inactiveArtist,
  getArtistByName,
} from "../controllers/artist.controller.js";

const router = Router();

router.get("/", getArtists);
router.get("/:id", getArtist);
router.get("/name/:name", getArtistByName);
router.post("/", createArtist);
router.put("/:id", updateArtist)
router.delete("/:id", deleteArtist)
router.put("/:id/inactive", inactiveArtist)

export default router;
