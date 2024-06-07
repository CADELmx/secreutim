const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");

const hostname = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        socket.on("notify", (notificationObject) => {
            io.emit("notify", notificationObject);
        });
    });
    httpServer.once("error",(err)=>{
        console.error(err);
        process.exit(1);
    }).listen(port, () => {
        console.log("Server running on port 4000");
    });
})

