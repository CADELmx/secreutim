import { getTemplateJoinActivities } from "@/models/transactions"
import style from "excel4node/distribution/lib/style"
import Workbook from "excel4node/distribution/lib/workbook/workbook"

const styleOptions = {
    font: {
        bold: true,
        name: 'Arial',
        size: 10
    },
    alignment: {
        horizontal: 'center',
        vertical: 'center',
        wrapText: true
    },
    border: {
        left: {
            style: 'thin',
            color: 'black'
        },
        right: {
            style: 'thin',
            color: 'black'
        },
        top: {
            style: 'thin',
            color: 'black'
        },
        bottom: {
            style: 'thin',
            color: 'black'
        }
    }
}

export const generateWorkSheet = () => {
    const workbook = new Workbook()
    const cellStyle = new style(workbook, styleOptions)
    const greenStyle = new style(workbook, {
        ...styleOptions,
        fill: {
            type: 'pattern',
            patternType: 'solid',
            bgColor: '#04c073',
            fgColor: '#04c073'
        }
    })
    const blueStyle = new style(workbook, {
        ...styleOptions,
        fill: {
            type: 'pattern',
            patternType: 'solid',
            bgColor: '#4fe4de',
            fgColor: '#4fe4de'
        }
    })
    const worksheet = workbook.addWorksheet('Hoja 1')
    worksheet.row(1).setHeight(13)
    worksheet.row(2).setHeight(50)
    worksheet.column(1).setWidth(9)
    worksheet.column(2).setWidth(24)
    worksheet.column(2).setWidth(24)
    worksheet.column(3).setWidth(9)
    worksheet.column(4).setWidth(9)
    worksheet.column(5).setWidth(9)
    worksheet.column(6).setWidth(9)
    worksheet.column(7).setWidth(9)
    worksheet.column(8).setWidth(6)
    worksheet.column(9).setWidth(8)
    worksheet.column(10).setWidth(6)
    worksheet.column(11).setWidth(7)
    worksheet.column(12).setWidth(7)
    worksheet.cell(1, 1, 2, 1, true).string('PE').style(blueStyle)
    worksheet.cell(1, 2, 1, 6, true).string('ASIGNATURAS / ACTIVIDADES').style(greenStyle)
    worksheet.cell(2, 2).string('NOMBRE').style(cellStyle)
    worksheet.cell(2, 3).string('GRUPOS').style(cellStyle)
    worksheet.cell(2, 4).string('NO. GRUPOS').style(cellStyle)
    worksheet.cell(2, 5).string('HR/SEMANA').style(cellStyle)
    worksheet.cell(2, 6).string('TOTAL').style(greenStyle)
    worksheet.cell(1, 7, 1, 8, true).string('TUTORÍAS').style(greenStyle)
    worksheet.cell(2, 7).string('GRUPO').style(cellStyle)
    worksheet.cell(2, 8).string('HRS').style(greenStyle)
    worksheet.cell(1, 9, 2, 9, true).string('LIIADT').style(greenStyle)
    worksheet.cell(1, 10, 1, 12, true).string('GESTIÓN').style(greenStyle)
    worksheet.cell(2, 10).string('INST').style(cellStyle)
    worksheet.cell(2, 11).string('ACAD').style(cellStyle)
    worksheet.cell(2, 12).string('ASES').style(cellStyle)
    worksheet.cell(1, 13, 1, 15, true).string('ESTADÍA TÉCNICA').style(greenStyle)
    worksheet.cell(2, 13).string('ESTUDIANTE(s)').style(cellStyle)
    worksheet.cell(2, 14).string('HRS').style(cellStyle)
    worksheet.cell(2, 15).string('TOTAL').style(greenStyle)
    worksheet.cell(1, 16, 2, 16, true).string('TOTAL').style(greenStyle)
    worksheet.cell(3, 1, 5, 16).style(cellStyle)
    const generateCellA = (key, val) => {
        const entriesOpts = {
            'nombre_actividades': (i, value) => {
                worksheet.cell(i, 2).string(value)
            },
            'grados_grupos': (i, value) => {
                worksheet.cell(i, 3).string(value.join(', '))
            },
            'horas_semanales': (i, value) => {
                worksheet.cell(i, 5).number(value)
            },
            'subtotal_clasificacion': (i, value) => {
                worksheet.cell(i, 6).number(value)
            },
        }
        entriesOpts[key]
    }
    const generateCellB = (key, val) => {
        const entriesOpts = {
            'nombre_actividades': (i, value) => {
                worksheet.cell(i, 2).string(value)
            },
            'horas_semanales': (i, value) => {
                worksheet.cell(i, 9).number(value)
            },
        }
        return entriesOpts[key]
    }
    const generateCellC = (key, val) => {
        const entriesOpts = {
            'grados_grupos': (i, value) => {
                worksheet.cell(i, 7).string(value.join(', '))
            },
            'horas_semanales': (i, value) => {
                worksheet.cell(i, 8).number(value)
            }
        }
        return entriesOpts[key]
    }
    const generateCellD = (key, val) => {
        const entriesOpts = {
            'subtotal_clasificacion': (i, value) => {
                if (val === 'INST') {
                    worksheet.cell(i, 10).number(value)
                    return
                }
                if (val === 'ACAD') {
                    worksheet.cell(i, 11).number(value)
                    return
                }
                if (val === 'ASES') {
                    worksheet.cell(i, 12).number(value)
                    return
                }
            },
            'nombre_actividades': (i, value) => {
                worksheet.cell(i, 2).string(value)
            }
        }
        return entriesOpts[key]
    }
    const generateCellE = (key, val) => {
        const entriesOpts = {
            'numero_estudiantes': (i, value) => {
                worksheet.cell(i, 13).number(value)
            },
            'horas_semanales': (i, value) => {
                worksheet.cell(i, 14).number(value)
            },
            'subtotal_clasificacion': (i, value) => {
                worksheet.cell(i, 15).number(value)
            }
        }
        return entriesOpts[key]
    }
    const cellType = (key) => {
        const type = {
            'Docencia': generateCellA,
            'LIIAD': generateCellB,
            'Tutorías': generateCellC,
            'Gestión': generateCellD,
            'Estadía técnica': generateCellE,
        }
        return type[key]
    }
    return { workbook, worksheet, cellType }
}

export const setupWorkSheet = (act, j, cellType) => {
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
}

export default async function handler(req, res) {
    const { data, error } = await getTemplateJoinActivities()
    const workBooks = data.map((record, i) => {
        const { workbook, worksheet, cellType } = generateWorkSheet()
        record.actividad.forEach((act, i) => setupWorkSheet(act, i, cellType))
        worksheet.cell(3, 16, 7, 16, true).number(record.total)
        return {
            workbook,
            path: `./public/plantilla ${record.nombre}.xlsx`
        }
    })
    workBooks.forEach(({ workbook, path }) => {
        workbook.write(path)
    })
    res.status(200).json({ data, error })
}