import { StoredContext } from "@/context"
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import Image from "next/image"
import logo from "public/utim.png"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { io } from "socket.io-client"
export const Layout = ({ children }) => {
    const { setStored } = StoredContext()
    useEffect(() => {
        const setupSocket = async () => {
            try {
                await fetch('/api/socket')
                const socket = io()
                socket.on('notify', (notification) => {
                    toast.success(notification)
                })
                setStored({ socket })
            } catch (error) {
                toast.error('Error al conectar con el servidor de notificaciones')
            }
        }
        setupSocket()
    }, [])
    return (
        <>
            <Navbar>
                <NavbarBrand>
                    <Image src={logo} alt="UTIM" className="invisible sm:visible sm:w-32" width={80} height={80} />
                </NavbarBrand>
                <NavbarContent justify="center">
                    <h1 className="text-2xl font-bold text-center">Gestión de plantillas docentes</h1>
                </NavbarContent>
                <NavbarContent justify="end"></NavbarContent>
            </Navbar>
            {children}
        </>
    )
}