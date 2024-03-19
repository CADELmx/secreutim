export const puestos = [
    'Profesor de Tiempo Completo Titular A',
    'Profesor de Tiempo Completo Titular B',
    'Profesor de Tiempo Completo Asociado A',
    'Profesor de Tiempo Completo Asociado B',
    'Profesor de Tiempo Completo Asociado C',
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
        siglas: '5B: ADM: CH',
        descripcion: 'Técnico Superior Universitario en Administración Área Recursos Humanos',
    }, {
        siglas: '5B: ADM: CH.D',
        descripcion: 'Técnico Superior Universitario en Administración Área Recursos Humanos Despresurizado'
    }, {
        siglas: '5B: ADM: FEP',
        descripcion: 'Técnico Superior Universitario en Administración Área Formulación y Evaluación de Proyectos'
    }, {
        siglas: '5B: ASYP',
        descripcion: 'Técnico Superior Universitario en Agricultura Sustentable y Protegida'
    }, {
        siglas: '5B: AGRV',
        descripcion: 'Técnico Superior Universitario en Agrobiotecnología Área Vegetal'
    }, {
        siglas: '5B: AGRV.D',
        descripcion: 'Técnico Superior Universitario en Agrobiotecnología Área Vegetal Despresurizado'
    }, {
        siglas: '5B: CONTA',
        descripcion: 'Técnico Superior Universitario en Contaduría'
    }, {
        siglas: '5B: CONTA.D',
        descripcion: 'Técnico Superior Universitario en Contaduría Despresurizado'
    }, {
        siglas: '5B: LING',
        descripcion: 'Técnico Superior Universitario en Lengua Inglesa'
    }, {
        siglas: '5B: LING.D',
        descripcion: 'Técnico Superior Universitario en Lengua Inglesa Despresurizado'
    }, {
        siglas: '5B: PAL',
        descripcion: 'Técnico Superior Universitario en Procesos Alimentarios'
    }, {
        siglas: '5B: PMD',
        descripcion: 'Técnico Superior Universitario en Paramédico'
    }, {
        siglas: '5B: TI: DSM',
        descripcion: 'Técnico Superior Universitario en Tecnologías de la Información Área Desarrollo de Software Multiplataforma'
    }, {
        siglas: '5B: TI: DSM.D',
        descripcion: 'Técnico Superior Universitario en Tecnologías de la Información Área Desarrollo de Software Multiplataforma Despresurizado'
    }, {
        siglas: '5B: TI: IRD',
        descripcion: 'Técnico Superior Universitario en Tecnologías de la Información Área Infraestructura de Redes Digitales'
    }, {
        siglas: '5A: GCH',
        descripcion: 'Licenciatura en Gestión de Capital Humano'
    }, {
        siglas: '5A: GCH.M',
        descripcion: 'Licenciatura en Gestión de Capital Humano Mixta'
    }, {
        siglas: '5A: GNP',
        descripcion: 'Licenciatura en Gestión de Negocios y Proyectos'
    }, {
        siglas: '5A: ASYP',
        descripcion: 'Licenciatura en Agricultura Sustentable y Protegida'
    }, {
        siglas: '5A: AGRO',
        descripcion: 'Licenciatura en Agrobiotecnología'
    }, {
        siglas: '5A: CONTA',
        descripcion: 'Licenciatura en Contaduría'
    }, {
        siglas: '5A: CONTA.M',
        descripcion: 'Licenciatura en Contaduría Mixta'
    }, {
        siglas: '5A: IFF',
        descripcion: 'Ingeniería Financiera, Fiscal y Contador Público'
    }, {
        siglas: '5A: IFF.M',
        descripcion: 'Ingeniería Financiera, Fiscal y Contador Público Mixta'
    }, {
        siglas: '5A: PAL',
        descripcion: 'Licenciatura en Procesos Alimentarios'
    }, {
        siglas: '5A: TI',
        descripcion: 'Licenciatura en Tecnologías de la Información'
    }, {
        siglas: '5A: TI.M',
        descripcion: 'Licenciatura en Tecnologías de la Información Mixta'
    }, {
        siglas: '5A: DGSW',
        descripcion: 'Licenciatura en Desarrollo y Gestión de Software'
    }, {
        siglas: '5A: DGSW.M',
        descripcion: 'Licenciatura en Desarrollo y Gestión de Software Mixta'
    }, {
        siglas: '5A: RIC',
        descripcion: 'Ingeniería en Redes Inteligentes y Ciberseguridad'
    }, {
        siglas: '5A: ACYD',
        descripcion: 'Actividades Culturales y Deportivas'
    }
]

export const defaultGroups = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B']

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
    apellido_paterno: "",
    apellido_materno: "",
    nombres: "",
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
    const periods = []
    const generateMonthName = (y = year, m) => {
        const date = new Date(y, m)
        return date.toLocaleString('es-MX', { month: 'long' })
    }
    const generateFormat = (month1, month2, y = year, o = ordinario) => {
        return `${month1} - ${month2} ${y}: ${o ? 'Ordinario' : 'Extraordinario'}`
    }
    for (let i = 0; i < 12; i += period) {
        const month1 = generateMonthName(i)
        const month2 = generateMonthName(i + period)
        periods.push(generateFormat(month1, month2))
    }
    return periods
}