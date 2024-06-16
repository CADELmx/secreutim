import { getTemplateJoinActivitiesById } from "@/models/transactions"
import { generateWorksheet } from "."

export default async function handler(req, res) {
    const { id } = req.query
    const { data, error } = await getTemplateJoinActivitiesById(id)
    data.map(async (record, i) => {
        const { workbook, worksheet, cellType } = generateWorksheet()
        record.actividad.map((act, j) => {
            const entries = Object.entries(act)
            const generateCell = cellType(act.distribucion_actividades)
            entries.map(([key, val]) => {
                if (act.distribucion_actividades === 'Gestión') {
                    const addCell = generateCell(key, act.tipo_gestion)
                    if (typeof addCell === 'function') {
                        addCell(j + 3, val)
                    }
                    return
                }
                const addCell = generateCell(key, val)
                if (typeof addCell === 'function') {
                    addCell(j + 3, val)
                }
            })
        })
        const buffer = await workbook.writeToBuffer()
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.setHeader('Content-Disposition', `attachment; filename=Plantilla ${record.nombre}.xlsx`)
        res.send()
        res.end(buffer)
    })
}