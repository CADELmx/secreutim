import { StoredContext } from "@/context"
import { Avatar, Chip, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import logo from "public/utim.png"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { LoginButton } from "./LoginButton"

export const Layout = ({ children }) => {
    const navBarMenuItems = [
        { name: "Inicio", href: "/" },
        { name: "Secretaría", href: "/secretary" },
        { name: "Estado de plantillas", href: "/templatestatus" },
    ]
    const { memory: { socket, user } } = StoredContext()
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter()
    useEffect(() => {
        function onConnect() {
            setIsConnected(true)
            setTransport(socket.io.engine.transport.name)
            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name)
                console.log(transport.name)
            })
            socket.emit("connection")
        }
        function onDisconnect() {
            setIsConnected(false)
            setTransport("N/A")
        }
        function onTemplateError(data) {
            if (router.pathname === "/") {
                toast.error(data, {
                    id: "template-error",
                    duration: 5000,
                })
            }
        }
        function onCreatedTemplate(data) {
            if (router.pathname === "/secretary") {
                toast.success('Plantilla docente recibida', {
                    id: "template-created",
                    duration: 5000,
                })
            }
        }
        function onStatusUpdate(data) {
            if (router.pathname === "/") {
                toast.success(`Estado de la plantilla ${data.id} cambiado a ${data.status}`, {
                    id: "status",
                    duration: 5000,
                })
            }
        }
        if (socket.connected) {
            onConnect()
        }
        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("createdTemplate", onCreatedTemplate)
        socket.on("updateStatus", onStatusUpdate)
        socket.on("templateError", onTemplateError)
        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
        }
    }, [])
    return (
        <>
            <Navbar onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        className="sm:hidden"
                    />
                    <NavbarBrand>
                        <Image src={logo} alt="UTIM" className="sm:w-32 sm:flex" width={80} height={80} />
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex" justify="center">
                    {
                        navBarMenuItems.map((item) => (
                            <NavbarItem key={item.name} isActive={router.pathname === item.href}>
                                <Link
                                    href={item.href}
                                    className={router.pathname === item.href ? 'text-utim' : ''}>
                                    {item.name}
                                </Link>
                            </NavbarItem>
                        ))
                    }
                </NavbarContent>
                {
                    !isMenuOpen && (
                        <NavbarContent justify="end">
                            <LoginButton />
                            <Chip variant="dot" className="hidden sm:flex" color={isConnected ? "success" : "error"}>{isConnected ? "Conectado" : "Desconectado"}</Chip>
                            <Chip variant="dot" radius="full" className="flex sm:hidden" color={isConnected ? "success" : "danger"}>.</Chip>
                        </NavbarContent>
                    )
                }
                <NavbarMenu>
                    {
                        navBarMenuItems.map((item) => (
                            <NavbarItem key={item.name} isActive={router.pathname === item.href}>
                                <Link
                                    href={item.href}
                                    className={router.pathname === item.href ? 'text-utim' : ''}>
                                    {item.name}
                                </Link>
                            </NavbarItem>
                        ))
                    }
                    <LoginButton />
                    <Chip variant="dot" color={isConnected ? "success" : "danger"}>
                        {isConnected ? "Conectado" : "Desconectado"}
                    </Chip>
                </NavbarMenu>
            </Navbar>
            {children}
        </>
    )
}