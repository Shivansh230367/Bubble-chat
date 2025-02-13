import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import searchRoutes from "./routes/search.routes.js";
import requestRoutes from "./routes/request.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use(cors()); // Enable CORS

app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/request", requestRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

if (!server.listening) {
    server.listen(PORT, () => {
        connectToMongoDB();
        console.log(`Server Running on port ${PORT}`);
    });
}

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'ERR_SERVER_ALREADY_LISTEN') {
        console.error('Server is already listening on this port.');
    } else {
        console.error('Server error: ', err);
    }
});

// Gracefully close the server on process termination
const gracefulShutdown = () => {
    server.close(() => {
        console.log('Process terminated, server closed.');
        process.exit(0);
    });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
