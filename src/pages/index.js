import { Activity, AddActivityButton } from "@/components/Activity";
import { YearAndPeriodSelector } from "@/components/Selector";
import { NtInput } from "@/components/WorkerNumber";
import { StoredContext } from "@/context";
import { puestos, supabase } from "@/utils";
import { Accordion, AccordionItem, Badge, BreadcrumbItem, Breadcrumbs, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Select, SelectItem, SelectSection, Textarea } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function Index({ programasEducativos, academicWorkers }) {
  const { memory: { record, selectedItem }, setStored, handleGlobalChange } = StoredContext()
  const getPuesto = (puesto) => {
    if (puesto == "") return []
    if (!puestos.includes(puesto)) {
      puestos.push(puesto)
      return [puesto]
    }
    return [record?.puesto]
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex-col object-fill w-5/6 sm:w-2/3 pt-5 mt-5">
        <form className="flex flex-col gap-2">
          <NtInput academicWorkers={academicWorkers} />
          <div className="flex gap-2" >
            <Textarea minRows={1} size="sm" radius="md" isRequired label="Nombre" type="text" name="nombre" onChange={handleGlobalChange} value={record?.nombres} />
            <Select className="w-40" label="Sexo" name="sexo" onChange={handleGlobalChange}>
              <SelectItem key={'H'} variant="flat">H</SelectItem>
              <SelectItem key={'M'} variant="flat">M</SelectItem>
            </Select>
          </div>
          <Select selectedKeys={getPuesto(record?.puesto)} label='Puesto' name='puesto' onChange={handleGlobalChange}>
            {
              puestos.map((p) => <SelectItem key={p} textValue={p} variant="flat">{p}</SelectItem>)
            }
          </Select>
          <YearAndPeriodSelector />
          <Accordion showDivider={false} isCompact fullWidth selectionMode="multiple">
            <AccordionItem title={<>Carga académica<p className="text-sm text-utim font-semibold tracking-wider">selecciona actividades académicas</p></>} startContent={<Badge color="primary" content={record.actividades.length}>
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
            } title='Detalles de carga académica'>
              {
                record.actividades.filter((e) => e.id == selectedItem).map((act, i) => {
                  return <Activity key={act.id} act={act} eduPrograms={programasEducativos} />
                })
              }
            </AccordionItem>
          </Accordion>
          <AddActivityButton />
          <Input label="Total" type="number" min={0} name="total" value={record.actividades.map(e => e.subtotal_clasificacion).reduce((p, c) => p + c, 0)} onChange={handleGlobalChange} />
          <Button startContent={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          } className="w-full bg-utim" variant="solid" onPress={() => {
            toast.loading('Listo')
          }}>
            Guardar
          </Button>
        </form>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const eduPromise = supabase.from('programaseducativos').select('siglas,descripcion')
  const acaPromise = supabase.from('dpersonales').select('ide,nombre,puesto,area').likeAnyOf('puesto', [
    '%asignatura%',
    '%Tiempo Completo%',
    '%de Apoyo%',
  ]).in('area', [
    'P.E. de Tecnologías de la Información',
    'P.E. de Lengua Inglesa',
    'P.E. de Lengua inglesa',
  ])
  const promiseResolver = async (promiseList) => {
    const results = await Promise.allSettled(promiseList)
    const data = results.map(r => r.value)
    return data
  }
  const [eduData, acaData] = await promiseResolver([eduPromise, acaPromise])
  if (eduData.error || acaData.error) {
    return {
      props: {
        error: 'Error al cargar los datos'
      }
    }
  }
  return {
    props: {
      programasEducativos: eduData.data,
      academicWorkers: acaData.data,
    }
  }
}
