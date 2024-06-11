import { StoredContext } from "@/context"
import { getOneAcademicWorker } from "@/models/transactions"
import { Chip, Input, Select, SelectItem, SelectSection, Switch } from "@nextui-org/react"
import { useState } from "react"
import toast from "react-hot-toast"

export const NtInput = ({ academicWorkers }) => {
    const { memory: { record }, setStored } = StoredContext()
    const [idError, setIdError] = useState(false)
    const [locked, setLocked] = useState(false)
    const [selectorActive, setSelectorActive] = useState(false)
    const handleChangeFromSupabase = async (newValue) => {
        const supaPromise = getOneAcademicWorker(newValue)
        if (newValue === '') return
        toast.promise(supaPromise, {
            loading: 'Buscando número de trabajador',
            success: ({ data, error }) => {
                if (error) {
                    return 'Error al buscar el número de trabajador'
                }
                if (data.length > 0) {
                    setIdError(false)
                    setStored({ record: { ...record, nt: data[0].ide, puesto: data[0].puesto, nombre: data[0].nombre } })
                    setLocked(true)
                    return 'Número de trabajador encontrado'
                } else {
                    setIdError(true)
                    return 'No se encontró el número de trabajador'
                }
            },
            error: 'Error, intente de nuevo más tarde'
        }, {
            id: 'ide-error'
        })
    }
    return (
        <div className="grid gap-2">
            <Switch color="success" isSelected={selectorActive} onValueChange={setSelectorActive} endContent={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            } startContent={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
                </svg>

            }>Tipo de selección - <Chip variant="faded" size="sm" color="success">{selectorActive ? 'Selector' : 'Buscador'}</Chip></Switch>
            <div className="flex gap-2">
                {
                    selectorActive && (
                        <Select isDisabled={locked} name="worker" label='Escoger trabajador' onChange={(e) => handleChangeFromSupabase(e.target.value)}>
                            <SelectSection title="Tecnologías de la Información">
                                {
                                    academicWorkers.filter(w => w.area === 'P.E. de Tecnologías de la Información').map(w => {
                                        return <SelectItem key={w.ide} variant="flat" endContent={<p className="text-utim">{w.ide}</p>}>{w.nombre}</SelectItem>
                                    })
                                }
                            </SelectSection>
                            <SelectSection title="Lengua Inglesa">
                                {
                                    academicWorkers.filter(w => w.area === 'P.E. de Lengua Inglesa').map(w => {
                                        return <SelectItem key={w.ide} variant="flat" endContent={<p className="text-utim">{w.ide}</p>}>{w.nombre}</SelectItem>
                                    })
                                }
                            </SelectSection>
                        </Select>
                    ) || (
                        <Input label="N.T." type="number" min={1} name="nt" onValueChange={handleChangeFromSupabase} color={idError ? "warning" : "default"} isDisabled={locked} />
                    )
                }
                <Switch isSelected={locked} onValueChange={setLocked} thumbIcon={locked ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                )}></Switch>
            </div>
        </div>
    )
}