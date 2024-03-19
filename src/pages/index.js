import { Activity } from "@/components/Activity";
import { StoredContext } from "@/context";
import { defaultActivity, puestos, titulos } from "@/utils";
import { Accordion, AccordionItem, Badge, BreadcrumbItem, Breadcrumbs, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Select, SelectItem, SelectSection } from "@nextui-org/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Index() {
  const { memory: { record, selectedItem }, setStored } = StoredContext()
  const handleChange = (e) => {
    setStored({ record: { ...record, [e.target?.name]: e.target?.value } })
  }
  const handleCreate = () => {
    if (record.actividades[0].id === `act-${record.actividades.length}`) {
      setStored({
        record: {
          ...record, actividades: [...record.actividades, {
            ...defaultActivity,
            id: `act-${record.actividades.length + 1}`
          }]
        },
        selectedItem: `act-${record.actividades.length + 1}`
      })
      return
    }
    setStored({
      record: {
        ...record, actividades: [...record.actividades, {
          ...defaultActivity,
          id: `act-${record.actividades.length}`
        }]
      },
      selectedItem: `act-${record.actividades.length}`
    })
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex-col object-fill w-2/3 pt-5 mt-5">
        <form className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input label="N." type="number" name="no" onChange={handleChange} />
            <Input label="N.T." type="number" name="nt" onChange={handleChange} />
          </div>
          <div className="flex gap-2" >
            <Select label='Título' name="titulo" onChange={handleChange}>
              {
                titulos.map((titulo) => {
                  return <SelectItem key={titulo} variant="flat">{titulo}</SelectItem>
                })
              }
            </Select>
            <Select className="w-40" label="Sexo" name="sexo" onChange={handleChange}>
              <SelectItem key={'H'} variant="flat">H</SelectItem>
              <SelectItem key={'M'} variant="flat">M</SelectItem>
            </Select>
          </div>
          <Select label='Puesto' name='puesto' onChange={handleChange}>
            <SelectSection title={'Profesor de Tiempo Completo'}>
              {puestos.filter(p => p.includes('Profesor de Tiempo Completo')).map((p) => <SelectItem key={p} textValue={p} variant="flat">{p.replace('Profesor de Tiempo Completo ', '')}</SelectItem>)}
            </SelectSection>
            <SelectSection title={'Otros'}>
              {puestos.filter(p => !p.includes('Profesor de Tiempo Completo')).map((p) => <SelectItem key={p} textValue={p} variant="flat">{p}</SelectItem>)}
            </SelectSection>
          </Select>
          <Input isRequired label="Apellido Paterno" type="text" name="apellido_paterno" onChange={handleChange} />
          <Input isRequired label="Apellido Materno" type="text" name="apellido_materno" onChange={handleChange} />
          <Input isRequired label="Nombres" type="text" name="nombres" onChange={handleChange} />
          <Accordion showDivider={false} isCompact fullWidth selectionMode="multiple">
            <AccordionItem title='Actividades' startContent={<Badge color="primary" content={record.actividades.length}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
              </svg>
            </Badge>}>
              <Breadcrumbs onAction={(key) => setStored({ selectedItem: key })} variant="light" itemsBeforeCollapse={1} itemsAfterCollapse={2} separator={','} classNames={{
                list: "gap-2",
              }} itemClasses={{
                item: [
                  "px-2 py-0.5 border-small border-default-400 rounded-small",
                  "data-[current=true]:border-foreground data-[current=true]:bg-foreground data-[current=true]:text-background transition-colors",
                  "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
                ],
                separator: "hidden",
              }} renderEllipsis={({ items, ellipsisIcon, separator }) => {
                return (
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly color="primary" className="min-w-unit-6 w-unit-6 h-unit-6" size="sm" variant="solid">
                        {ellipsisIcon}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu key={'d'}>
                      {
                        items.map((e, i) => (
                          <DropdownItem key={i + 1} onClick={() => {
                            setStored({ selectedItem: `act-${i + 1}` })
                          }}>
                            {e.children}
                          </DropdownItem>
                        ))
                      }
                    </DropdownMenu>
                  </Dropdown>
                )
              }}>
                {
                  record.actividades.map((e, i) => {
                    return (
                      <BreadcrumbItem key={e.id} isCurrent={e.id == selectedItem}>
                        {
                          e.id.replace('act-', 'Actividad ')
                        }
                      </BreadcrumbItem>
                    )
                  })
                }
              </Breadcrumbs>
            </AccordionItem>
            <AccordionItem startContent={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>

            } title='Detalles de la actividad'>
              {
                record.actividades.filter((e) => e.id == selectedItem).map((act, i) => {
                  return <Activity key={act.id} act={act} />
                })
              }
            </AccordionItem>
          </Accordion>
          <Button startContent={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

          } className="w-full" variant="solid" color="primary" onClick={handleCreate}>
            Agregar actividad
          </Button>
          <Input label="Subtotal por clasificación" type="number" name="subtotal_clasificacion" onChange={handleChange} />
          <Input label="Total" type="number" name="total" onChange={handleChange} />
          <Button startContent={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          } className="w-full" variant="solid" color="success" onClick={() => {
            toast.loading('Listo')
          }}>
            Guardar
          </Button>
        </form>
      </div>
    </div>
  )
}
