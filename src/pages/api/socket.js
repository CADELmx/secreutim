import { Server } from "socket.io";

const iohandler = (_, res) => {
    if(!res.socket.server.io) {
        const io = new Server(res.socket.server,{
            cors: {
                origin: '*',
                methods: ['GET','POST']
            },
            allowEIO3: true,
            transports: ['websocket','polling']
        })
        io.on('connection', socket => {
            socket.emit('connection',socket.id)
            socket.on('templateSend', templateObject => {
                io.emit('templateSave', templateObject)
            })
            socket.on('updateStatus', statusObject => {
                io.emit('updateStatus', statusObject)
            })
        })
        res.socket.server.io = io
    }else{
        console.log('Using existing socket')
    }
    res.end()
}

export const config = {
    api: {
        bodyParser: false
    }
}

export default iohandler