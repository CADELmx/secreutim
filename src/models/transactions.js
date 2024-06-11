import { promiseResolver, supabase } from "@/utils"

export const insertActivities = async (activities) => {
    const response = await supabase.from('actividad').insert(activities).select('id')
    return response
}

export const insertTemplate = (template) => {
    return supabase.from('plantilla').insert([template]).select('id')
}

const academicWorkersFilter = [
    '%asignatura%',
    '%Tiempo Completo%',
    '%de Apoyo%',
]

const areaFiter = [
    'P.E. de Tecnologías de la Información',
    'P.E. de Lengua Inglesa',
]

export const getAllAcademicWorkers = () => {
    return supabase.from('dpersonales').select('ide,nombre,puesto,area')
        .likeAnyOf('puesto', academicWorkersFilter)
        .in('area', areaFiter)
}

export const getOneAcademicWorker = (id) => {
    return supabase.from('dpersonales').select('ide,nombre,puesto,area')
        .eq('ide', id)
        .ilikeAnyOf('puesto', academicWorkersFilter)
}

export const getAcademicPrograms = () => {
    return supabase.from('programaseducativos').select('id,siglas,descripcion')
}

export const getTemplates = () => {
    return supabase.from('plantilla').select('*')
}

export const getTemplate = (id) => {
    return supabase.from('plantilla').select('*').eq('id', id)
}

export const getActivites = () => {
    return supabase.from('actividad').select('*')
}

export const getActivitiesByTemplate = (id) => {
    return supabase.from('actividad').select('*').eq('plantilla_id', id)
}

export const setTemplateStatus = (id, status) => {
    return supabase.from('plantilla').update({ status }).eq('id', id).select('id')
}

export const insertComment = (template_id, comment) => {
    return supabase.from('comentarios').insert({ plantilla_id: template_id, comentario: comment }).select('id')
}

export const generateRecords = async () => {
    const plantillaPromise = getTemplates()
    const actividadesPromise = getActivites()
    const [plantillaRes, actividadesRes] = await promiseResolver([plantillaPromise, actividadesPromise])
    const { data: plantillas, error: plantillasError } = plantillaRes
    const { data: actividades, error: actividadesError } = actividadesRes
    if (plantillasError || actividadesError) {
        console.error('#ERROR# Error al obtener datos de plantillas y/o actividades')
        return {
            props: {
                error: 'Error al obtener las plantillas'
            }
        }
    }
    const data = plantillas.map(plantilla => {
        const actividadesPlantilla = actividades.filter(actividad => actividad.plantilla_id === plantilla.id)
        return {
            ...plantilla,
            actividades: actividadesPlantilla
        }
    })
    return {
        props: {
            plantillas: data,
        }
    }
}

export const generateSingleRecord = async (id) => {
    const plantillaPromise = getTemplate(id)
    const actividadesPromise = getActivitiesByTemplate(id)
    const [plantillaRes, actividadesRes] = await promiseResolver([plantillaPromise, actividadesPromise])
    const { data: plantillas, error: plantillasError } = plantillaRes
    const { data: actividades, error: actividadesError } = actividadesRes
    if (plantillasError || actividadesError) {
        console.error('#ERROR# Error al obtener datos de plantilla')
        return {
            props: {
                error: 'Error al obtener la plantilla'
            }
        }
    }
    const data = {
        ...plantillas[0],
        actividades: actividades
    }
    return {
        props: {
            plantilla: data,
        }
    }
}