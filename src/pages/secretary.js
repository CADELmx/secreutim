import { ChangeEstatus } from "@/components/ChangeEstatus";
import { StoredContext } from "@/context";
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Secretary() {
  const { memory: { socket } } = StoredContext()
  const [conectedUsers, setConectedUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const onConnect = () => {
      setConectedUsers([...conectedUsers, socket.id])
    }
    const onDisconnect = () => {
      setConectedUsers(conectedUsers.filter(user => user !== socket.id))
    }
    const onNotify = (notificationObject) => {
      setNotifications((notifications) => ([...notifications, notificationObject]))
      console.log(notifications)
    }
    socket.on('connection', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('notify', onNotify)
    return () => {
      socket.off('connection');
    };
  }, []);
  return (
    <div className="grid content-center justify-center">
      <h1 className="text-2xl font-bold text-center text-utim tracking-widest capitalize p-2 m-2">Secretaría académica</h1>
      <p className="tracking-widest p-2 m-2">Formatos recibidos</p>
      <section className="flex-col">
        {
          conectedUsers.map((user, i) => (
            <Chip key={i} color="success" variant="dot">{user}</Chip>
          ))
        }
      </section>
      <section className="flex-col">
        {
          notifications.length > 0 ? (
            <Table>
              <TableHeader>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Puesto</TableColumn>
                <TableColumn>Actividades</TableColumn>
                <TableColumn>Estado</TableColumn>
              </TableHeader>
              <TableBody>
                {
                  notifications.map((notification, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{notification.nombre}</TableCell>
                        <TableCell>{notification.puesto}</TableCell>
                        <TableCell>{notification.actividades.length}</TableCell>
                        <TableCell className="p-0 m-0">
                          <ChangeEstatus></ChangeEstatus>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          ):(
            <p className="text-center">Nada recibido aún</p>
          )
        }
      </section>
    </div>
  )
}
