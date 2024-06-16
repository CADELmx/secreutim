import { Button } from '@nextui-org/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const DownloadButton = ({ templateid, templatename }) => {
    const [loading, setLoading] = useState(false)
    const download = async (data) => {
        const blob = await data.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `Plantilla ${templatename}.xlsx`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
    const onDownload = () => {
        setLoading(true)
        toast.promise(fetch(`/api/excelreport/${templateid}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        }), {
            loading: 'Descargando...',
            success: (data) => {
                download(data)
                setLoading(false)
                return 'Descargado'
            },
            error: 'Error al descargar'
        })
    }
    return (
        <Button isLoading={loading} isIconOnly variant="light" aria-label="descargar" onClick={onDownload}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
        </Button>
    )
}
