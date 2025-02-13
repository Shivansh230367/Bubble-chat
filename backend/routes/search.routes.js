import searchUsers from "../controllers/search.controller.js";
import express from "express";

const router = express.Router();

// Search route
router.get("/", searchUsers);

export default router;