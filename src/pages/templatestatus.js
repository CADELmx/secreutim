import { StoredContext } from "@/context"
import { generateRecords } from "@/models/transactions"
import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useEffect, useState } from "react"

const colors = {
    'Aprobado': 'success',
    'Corrección': 'danger',
    'Pendiente': 'warning'
}

export default function TemplatesStatus({ plantillas }) {
    const { memory: { socket } } = StoredContext()
    const [templates, setTemplates] = useState(plantillas || [])
    useEffect(() => {
        const onUpdateStatus = (statusObject) => {
            setTemplates((templates) => templates.map((template) => {
                if (template.id === statusObject.id) {
                    return {
                        ...template,
                        status: statusObject.status.name
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
        <div>
            {
                templates.length > 0 ? (
                    <Table aria-label="tabla de plantillas">
                        <TableHeader aria-label="cabecera de la tabla">
                            <TableColumn aria-label="columna nombre">Nombre</TableColumn>
                            <TableColumn aria-label="columna actividades">Actividades</TableColumn>
                            <TableColumn aria-label="columna horas">Horas</TableColumn>
                            <TableColumn aria-label="columna estado">Estado</TableColumn>
                        </TableHeader>
                        <TableBody items={templates}>
                            {
                                (template) => (
                                    <TableRow key={template.id}>
                                        <TableCell aria-label="nombre">{template.nombre}</TableCell>
                                        <TableCell aria-label="actividades">{template.actividades.length}</TableCell>
                                        <TableCell aria-label="horas">{template.horas}</TableCell>
                                        <TableCell aria-label="estado">
                                            <Chip color={colors[template.status]}>{template.status}</Chip>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-center">No hay contenido</p>
                )
            }
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