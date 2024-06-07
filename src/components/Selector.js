import { StoredContext } from "@/context"
import { generatePeriods } from "@/utils"
import { Select, SelectItem, SelectSection } from "@nextui-org/react"
import { useEffect, useState } from "react"

const YearSelector = ({ selectedYear, setState }) => {
    const yearList = Array.from({ length: 3 }, (_, k) => `${selectedYear - k + 1}`)
    return (
        <Select label='Año' defaultSelectedKeys={[selectedYear]} className="md:w-2/5" onChange={e => {
            setState(e.target.value)
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
    const { setStored } = StoredContext()
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
        setStored({ defaultGroups })
    }
    const actualMonth = new Date().toLocaleString('es-MX', { month: 'long' })
    const actualPeriod = periods.find(p => p.meses.includes(actualMonth))
    const defaultPeriod = `${actualPeriod.periodo} ${selectedYear}: Ordinario`
    useEffect(() => {
        handleChange({ target: { value: defaultPeriod } })
    }, [])
    return (
        <Select label='Periodo' autoCapitalize="words" onChange={handleChange} defaultSelectedKeys={[defaultPeriod]}>
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