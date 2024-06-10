import { ChangeEstatus } from "@/components/ChangeEstatus";
import { StoredContext } from "@/context";
import { supabase } from "@/utils";
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Secretary({plantillas}) {
  const { memory: { socket } } = StoredContext()
  const [conectedUsers, setConectedUsers] = useState([]);
  const [templates, setTemplates] = useState([]);
  useEffect(() => {
    const onConnect = () => {
      setConectedUsers([...conectedUsers, socket.id])
    }
    const onDisconnect = () => {
      setConectedUsers(conectedUsers.filter(user => user !== socket.id))
    }
    const onNotify = (notificationObject) => {
      setTemplates((notifications) => ([...notifications, notificationObject]))
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
          templates.length > 0 ? (
            <Table>
              <TableHeader>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Puesto</TableColumn>
                <TableColumn>Actividades</TableColumn>
                <TableColumn>Estado</TableColumn>
              </TableHeader>
              <TableBody>
                {
                  templates.map((template, _) => {
                    return (
                      <TableRow key={template.id}>
                        <TableCell>{template.nombre}</TableCell>
                        <TableCell>{template.puesto}</TableCell>
                        <TableCell>{template.actividades.length}</TableCell>
                        <TableCell className="p-0 m-0">
                          <ChangeEstatus status={template.status} templateid={template.id} />
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          ) : (
            <p className="text-center">Nada recibido aún</p>
          )
        }
      </section>
    </div>
  )
}

export const getStaticProps = async () => {
  const { data, error } = await supabase.from('actividad').select('id,distribucion_actividades,programaseducativos (id),plantillas (id)')
  console.log(data, error)
  return {
    props: {
      plantillas: data,
    }
  }
}