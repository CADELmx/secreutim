import { StoredContext } from '@/context'
import { defaultActivity } from '@/utils'
import { Button, Input, Textarea } from '@nextui-org/react'
import toast from 'react-hot-toast'
import { AcademicProgramSelector, ActTypeSelector, GroupSelector, ManagementTypeSelector, StayTypeSelector } from './Selector'
import { useEffect } from 'react'

export const Activity = ({ act, eduPrograms }) => {
    const { memory: { record, selectedItem }, setStored } = StoredContext()
    const { actividades: acts } = record
    const handleChange = (e) => {
        const actividades = acts.map((a) => {
            return (a.id === selectedItem) ? { ...a, [e.target.name]: e.target.value } : a
        })
        setStored({
            record: {
                ...record,
                actividades
            }
        })
    }
    const handleDelete = () => {
        setStored({
            selectedItem: acts.length > 1 ? acts[acts.length - 2].id : acts[0].id,
            record: {
                ...record,
                actividades: acts.filter((a) => a.id !== act.id)
            }
        })
    }
    const changeManagementType = (e) => {
        setStored({
            record: {
                ...record, actividades: acts.map((a) => (a.id === selectedItem) ? {
                    ...a, tipo_gestion: e.size === 0 ? '' : e.anchorKey
                } : a)
            }
        })
    }
    const changeStayType = (e) => {
        const horas_semanales = e.anchorKey === 'TSU' ? 1 : 2
        setStored({
            record: {
                ...record, actividades: acts.map((a) => (a.id === selectedItem) ? {
                    ...a, horas_semanales, subtotal_clasificacion: horas_semanales * act.numero_estudiantes, tipo_estadia: e.size === 0 ? '' : e.anchorKey
                } : a)
            }
        })
    }
    const changeGroup = (e) => {
        setStored({
            record: {
                ...record, actividades: acts.map((a) => a.id === selectedItem ? {
                    ...a, grados_grupos: Array.from(e), subtotal_clasificacion: Array.from(e).length * act.horas_semanales
                } : a)
            }
        })
    }
    const changeWeekleyHours = (e) => {
        if (act.distribucion_actividades === "Estadía técnica") {
            setStored({
                record: {
                    ...record, actividades: acts.map(
                        (a) => a.id === selectedItem ? { ...a, [e.target.name]: Number(e.target.value), subtotal_clasificacion: Number(e.target.value) * (act.numero_estudiantes || 1) } : a)
                }
            })
            return
        }
        if (
            act.distribucion_actividades === "Docencia"
            || act.distribucion_actividades === "Tutorías"
        ) {
            const subtotal_clasificacion = act.grados_grupos.length === 0 || e.target.value === '' ? '' : act.grados_grupos.length * Number(e.target.value)
            setStored({
                record: {
                    ...record, actividades: acts.map(
                        (a) => a.id === selectedItem ? { ...a, [e.target.name]: Number(e.target.value), subtotal_clasificacion } : a)
                }
            })
        } else {
            setStored({
                record: {
                    ...record, actividades: acts.map(
                        (a) => a.id === selectedItem ? { ...a, [e.target.name]: Number(e.target.value), subtotal_clasificacion: Number(e.target.value) } : a)
                }
            })
        }
    }
    const changeActivityProgram = (e) => {
        setStored({
            record: {
                ...record, actividades: acts.map((a) => (a.id === selectedItem) ? {
                    ...a, pe: e.size === 0 ? "" : e.anchorKey
                } : a)
            }
        })
    }
    const changeStudentsNumber = (e) => {
        setStored({
            record: {
                ...record, actividades: acts.map(
                    (a) => a.id === selectedItem ? { ...a, [e.target.name]: Number(e.target.value), subtotal_clasificacion: Number(e.target.value) * (act.horas_semanales || 1) } : a)
            }
        })
    }
    const updateTotal = () => {
        const total = record.actividades
            .map(e => e.subtotal_clasificacion)
            .reduce((p, c) => p + c, 0)
        setStored({
            record: {
                ...record,
                total
            }
        })
    }
    useEffect(() => {
        updateTotal()
    }, [act.subtotal_clasificacion])

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col md:flex-row gap-2'>
                <ActTypeSelector act={act} handler={handleChange} />
                {
                    (
                        act.distribucion_actividades === "Gestión"
                    ) && (
                        <ManagementTypeSelector act={act} handler={changeManagementType} />
                    )
                }
                {
                    !(
                        act.distribucion_actividades === "Estadía técnica"
                        || act.distribucion_actividades === "Tutorías"
                    ) && (
                        <Textarea minRows={1} size='sm' radius='md' label="Nombre de actividades" type="text" name="nombre_actividades" onChange={handleChange} isRequired defaultValue={act.nombre_actividades} />
                    )
                }
                {
                    (
                        act.distribucion_actividades === "Estadía técnica"
                    ) && (
                        <StayTypeSelector act={act} handler={changeStayType} />
                    )
                }
            </div>
            {
                !(
                    act.distribucion_actividades === "Estadía técnica"
                    || act.distribucion_actividades === "Gestión"
                    || act.distribucion_actividades === "LIIAD"
                ) && (
                    <AcademicProgramSelector act={act} eduPrograms={eduPrograms} handler={changeActivityProgram} />
                )
            }
            {
                !(
                    act.distribucion_actividades === "LIIAD"
                    || act.distribucion_actividades === "Estadía técnica"
                    || act.distribucion_actividades === "Gestión"
                ) && (
                    <GroupSelector act={act} handler={changeGroup} />
                )
            }
            <div className='flex gap-2'>
                {
                    (act.distribucion_actividades === "Estadía técnica") && (
                        <Input label="Número de estudiantes" type="number" defaultValue={act.numero_estudiantes} name="numero_estudiantes" onChange={changeStudentsNumber} min={1} />
                    )
                }
                <Input label="Horas semanales" type="number" name="horas_semanales" min={1} value={act?.horas_semanales === 0 ? '' : act?.horas_semanales} onChange={changeWeekleyHours} />
            </div>
            <Input label="Subtotal por clasificación" type="number" name="subtotal_clasificacion" value={act?.subtotal_clasificacion === 0 ? '' : act?.subtotal_clasificacion} isDisabled />
            {
                acts.length > 1 && <Button color='danger' onClick={handleDelete}>
                    Eliminar actividad
                </Button>
            }
        </div>
    )
}

export const AddActivityButton = ({isDisabled}) => {
    const { memory: { record }, setStored } = StoredContext()
    const { actividades } = record
    const handleCreate = () => {
        if (actividades.length >= 10) {
            return toast.error('No puedes agregar más carga academica', {
                id: 'max-activities'
            })
        }
        const uuid = crypto.randomUUID()
        setStored({
            record: {
                ...record, actividades: [...actividades, {
                    ...defaultActivity,
                    id: uuid
                }]
            },
            selectedItem: uuid
        })
    }
    return (
        <Button isDisabled={isDisabled} startContent={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

        } className="w-full" variant="solid" color="primary" onClick={handleCreate}>
            Agregar actividad
        </Button>
    )
}
