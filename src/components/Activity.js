import { StoredContext } from '@/context'
import { checkEmptyStringOption, defaultActivity, distribucionActividades } from '@/utils'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'

export const Activity = ({ act, eduPrograms }) => {
    const { memory: { record, defaultGroups, selectedItem }, setStored } = StoredContext()
    const { actividades: acts } = record
    const handleChange = (e) => {
        const actividades = acts.map((a) => {
            if (a.id === act.id) {
                return { ...a, [e.target.name]: e.target.value }
            } else {
                return a
            }
        })
        setStored({
            record: {
                ...record, actividades
            }
        })
    }
    const handleDelete = () => {
        if (selectedItem === 'act-0' && acts.length > 1) {
            setStored({ selectedItem: `act-${acts.length + 1}` })
        } else {
            setStored({ selectedItem: `act-${acts.length - 2}` })
        }
        setStored({
            record: {
                ...record,
                actividades: acts.filter((a) => a.id !== act.id)
            }
        })
    }
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col md:flex-row gap-2'>
                <Select className='md:w-3/5' label="Distribución de actividades" onChange={handleChange} name="distribucion_actividades" defaultSelectedKeys={checkEmptyStringOption(act?.distribucion_actividades)}>
                    {
                        distribucionActividades.map((a) => {
                            return <SelectItem key={a} variant="flat">{a}</SelectItem>
                        })
                    }
                </Select>
                <Input label="Nombre de actividades" type="text" name="nombre_actividades" isRequired defaultValue={act.nombre_actividades} />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <Select className="md:w-2/5" label='Programa educativo' name='pe' defaultSelectedKeys={checkEmptyStringOption(act.pe?.siglas)} onSelectionChange={(e) => {
                    setStored({
                        record: {
                            ...record, actividades: acts.map((a) => a.id === act.id ? {
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
            <div className="flex flex-col gap-2 sm:flex-row">
                <Select label="Grados y grupos" name="grados_grupos" selectionMode="multiple" description="Selección múltiple" defaultSelectedKeys={act.grados_grupos} onSelectionChange={(e) => {
                    setStored({
                        record: { ...record, actividades: acts.map((a) => a.id === act.id ? { ...a, grados_grupos: Array.from(e), subtotal_clasificacion: Array.from(e).length * act.horas_semanales } : a) }
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
            <Input label="Horas semanales" type="number" name="horas_semanales" min={1} defaultValue={act.horas_semanales} onChange={(e) => {
                const subtotal_clasificacion = act.grados_grupos.length === 0 || e.target.value === '' ? '' : act.grados_grupos.length * Number(e.target.value)
                setStored({
                    record: {
                        ...record, actividades: acts.map(
                            (a) => a.id === act.id ? { ...a, [e.target.name]: e.target.value, subtotal_clasificacion } : a)
                    }
                })
            }} />

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
        const newGlobalState =
            actividades[0].id === `act-${actividades.length}` ?
                {
                    record: {
                        ...record, actividades: [...actividades, {
                            ...defaultActivity,
                            id: `act-${actividades.length + 1}`
                        }]
                    },
                    selectedItem: `act-${actividades.length + 1}`
                } : {
                    record: {
                        ...record, actividades: [...actividades, {
                            ...defaultActivity,
                            id: `act-${actividades.length}`
                        }]
                    },
                    selectedItem: `act-${actividades.length}`
                }
        setStored(newGlobalState)
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
