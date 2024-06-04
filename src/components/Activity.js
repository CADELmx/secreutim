import { StoredContext } from '@/context'
import { checkEmptyStringOption, distribucionActividades, programasEducativos } from '@/utils'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'

export const Activity = ({ act }) => {
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
        setStored({ record: { actividades: actividades } })
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
        <div onChange={handleChange} className='flex flex-col gap-2'>
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
                                } : programasEducativos.find((p) => p.siglas == e.anchorKey)
                            } : a)
                        }
                    })
                }} value={act.pe?.siglas}>
                    {
                        programasEducativos.map((e, i) =>
                            <SelectItem key={e.siglas} variant="flat">{e.siglas}</SelectItem>)
                    }
                </Select>
                <Textarea minRows={1} size="sm" radius="md" isReadOnly label='Detalles PE' isDisabled value={act.pe?.descripcion} />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
                <Select label="Grados y grupos" name="grados_grupos" selectionMode="multiple" defaultSelectedKeys={act.grados_grupos} onSelectionChange={(e) => {
                    console.log(Array.from(e))
                    setStored({
                        record: { ...record, actividades: acts.map((a) => a.id === act.id ? { ...a, grados_grupos: Array.from(e) } : a) }
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
            <Input label="Horas semanales" type="number" name="horas_semanales" defaultValue={act.horas_semanales} />
            {
                acts.length > 1 && <Button color='danger' onClick={handleDelete}>
                    Eliminar actividad
                </Button>
            }
        </div>
    )
}
