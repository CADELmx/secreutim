import { io } from "socket.io-client";

const browser = typeof window !== "undefined";
console.log("browser", browser);
const hostname = browser ? window.location.hostname : 'localhost';
console.log("hostname", hostname);
const socket = browser ? io(`http://${hostname}:${process.env.NEXT_PUBLIC_PORT}`) : {}

export default socket;