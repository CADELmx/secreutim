import { AcademicTemplateForm } from "@/components/AcademicTemplateForm"
import { generateSingleRecord, getAcademicPrograms, getAllAcademicWorkers } from "@/models/transactions"
import { promiseResolver } from "@/utils"

export default function TemplateById({ plantilla }) {
    return (
        <AcademicTemplateForm template={plantilla} />
    )
}

export const getStaticProps = async ({ params: { id } }) => {
    const eduPromise = getAcademicPrograms()
    const acaPromise = getAllAcademicWorkers()
    const [eduData, acaData] = await promiseResolver([eduPromise, acaPromise])
    const error = eduData.error || acaData.error
    const { props } = generateSingleRecord(id)
    return {
        revalidate: 10,
        props: {
            ...props,
            getSsrError: error ? 'Algo salió mal, recarga la página' : null,
            academicWorkers: acaData.data,
            academicPrograms: eduData.data,
        }
    }
}