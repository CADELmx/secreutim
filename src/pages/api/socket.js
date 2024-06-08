import {  } from "module";
import { Server } from "socket.io";

const iohandler = (req, res) => {
    if(!res.socket.server.io) {
        const io = new Server(res.socket.server)
        io.on('connection', socket => {
            socket.on('notify', notificationObject => {
                socket.emit('notify', notificationObject)
            })
        })
        res.socket.server.io = io
    }else{
        console.log('Using existing socket')
    }
    res.end()
}

export default iohandler