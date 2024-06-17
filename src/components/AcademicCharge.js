import { Accordion, AccordionItem, Badge, BreadcrumbItem, Breadcrumbs, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { Activity } from "./Activity"
import { StoredContext } from "@/context"

export const AcademicCharge = ({ academicPrograms }) => {
    const { memory: { record: { actividad }, selectedItem }, setStored } = StoredContext()
    return (
        <Accordion aria-label="Academic Details" showDivider={false} isCompact fullWidth selectionMode="multiple">
            <AccordionItem aria-label="Academic Charge" title={<>Carga académica<p className="text-sm text-utim font-semibold tracking-wider">selecciona actividades académicas</p></>} startContent={<Badge color="primary" content={actividad.length}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                </svg>
            </Badge>}>
                <Breadcrumbs variant="light" itemsBeforeCollapse={1} itemsAfterCollapse={2} separator={','} classNames={{
                    list: "gap-2",
                }} itemClasses={{
                    separator: "hidden",
                }} renderEllipsis={({ items, ellipsisIcon, separator }) => {
                    return (
                        <Dropdown className="grid min-w-[10]" aria-label="Item Selector">
                            <DropdownTrigger aria-label="Dropdown Button">
                                <Button isIconOnly color={
                                    items.some(e => e.accessKey === selectedItem) ? 'primary' : 'default'
                                } className="min-w-unit-6 w-unit-6 h-unit-6" size="sm" variant="solid">
                                    {ellipsisIcon}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu variant="solid" className="m-0" key={'DropdownSelectItem'} aria-label="Dropdown actividades">
                                {
                                    items.map((e, i) => {
                                        return (
                                            <DropdownItem key={i} className="p-0 my-1 w-full grid" color="primary" aria-label={`Select act ${i}`}>
                                                {e.children}
                                            </DropdownItem>
                                        )
                                    })
                                }
                            </DropdownMenu>
                        </Dropdown>
                    )
                }}>
                    {
                        actividad.map((e, i) => {
                            return (
                                <BreadcrumbItem key={e.id} accessKey={e.id} isCurrent={e.id === selectedItem}>
                                    {
                                        <Chip size="sm" accessKey={e.id} onClick={() => {
                                            setStored({ selectedItem: e.id })
                                        }} color={e.id === selectedItem ? 'primary' : 'default'}>
                                            {
                                                `Actividad ${i + 1}`
                                            }
                                        </Chip>
                                    }
                                </BreadcrumbItem>
                            )
                        })
                    }
                </Breadcrumbs>
            </AccordionItem>
            <AccordionItem aria-label="Activity Details" startContent={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
            } title='Detalles de carga académica'>
                {
                    actividad.filter((e) => e.id == selectedItem).map((act, i) => {
                        return <Activity key={act.id} act={act} eduPrograms={academicPrograms} />
                    })
                }
            </AccordionItem>
        </Accordion>
    )
}
