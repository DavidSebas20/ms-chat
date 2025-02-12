require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const chatRoutes = require("./src/routes/chatRoutes");
const webhookHandler = require("./src/utils/webhookHandler");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

// Rutas de chat
app.use("/chat", chatRoutes);

// Webhook para activación de chat
app.post("/webhook", webhookHandler(io));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Chat service running on port ${PORT}`);
});
