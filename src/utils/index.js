import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

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
    'Atención a estudiantes',
    'Atención personalizada',
    'Gestión Institucional',
    'Desarrollo de material',
    'LIIAD'
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
    pe: {
        siglas: "",
        descripcion: "",
    },
    distribucion_actividades: "",
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
    actividades: [
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);