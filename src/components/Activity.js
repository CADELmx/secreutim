import { StoredContext } from '@/context'
import { checkEmptyStringOption, defaultActivity, distribucionActividades } from '@/utils'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { randomUUID } from 'crypto'
import toast from 'react-hot-toast'

export const Activity = ({ act, eduPrograms }) => {
    const { memory: { record, defaultGroups, selectedItem }, setStored } = StoredContext()
    const { actividades: acts } = record
    const handleChange = (e) => {
        const actividades = acts.map((a) => {
            return (a.id === selectedItem) ? { ...a, [e.target.name]: e.target.value } : a
        })
        setStored({
            record: {
                ...record, actividades
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
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col md:flex-row gap-2'>
                <Select className={act.distribucion_actividades === "Tutorías" ? '' : 'md:w-3/5'} label="Distribución" onChange={handleChange} name="distribucion_actividades" defaultSelectedKeys={checkEmptyStringOption(act?.distribucion_actividades)}>
                    {
                        distribucionActividades.map((a) => {
                            return <SelectItem key={a} variant="flat">{a}</SelectItem>
                        })
                    }
                </Select>
                {
                    (
                        act.distribucion_actividades === "Gestión"
                    ) && (
                        <Select className='md:w-2/4' name='tipo_gestion' label='Tipo de gestión'>
                            <SelectItem value={'INST'} variant="flat">Institucional</SelectItem>
                            <SelectItem value={'ACAD'} variant="flat">Académica</SelectItem>
                            <SelectItem value={'ASES'} variant='flat'>Asesoría
                            </SelectItem>
                        </Select>
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
                        <Select className='' name='tipo_estadia' label='Tipo de estadía'>
                            <SelectItem value='D'>TSU</SelectItem>
                            <SelectItem value='D'>ING</SelectItem>
                        </Select>
                    )
                }
            </div>
            {
                !(
                    act.distribucion_actividades === "Estadía técnica"
                    || act.distribucion_actividades === "Gestión"
                    || act.distribucion_actividades === "LIIAD"
                ) && (
                    <div className="flex flex-col md:flex-row gap-2">
                        <Select isDisabled={act.distribucion_actividades === ""} className="md:w-2/5" label='Programa educativo' name='pe' defaultSelectedKeys={checkEmptyStringOption(act.pe?.siglas)} onSelectionChange={(e) => {
                            setStored({
                                record: {
                                    ...record, actividades: acts.map((a) => (a.id === selectedItem) ? {
                                        ...a, pe: e.size === 0 ? {
                                            siglas: "",
                                            descripcion: "",
                                        } : eduPrograms.find((p) => p.siglas == e.anchorKey)
                                    } : a)
                                }
                            })
                        }} value={act.pe?.siglas}>
                            {
                                eduPrograms.map((e, i) =>
                                    <SelectItem key={e.siglas} variant="flat">{e.siglas}</SelectItem>)
                            }
                        </Select>
                        <Textarea minRows={1} size="sm" radius="md" isReadOnly label='Detalles PE' isDisabled value={act.pe?.descripcion} />
                    </div>
                )
            }
            {
                !(
                    act.distribucion_actividades === "LIIAD"
                    || act.distribucion_actividades === "Estadía técnica"
                    || act.distribucion_actividades === "Gestión"
                ) && (
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Select isDisabled={act.pe.descripcion === ''} label="Grados y grupos" name="grados_grupos" selectionMode="multiple" description="Selección múltiple" defaultSelectedKeys={act.grados_grupos} onSelectionChange={(e) => {
                            setStored({
                                record: {
                                    ...record, actividades: acts.map((a) => a.id === selectedItem ? {
                                        ...a, grados_grupos: Array.from(e), subtotal_clasificacion: Array.from(e).length * act.horas_semanales
                                    } : a)
                                }
                            })
                        }}
                        >
                            {
                                defaultGroups.map((grupo) => (
                                    <SelectItem key={grupo} variant="flat">{grupo}</SelectItem>
                                ))
                            }
                        </Select>
                        <Input className="md:w-1/3" isReadOnly label='Nº de grupos' value={act.grados_grupos.length === 0 ? '' : act.grados_grupos.length} isDisabled />
                    </div>
                )
            }
            <div className='flex gap-2'>
                {
                    (act.distribucion_actividades === "Estadía técnica") && (
                        <Input label="Número de estudiantes" type="number" name="numero_estudiantes" onChange={handleChange} min={1} />
                    )
                }
                <Input label="Horas semanales" type="number" name="horas_semanales" min={1} defaultValue={act.horas_semanales} onChange={(e) => {
                    if (act.distribucion_actividades === "Estadía técnica") {
                        setStored({
                            record: {
                                ...record, actividades: acts.map(
                                    (a) => a.id === selectedItem ? { ...a, [e.target.name]: e.target.value, subtotal_clasificacion: Number(e.target.value) * (a.numero_estudiantes || 1) } : a)
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
                                    (a) => a.id === selectedItem ? { ...a, [e.target.name]: e.target.value, subtotal_clasificacion } : a)
                            }
                        })
                    } else {
                        setStored({
                            record: {
                                ...record, actividades: acts.map(
                                    (a) => a.id === selectedItem ? { ...a, [e.target.name]: e.target.value, subtotal_clasificacion: Number(e.target.value) } : a)
                            }
                        })
                    }
                }} />
            </div>
            <Input label="Subtotal por clasificación" type="number" name="subtotal_clasificacion" value={act.subtotal_clasificacion === 0 ? '' : act.subtotal_clasificacion} isDisabled />
            {
                acts.length > 1 && <Button color='danger' onClick={handleDelete}>
                    Eliminar actividad
                </Button>
            }
        </div>
    )
}

export const AddActivityButton = () => {
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
        <Button startContent={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

        } className="w-full" variant="solid" color="primary" onClick={handleCreate}>
            Agregar actividad
        </Button>
    )
}
