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
    return (
        <Select label='Periodo' autoCapitalize="words">
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