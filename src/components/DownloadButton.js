import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export const MoreOptions = ({ templateid, templatename }) => {
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
        toast.promise(fetch(`/api/excelreport/${templateid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        }), {
            loading: 'Descargando...',
            success: (data) => {
                switch (data.status) {
                    case 200:
                        download(data)
                        return 'Descargado'
                    case 404:
                        return 'No se encontraron datos'
                    case 500:
                        return 'Error al generar el archivo'
                    default:
                        return 'Error al descargar'
                }
            },
            error: 'Error al descargar'
        }, {
            id: 'download-template',
        })
    }
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="light" isIconOnly aria-label="opciones">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label='Menú de acciones'
                className='p-0 m-0'
                onAction={key => key === 'descargar' && onDownload()}
            >
                <DropdownItem key={'descargar'} aria-label='descargar' startContent={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                }>
                    Descargar excel
                </DropdownItem>
                <DropdownItem key={'ver'} aria-label='ver' startContent={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                }>
                    <Link legacyBehavior passHref href={`/plantilla/${templateid}`}>
                        Ver plantilla
                    </Link>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
