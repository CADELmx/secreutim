import { getTemplateJoinActivities } from "@/models/transactions"
import style from "excel4node/distribution/lib/style"
import Workbook from "excel4node/distribution/lib/workbook/workbook"
export default async function handler(req, res) {
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
    const { data, error } = await getTemplateJoinActivities()
    const wokbook = new Workbook()
    const cellStyle = new style(wokbook, styleOptions)
    const greenStyle = new style(wokbook, {
        ...styleOptions,
        fill: {
            type: 'pattern',
            patternType: 'solid',
            bgColor: '#04c073',
            fgColor: '#04c073'
        }
    })
    const blueStyle = new style(wokbook, {
        ...styleOptions,
        fill: {
            type: 'pattern',
            patternType: 'solid',
            bgColor: '#4fe4de',
            fgColor: '#4fe4de'
        }
    })
    const worksheet = wokbook.addWorksheet('Hoja 1')
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
    /**
     *     data.map(record => {
        const header = Object.keys(record.actividad[0])
        header.map((head, i) => {
            worksheet.cell(1, i + 1).string(head)
        })
        record.actividad.map((act, i) => {
            const cells = Object.values(act)
            cells.map((cell, j) => {
                const type = typeof cell
                if (type === 'number') worksheet.cell(i + 2, j + 1).number(cell)
                if (type === 'string') {
                    worksheet.cell(i + 2, j + 1).string(cell)
                }
            })
        })
    })
     * 
     */
    const path = `./public/activities.xlsx`
    wokbook.write(path)
    res.status(200).json({ data, error })
}