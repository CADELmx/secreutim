import { checkExistentComment, deleteComment, insertActivities, insertComment, insertTemplate, setTemplateStatus, updateComment } from "@/models/transactions";
import { generateTemplateObject } from "@/utils";
import { Server } from "socket.io";

const iohandler = (_, res) => {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            },
            allowEIO3: true,
            transports: ['websocket', 'polling']
        })
        const onUpdateStatus = async statusObject => {
            const { error } = await setTemplateStatus(statusObject.id, statusObject.status.name)
            io.emit('updateStatus', { error, ...statusObject })
        }
        const onCreateComment = async commentObject => {
            const { data } = await checkExistentComment(commentObject.id)
            if (data.length > 0) {
                const { error } = await updateComment(commentObject.id, commentObject.comment)
                io.emit('existentComment', { error })
                return
            }
            const { error } = await insertComment(commentObject.id, commentObject.comment)
            io.emit('createComment', { error, id: commentObject.id })
        }
        const onCreateTemplate = async templateObject => {
            const template = generateTemplateObject(templateObject)
            const { error: templateError, data } = await insertTemplate(template)
            if (templateError) {
                io.emit('templateError', 'Error al guardar plantilla')
                return
            }
            const activities = templateObject.actividades.map(p => ({
                ...p,
                plantilla_id: data[0]?.id,
            }))
            const { error: actError } = await insertActivities(activities)
            const newTemplate = {
                id: data[0]?.id,
                ...templateObject,
            }
            if (actError) {
                io.emit('templateError', 'Error al guardar carga académica')
                return
            }
            io.emit('createdTemplate', newTemplate)
        }
        const onDeleteComment = async commentObject => {
            const { error } = await deleteComment(commentObject.id)
            io.emit('deleteComment', { error, id: commentObject.id })
        }
        io.on('connection', socket => {
            socket.emit('connection', socket.id)
            socket.on('updateStatus', onUpdateStatus)
            socket.on('createTemplate', onCreateTemplate)
            socket.on('createComment', onCreateComment)
            socket.on('deleteComment', onDeleteComment)
        })
        res.socket.server.io = io
    } else {
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