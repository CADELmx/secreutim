import { AcademicTemplateForm } from "@/components/AcademicTemplateForm"
import { ModalError } from "@/components/ModalError"
import { generateSingleRecord, getAcademicPrograms, getAllAcademicWorkers, getTemplates } from "@/models/transactions"
import { promiseResolver } from "@/utils"

export default function TemplateById({ plantilla, getSsrError, academicPrograms, academicWorkers }) {
    return (
        <>
            <ModalError error={getSsrError} />
            <AcademicTemplateForm academicWorkers={academicWorkers} academicPrograms={academicPrograms} template={plantilla} />
        </>
    )
}

export const getStaticPaths = async () => {
    const { data, error } = await getTemplates()
    if (error) {
        return {
            paths: [],
            fallback: true,
        }
    }
    const paths = data.map(({ id }) => ({ params: { id: id.toString() } }))
    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps = async ({ params: { id } }) => {
    const eduPromise = getAcademicPrograms()
    const acaPromise = getAllAcademicWorkers()
    const [eduData, acaData] = await promiseResolver([eduPromise, acaPromise])
    const { props } = await generateSingleRecord(id)
    const error = eduData.error || acaData.error || props.error
    return {
        revalidate: 3,
        props: {
            ...props,
            getSsrError: error ? 'Algo salió mal, recarga la página' : null,
            academicWorkers: acaData.data,
            academicPrograms: eduData.data,
        }
    }
}