import { ModalError } from "@/components/ModalError"
import { StoredContext } from "@/context"
import { generateRecords, getCommentsJoinTemplates } from "@/models/transactions"
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useEffect, useState } from "react"

const colors = {
    'Aprobado': 'success',
    'Corrección': 'danger',
    'Pendiente': 'warning'
}

export default function TemplatesStatus({ comments, error }) {
    const { memory: { socket } } = StoredContext()
    const [templates, setTemplates] = useState(comments || [])
    useEffect(() => {
        const onUpdateStatus = (statusObject) => {
            setTemplates((templates) => templates.map(({plantilla}) => {
                if (plantilla.id === statusObject.id) {
                    return {
                        ...template,
                        plantilla:{
                            ...template.plantilla,status: statusObject.plantilla.status.name
                        }
                    }
                }
                return template
            }))
        }
        socket.on('updateStatus', onUpdateStatus)
        return () => {
            socket.off('updateStatus')
        }
    }, [])

    return (
        <div className="grid content-center justify-center">
            <ModalError error={error} />
            <p className="tracking-widest p-2 m-2">Formatos enviados</p>
            <section className="flex-col">
                {
                    templates.length > 0 ? (
                        <Table aria-label="tabla de plantillas">
                            <TableHeader aria-label="cabecera de la tabla">
                                <TableColumn aria-label="columna nombre">Nombre</TableColumn>
                                <TableColumn aria-label="columna horas">Horas</TableColumn>
                                <TableColumn aria-label="columna estado">Estado</TableColumn>
                                <TableColumn aria-label="columna comentarios">Comentarios</TableColumn>
                            </TableHeader>
                            <TableBody items={templates}>
                                {
                                    (template) => (
                                        <TableRow key={template.id}>
                                            <TableCell aria-label="nombre">{template.plantilla.nombre}</TableCell>
                                            <TableCell aria-label="horas">{template.plantilla.total}</TableCell>
                                            <TableCell aria-label="estado">
                                                <Chip color={colors[template.plantilla.status]}>{template.plantilla.status}</Chip>
                                            </TableCell>
                                            <TableCell aria-label="comentarios">{template?.comentario || 'Sin comentario'}</TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-center">No hay contenido</p>
                    )
                }
            </section>
        </div>
    )
}

export const getStaticProps = async () => {
    const {data,error} = await getCommentsJoinTemplates()
    return {
        revalidate: 1,
        props: {
            comments: data,
            error
        }
    }
}