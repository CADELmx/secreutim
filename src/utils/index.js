import { Socket } from "socket.io-client"

export const promiseResolver = async (promiseList) => {
    const results = await Promise.allSettled(promiseList)
    const data = results.map(r => r.value)
    return data
}

export const singlePromiseResolver = async (promise) =>  await promise

export const puestos = [
    'Profesor de Tiempo Completo Titular "A"',
    'Profesor de Tiempo Completo Titular "B"',
    'Profesor de Tiempo Completo Asociado "A"',
    'Profesor de Tiempo Completo Asociado "B"',
    'Profesor de Tiempo Completo Asociado "C"',
    'Profesor de asignatura "B"',
    'Técnico de Apoyo',
]

export const titulos = [
    'Sin título',
    'T.S.U.',
    'Licenciatura',
    'Maestría',
    'Doctorado',
]

export const distribucionActividades = [
    'Docencia',
    'LIIAD',
    'Tutorías',
    'Gestión',
    'Estadía técnica',
]

export const modalidades = [
    'T.S.U. Escolarizada',
    'T.S.U. Despresurizada',
    'Licenciatura Escolarizada',
    'Licenciatura Mixta',
    'Ingeniería Escolarizada',
    'Ingeniería Mixta',
]
export const defaultActivity = {
    id: crypto.randomUUID(),
    pe: null,
    distribucion_actividades: "",
    tipo_gestion: "",
    tipo_estadia: "",
    numero_estudiantes: 0,
    nombre_actividades: "",
    grados_grupos: [],
    horas_semanales: 0,
    subtotal_clasificacion: 0,
}

export const defaultRecord = {
    nt: 0,
    nombre: "",
    sexo: "",
    puesto: "",
    anio: new Date().getFullYear(),
    periodo: "",
    actividad: [
        defaultActivity
    ],
    total: 0,
}

export const defaultValidation = {
    reviewed: false,
    approved: false,
    reviewed_by: "",
    approved_by: "",
}

export const generatePeriods = (year, ordinario) => {
    const period = 4
    const generateMonthName = (m, y = year) => {
        const date = new Date(y, m)
        return date.toLocaleString('es-MX', { month: 'long' })
    }
    const generateFormat = (month1, month2, o = ordinario, y = year) => {
        return `${month1} - ${month2} ${y}: ${o ? 'Ordinario' : 'Extraordinario'}`
    }
    return Array.from({ length: 3 }, (_, k) => {
        const month1 = generateMonthName(k * period)
        const month2 = generateMonthName(k * period + period - 1)
        return generateFormat(month1, month2)
    })
}

export const checkEmptyStringOption = (string) => string === "" ? [] : [string]

export const sumHoras = (activities) => {
    if (activities?.length){
        return activities.map(e => e.subtotal_clasificacion).reduce((p, c) => p + c, 0)
    }
    return 0
}

export const generateTemplateObject = (record) => {
    const plantilla = Object.fromEntries(Object.entries(record).filter(([k, v]) => {
        if (k != 'actividades') {
            return true
        }
    })
    )
    return plantilla
}
/**
 * 
 * @param {Socket} socket 
 * @param {*} toast 
 * @returns 
 */
export const checkSocketStatus = (socket,toast) => {
    if (socket.disconnected) {
        toast.error('No hay conexión con el servidor', {
            id: 'no-connection'
        })
        return true
    }
    return false
}