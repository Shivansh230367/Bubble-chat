import express from "express";
import { sendRequest, acceptRequest, rejectRequest,receiveRequests } from "../controllers/request.controller.js";

const router = express.Router();

router.post("/send", sendRequest);
router.post("/recieve",receiveRequests)
router.post("/accept", acceptRequest);
router.post("/reject", rejectRequest);

export default router;
