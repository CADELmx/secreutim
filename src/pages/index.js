
import { AcademicTemplateForm } from "@/components/AcademicTemplateForm";
import { ModalError } from "@/components/ModalError";
import { getAcademicPrograms, getAllAcademicWorkers } from "@/models/transactions";
import { promiseResolver } from "@/utils";
import { useRouter } from "next/router";

export default function Index({ academicPrograms, academicWorkers, getSsrError }) {
  return (
    <>
      <ModalError error={getSsrError} />
      <AcademicTemplateForm academicPrograms={academicPrograms} academicWorkers={academicWorkers} />
    </>
  )
}

export const getStaticProps = async () => {
  const eduPromise = getAcademicPrograms()
  const acaPromise = getAllAcademicWorkers()
  const [eduData, acaData] = await promiseResolver([eduPromise, acaPromise])
  const error = eduData.error || acaData.error
  if (error) {
    console.error('#ERROR# Error al obtener datos de programas educativos y/o trabajadores')
  }
  return {
    revalidate: 5,
    props: {
      getSsrError: error ? 'Algo salió mal, recarga la página' : null,
      academicPrograms: eduData.data,
      academicWorkers: acaData.data,
    }
  }
}
