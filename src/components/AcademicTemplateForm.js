import { checkSocketStatus, puestos, sumHoras } from '@/utils'
import { useEffect, useState } from 'react'
import { AcademicCharge } from './AcademicCharge'
import { YearAndPeriodSelector } from './Selector'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { NtInput } from './WorkerNumber'
import { AddActivityButton } from './Activity'
import { StoredContext } from '@/context'
import toast from 'react-hot-toast'

export const AcademicTemplateForm = ({ academicPrograms, academicWorkers, template }) => {
    const { memory: { record, socket }, setStored, handleGlobalChange } = StoredContext()
    const [loading, setLoading] = useState(false)
    const getPuesto = (puesto) => {
        if (puesto === "") return []
        if (!puestos.includes(puesto)) {
            puestos.push(puesto)
            return [puesto]
        }
        return [record.puesto]
    }
    const totalHoras = sumHoras(record?.actividad)
    const handleSubmit = () => {
        if (checkSocketStatus(socket, toast)) return
        setLoading(true)
        socket.emit('createTemplate', record)
    }
    useEffect(() => {
        if (template?.id) {
            setStored({ record: template })
        }
        const onCreatedTemplate = () => {
            setLoading(false)
            toast.success('Plantilla guardada', {
                id: 'template-save'
            })
        }
        const onTemplateError = () => {
            setLoading(false)
            toast.error('Error al guardar plantilla', {
                id: 'template-save'
            })
        }
        socket.on('createdTemplate', onCreatedTemplate)
        socket.on('templateError', onTemplateError)
        return () => {
            socket.off('createdTemplate', onCreatedTemplate)
            socket.off('templateError', onTemplateError)
        }
    }, [])
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex-col object-fill w-5/6 sm:w-2/3 pt-5 mt-5">
                <form className="flex flex-col gap-2">
                    {
                        !template?.id && <NtInput academicWorkers={academicWorkers} />
                    }
                    <div className="flex gap-2" >
                        <Textarea minRows={1} size="sm" radius="md" isRequired label="Nombre" type="text" name="nombre" onChange={handleGlobalChange} value={record?.nombre} />
                        <Select className="w-40" label="Sexo" name="sexo" onChange={handleGlobalChange}>
                            <SelectItem key={'H'} variant="flat">H</SelectItem>
                            <SelectItem key={'M'} variant="flat">M</SelectItem>
                        </Select>
                    </div>
                    <Select selectedKeys={getPuesto(record.puesto)} label='Puesto' name='puesto' onChange={handleGlobalChange}>
                        {
                            puestos.map((p) => <SelectItem key={p} textValue={p} variant="flat">{p}</SelectItem>)
                        }
                    </Select>
                    <YearAndPeriodSelector />
                    <AcademicCharge academicPrograms={academicPrograms} />
                    <AddActivityButton isDisabled={template?.id} />
                    <Input label="Total" type="number" min={0} name="total" value={totalHoras == 0 ? '' : totalHoras} defaultValue={record?.total} isDisabled onChange={handleGlobalChange} />
                    <Button startContent={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    } className="w-full bg-utim" variant="solid" onPress={handleSubmit} isDisabled={(template?.id) || (totalHoras < 32)} isLoading={loading}>
                        Guardar
                    </Button>
                </form>
            </div>
        </div>
    )
}
