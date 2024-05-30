import { createClient } from "@supabase/supabase-js";

export const puestos = [
    'Profesor de Tiempo Completo Titular "A"',
    'Profesor de Tiempo Completo Titular "B"',
    'Profesor de Tiempo Completo Asociado "A"',
    'Profesor de Tiempo Completo Asociado "B"',
    'Profesor de Tiempo Completo Asociado "C"',
    'Profesor por asignatura B',
    'Técnico Académico',
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

export const programasEducativos = [
    {
        "siglas": "ADM: CH",
        "descripcion": "Técnico Superior Universitario en Administración Área Recursos Humanos"
    },
    {
        "siglas": "ADM: CH.D",
        "descripcion": "Técnico Superior Universitario en Administración Área Recursos Humanos Despresurizado"
    },
    {
        "siglas": "ADM: FEP",
        "descripcion": "Técnico Superior Universitario en Administración Área Formulación y Evaluación de Proyectos"
    },
    {
        "siglas": "ASYP",
        "descripcion": "Técnico Superior Universitario en Agricultura Sustentable y Protegida"
    },
    {
        "siglas": "AGRV",
        "descripcion": "Técnico Superior Universitario en Agrobiotecnología Área Vegetal"
    },
    {
        "siglas": "AGRV.D",
        "descripcion": "Técnico Superior Universitario en Agrobiotecnología Área Vegetal Despresurizado"
    },
    {
        "siglas": "CONTA",
        "descripcion": "Técnico Superior Universitario en Contaduría"
    },
    {
        "siglas": "CONTA.D",
        "descripcion": "Técnico Superior Universitario en Contaduría Despresurizado"
    },
    {
        "siglas": "LING",
        "descripcion": "Técnico Superior Universitario en Lengua Inglesa"
    },
    {
        "siglas": "LING.D",
        "descripcion": "Técnico Superior Universitario en Lengua Inglesa Despresurizado"
    },
    {
        "siglas": "PAL",
        "descripcion": "Técnico Superior Universitario en Procesos Alimentarios"
    },
    {
        "siglas": "PMD",
        "descripcion": "Técnico Superior Universitario en Paramédico"
    },
    {
        "siglas": "TI: DSM",
        "descripcion": "Técnico Superior Universitario en Tecnologías de la Información Área Desarrollo de Software Multiplataforma"
    },
    {
        "siglas": "TI: DSM.D",
        "descripcion": "Técnico Superior Universitario en Tecnologías de la Información Área Desarrollo de Software Multiplataforma Despresurizado"
    },
    {
        "siglas": "TI: IRD",
        "descripcion": "Técnico Superior Universitario en Tecnologías de la Información Área Infraestructura de Redes Digitales"
    },
    {
        "siglas": "GCH",
        "descripcion": "Licenciatura en Gestión de Capital Humano"
    },
    {
        "siglas": "GCH.M",
        "descripcion": "Licenciatura en Gestión de Capital Humano Mixta"
    },
    {
        "siglas": "GNP",
        "descripcion": "Licenciatura en Gestión de Negocios y Proyectos"
    },
    {
        "siglas": "ASYP",
        "descripcion": "Licenciatura en Agricultura Sustentable y Protegida"
    },
    {
        "siglas": "AGRO",
        "descripcion": "Licenciatura en Agrobiotecnología"
    },
    {
        "siglas": "CONTA",
        "descripcion": "Licenciatura en Contaduría"
    },
    {
        "siglas": "CONTA.M",
        "descripcion": "Licenciatura en Contaduría Mixta"
    },
    {
        "siglas": "IFF",
        "descripcion": "Ingeniería Financiera, Fiscal y Contador Público"
    },
    {
        "siglas": "IFF.M",
        "descripcion": "Ingeniería Financiera, Fiscal y Contador Público Mixta"
    },
    {
        "siglas": "PAL",
        "descripcion": "Licenciatura en Procesos Alimentarios"
    },
    {
        "siglas": "TI",
        "descripcion": "Licenciatura en Tecnologías de la Información"
    },
    {
        "siglas": "TI.M",
        "descripcion": "Licenciatura en Tecnologías de la Información Mixta"
    },
    {
        "siglas": "DGSW",
        "descripcion": "Licenciatura en Desarrollo y Gestión de Software"
    },
    {
        "siglas": "DGSW.M",
        "descripcion": "Licenciatura en Desarrollo y Gestión de Software Mixta"
    },
    {
        "siglas": "RIC",
        "descripcion": "Ingeniería en Redes Inteligentes y Ciberseguridad"
    },
    {
        "siglas": "ACYD",
        "descripcion": "Actividades Culturales y Deportivas"
    }
]

export const defaultGroups = Array.from({ length: 8 }, (_, k) => [`${k + 1}A`, `${k + 1}B`, `${k + 1}C`]).flat()

export const defaultActivity = {
    id: 'act-0',
    pe: {
        siglas: "",
        descripcion: "",
    },
    distribucion_actividades: "",
    nombre_actividades: "",
    grados_grupos: [],
    horas_semanales: 0,
}

export const defaultRecord = {
    no: 0,
    nt: 0,
    titulo: "",
    nombre: "",
    sexo: "",
    puesto: "",
    actividades: [
        defaultActivity
    ],
    subtotal_clasificacion: 0,
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

export const checkEmptyStringOption = (string) => {
    string == "" ? [] : [string]
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);