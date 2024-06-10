import { StoredContext } from "@/context"
import { checkEmptyStringOption, distribucionActividades, generatePeriods } from "@/utils"
import { Input, Select, SelectItem, SelectSection, Textarea } from "@nextui-org/react"
import { useEffect, useState } from "react"

const YearSelector = ({ selectedYear, setState }) => {
    const { memory: { record }, setStored } = StoredContext()
    const year = new Date().getFullYear()
    const yearList = Array.from({ length: 3 }, (_, k) => `${year - k + 1}`)
    return (
        <Select label='Año' disallowEmptySelection defaultSelectedKeys={[selectedYear]} className="md:w-2/5" onChange={e => {
            setState(e.target.value)
            setStored({ record: { ...record, anio: e.target.value } })
        }}>
            {
                yearList.map((year) => {
                    return <SelectItem key={year} variant="flat">{year}</SelectItem>
                })
            }
        </Select>
    )
}

const PeriodSelector = ({ selectedYear }) => {
    const { setStored, memory: { record } } = StoredContext()
    const periods = [
        {
            periodo: "enero - abril",
            grados: ['2', '5', '8'],
            meses: ['enero', 'febrero', 'marzo', 'abril']
        },
        {
            periodo: "mayo - agosto",
            grados: ['3', '6', '9'],
            meses: ['mayo', 'junio', 'julio', 'agosto']
        },
        {
            periodo: "septiembre - diciembre",
            grados: ['1', '4', '7'],
            meses: ['septiembre', 'octubre', 'noviembre', 'diciembre']
        }
    ]
    const handleChange = (e) => {
        const option = e.target.value
        const groups = periods.find(opt => {
            return option.includes(opt.periodo)
        })
        const defaultGroups = option === "" ? [] :
            groups.grados.map(g => [`${g}A`, `${g}B`, `${g}C`]).flat()
        setStored({ defaultGroups, record: { ...record, periodo: option, anio: selectedYear } })
    }
    const actualMonth = new Date().toLocaleString('es-MX', { month: 'long' })
    const actualPeriod = periods.find(p => p.meses.includes(actualMonth))
    const defaultPeriod = `${actualPeriod.periodo} ${selectedYear}: Ordinario`
    useEffect(() => {
        if (!record.periodo) {
            handleChange({ target: { value: defaultPeriod } })
        }
    }, [])
    return (
        <Select label='Periodo' autoCapitalize="words" onChange={handleChange} disallowEmptySelection defaultSelectedKeys={[defaultPeriod]}>
            <SelectSection title={'Ordinario'}>
                {
                    generatePeriods(selectedYear, true).map(p => {
                        return <SelectItem key={p} variant="flat">{p}</SelectItem>
                    })
                }
            </SelectSection>
            <SelectSection title={'Extraordinario'}>
                {
                    generatePeriods(selectedYear, false).map(p => {
                        return <SelectItem key={p} variant="flat">{p}</SelectItem>
                    })
                }
            </SelectSection>
        </Select>
    )
}

export const YearAndPeriodSelector = () => {
    const year = new Date().getFullYear()
    const [selectedYear, setSelectedYear] = useState(`${year}`)
    return (
        <div className="flex flex-col sm:flex-row gap-2">
            <YearSelector setState={setSelectedYear} selectedYear={selectedYear} />
            <PeriodSelector selectedYear={selectedYear} />
        </div>
    )
}

export const ActTypeSelector = ({ act, handler }) => {
    return (
        <Select className={act?.distribucion_actividades === "Tutorías" ? '' : 'md:w-3/5'} label="Distribución" onChange={handler} name="distribucion_actividades" defaultSelectedKeys={checkEmptyStringOption(act?.distribucion_actividades)}>
            {
                distribucionActividades.map((a) => {
                    return <SelectItem key={a} variant="flat">{a}</SelectItem>
                })
            }
        </Select>
    )
}

export const ManagementTypeSelector = ({ act, handler }) => {
    return (
        <Select className='md:w-2/4' name='tipo_gestion' label='Tipo de gestión' onSelectionChange={handler} defaultSelectedKeys={[act?.tipo_gestión]}>
            <SelectItem key={'INST'} variant="flat">Institucional</SelectItem>
            <SelectItem key={'ACAD'} variant="flat">Académica</SelectItem>
            <SelectItem key={'ASES'} variant='flat'>Asesoría</SelectItem>
        </Select>
    )
}

export const StayTypeSelector = ({ act, handler }) => {
    return (
        <Select className='' onSelectionChange={handler} name='tipo_estadia' label='Tipo de estadía' defaultSelectedKeys={checkEmptyStringOption(act.tipo_estadia)}>
            <SelectItem key='TSU'>TSU</SelectItem>
            <SelectItem key='ING'>ING</SelectItem>
        </Select>
    )
}

export const GroupSelector = ({ act, handler }) => {
    const { memory: { defaultGroups } } = StoredContext()
    return (
        <div className="flex flex-col gap-2 sm:flex-row">
            <Select isDisabled={!act.pe} label="Grados y grupos" name="grados_grupos" selectionMode="multiple" description="Selección múltiple" defaultSelectedKeys={act.grados_grupos} onSelectionChange={handler}
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

export const AcademicProgramSelector = ({ act, eduPrograms, handler }) => {
    return (
        <div className="flex flex-col md:flex-row gap-2">
            <Select isDisabled={act?.distribucion_actividades === ""} className="md:w-2/5" label='Programa educativo' name='pe' defaultSelectedKeys={act.pe ? [act.pe] : []} onSelectionChange={handler} >
                {
                    eduPrograms.map((e) =>
                        <SelectItem key={e.id} variant="flat">{e.siglas}</SelectItem>)
                }
            </Select>
            <Textarea minRows={1} size="sm" radius="md" isReadOnly label='Detalles PE' isDisabled value={eduPrograms.find(e => e.id == act.pe)?.descripcion} />
        </div>
    )
}