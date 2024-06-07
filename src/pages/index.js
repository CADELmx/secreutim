
import { AcademicCharge } from "@/components/AcademicCharge";
import { AddActivityButton } from "@/components/Activity";
import { YearAndPeriodSelector } from "@/components/Selector";
import { NtInput } from "@/components/WorkerNumber";
import { StoredContext } from "@/context";
import { puestos, supabase } from "@/utils";
import socket from "@/utils/socket";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

export default function Index({ programasEducativos, academicWorkers }) {
  const { memory: { record }, handleGlobalChange } = StoredContext()
  const getPuesto = (puesto) => {
    if (puesto == "") return []
    if (!puestos.includes(puesto)) {
      puestos.push(puesto)
      return [puesto]
    }
    return [record?.puesto]
  }
  const totalHoras = record.actividades.map(e => e.subtotal_clasificacion).reduce((p, c) => p + c, 0)

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
          <AcademicCharge programasEducativos={programasEducativos} />
          <AddActivityButton />
          <Input label="Total" type="number" min={0} name="total" value={totalHoras == 0 ? '' : totalHoras} isDisabled onChange={handleGlobalChange} />
          <Button startContent={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          } className="w-full bg-utim" variant="solid" onPress={() => {
            socket.emit('notify', 'Alguien envió cosas')
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
