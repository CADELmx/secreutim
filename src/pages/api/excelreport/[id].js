import { generateWorksheet } from "."
import { getTemplateJoinActivitiesById } from "@/models/transactions"

export default async function handler(req, res) {
    const { id } = req.query;
    const { data, error } = await getTemplateJoinActivitiesById(id)
    if (error) {
        res.status(500).json({ error: 'Error al obtener los datos' })
        return;
    }
    if (!data || data.length === 0) {
        res.status(404).json({ error: 'No se encontraron registros' })
    }

    const { workbook, worksheet, cellType } = generateWorksheet()

    data.forEach(async(record, i) => {
        record.actividad.forEach((act, j) => {
            const entries = Object.entries(act)
            const generateCell = cellType(act.distribucion_actividades)
            entries.forEach(([key, val]) => {
                if (act.distribucion_actividades === 'Gestión') {
                    const addCell = generateCell(key, act.tipo_gestion)
                    if (typeof addCell === 'function') {
                        addCell(j + 3, val)
                    }
                } else {
                    const addCell = generateCell(key, val)
                    if (typeof addCell === 'function') {
                        addCell(j + 3, val)
                    }
                }
            })
            worksheet.cell(3, 16, 7, 16, true).number(record.total)
        })
        const buffer = await workbook.writeToBuffer()
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.setHeader('Content-Disposition', `attachment; filename=Plantilla ${record.nombre}.xlsx`)
        res.send(buffer)
    })
}