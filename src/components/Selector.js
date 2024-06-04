import { StoredContext } from "@/context"
import { generatePeriods } from "@/utils"
import { Select, SelectItem, SelectSection } from "@nextui-org/react"

export const YearSelector = ({ yearList, setState }) => {
    return (
        <Select label='Año' className="md:w-2/5" onChange={e => {
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

export const PeriodSelector = ({ selectedYear }) => {
    const { setStored } = StoredContext()
    const handleChange = (e) => {
        const option = e.target.value
        const opts = [
            {
                periodo: "enero - abril",
                grados: ['2', '5', '8'],
            },
            {
                periodo: "mayo - agosto",
                grados: ['3', '6', '9'],
            },
            {
                periodo: "septiembre - diciembre",
                grados: ['1', '4', '7'],
            }
        ]
        const groups = opts.find(opt => {
            return option.includes(opt.periodo)
        })
        setStored({ defaultGroups: groups.grados.map(g=>[`${g}A`, `${g}B`, `${g}C`]).flat() })
    }
    return (
        <Select label='Periodo' autoCapitalize="words" onChange={handleChange}>
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