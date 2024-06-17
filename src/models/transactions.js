import { supabase } from "./conector"

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

export const getTemplateJoinActivities = () => {
    return supabase.from('plantilla').select('id,nombre,actividad(*),total,status')
}

export const getTemplateJoinActivitiesById = (id) => {
    return supabase.from('plantilla').select('id,nombre,actividad(*),total,status').eq('id', id)
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

export const updateComment = (template_id, comment) => {
    return supabase.from('comentarios').update({ comentario: comment }).eq('plantilla_id', template_id).select('id')
}

export const deleteComment = (template_id) => {
    return supabase.from('comentarios').delete().eq('plantilla_id', template_id).select('id')
}

export const checkExistentComment = (template_id) => {
    return supabase.from('comentarios').select('id').eq('plantilla_id', template_id)
}

export const getTemplateJoinComment = () => {
    return supabase.from('plantilla').select('id,nombre,total,status,comentarios(*)')
}

export const generateRecords = async () => {
    const { data, error } = await getTemplateJoinActivities()
    if (error) {
        console.error('#ERROR# Error al obtener datos de plantillas y/o actividades')
        return {
            props: {
                error: 'Error al obtener las plantillas, recarga la página'
            }
        }
    }
    return {
        props: {
            plantillas: data,
        }
    }
}

export const generateSingleRecord = async (id) => {
    const { data, error } = await getTemplateJoinActivitiesById(id)
    if (error) {
        console.error('#ERROR# Error al obtener datos de plantilla')
        return {
            props: {
                error: 'Error al obtener la plantilla, recarga la página'
            }
        }
    }
    return {
        props: {
            plantilla: data[0],
        }
    }
}