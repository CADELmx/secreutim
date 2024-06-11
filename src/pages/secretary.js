
import { ChangeStatus } from "@/components/ChangeStatus";
import { ModalError } from "@/components/ModalError";
import { StoredContext } from "@/context";
import { generateRecords } from "@/models/transactions";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Secretary({ plantillas, error }) {
  const { memory: { socket } } = StoredContext()
  const [templates, setTemplates] = useState(plantillas || []);
  useEffect(() => {
    const onTemplateSave = (templateObject) => {
      setTemplates((templates) => ([...templates, templateObject]))
    }
    socket.on('templateSave', onTemplateSave)
    return () => {
      socket.off('connection');
    };
  }, []);
  return (
    <div className="grid content-center justify-center">
      <ModalError error={error} />
      <h1 className="text-2xl font-bold text-center text-utim tracking-widest capitalize p-2 m-2">Secretaría académica</h1>
      <p className="tracking-widest p-2 m-2">Formatos recibidos</p>
      <section className="flex-col">
        {
          templates.length > 0 ? (
            <Table aria-label="tabla de plantillas">
              <TableHeader aria-label="cabecera de la tabla">
                <TableColumn aria-label="columna nombre">Nombre</TableColumn>
                <TableColumn aria-label="columna actividades">Actividades</TableColumn>
                <TableColumn aria-label="columna horas">Horas</TableColumn>
                <TableColumn aria-label="columna estado">Estado</TableColumn>
              </TableHeader>
              <TableBody aria-label="cuerpo de la tabla" items={templates} emptyContent={<h1 className="tracking-widest p-2 m-2">Nada recibido aún</h1>}>
                {
                  (template) => (
                    <TableRow key={template.id}>
                      <TableCell aria-label="nombre">{template.nombre}</TableCell>
                      <TableCell aria-label="numero de actividades">{template.actividades.length}</TableCell>
                      <TableCell aria-label="total horas">{template.total}</TableCell>
                      <TableCell className="p-0 m-0" aria-label="estado">
                        <ChangeStatus status={template.status} templateid={template.id} />
                      </TableCell>
                    </TableRow>
                  )
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
  const { props } = await generateRecords()
  return {
    revalidate: 1,
    props: {
      ...props
    }
  }
}