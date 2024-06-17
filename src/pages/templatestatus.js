import { ModalError } from "@/components/ModalError"
import { StoredContext } from "@/context"
import { getTemplateJoinActivities } from "@/models/transactions"
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useEffect, useState } from "react"

const colors = {
    'Aprobado': 'success',
    'Corrección': 'danger',
    'Pendiente': 'warning'
}

export default function TemplatesStatus({ plantillas, error }) {
    const { memory: { socket } } = StoredContext()
    const [templates, setTemplates] = useState(plantillas || [])
    useEffect(() => {
        const onUpdateStatus = (statusObject) => {
            setTemplates((templates) => templates.map((plantilla) => {
                if (plantilla.id === statusObject.id) {
                    return {
                        ...plantilla,
                        status: statusObject.status.name
                    }
                }
                return plantilla
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
                                            <TableCell aria-label="nombre">{template.nombre}</TableCell>
                                            <TableCell aria-label="horas">{template.total}</TableCell>
                                            <TableCell aria-label="estado">
                                                <Chip variant="dot" color={colors[template.status]}>{template.status}</Chip>
                                            </TableCell>
                                            <TableCell aria-label="comentarios">{template.comentarios?.comentario || 'Sin comentario'}</TableCell>
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
    const { data, error } = await getTemplateJoinActivities()
    if (error) {
        return {
            props: {
                error: 'Error al obtener las plantillas, recarga la página'
            }
        }
    }
    return {
        revalidate: 3,
        props: {
            plantillas: data
        }
    }
}