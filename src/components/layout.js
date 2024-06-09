import { StoredContext } from "@/context"
import { Chip, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import Image from "next/image"
import logo from "public/utim.png"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export const Layout = ({ children }) => {
    const { memory: { socket } } = StoredContext()
    const [isConnected, setIsConnected] = useState(false);
    const [trasport, setTrasport] = useState("N/A");
    useEffect(() => {
        function onConnect() {
            setIsConnected(true)
            setTrasport(socket.io.engine.transport.name)
            socket.io.engine.on("upgrade", (transport) => {
                setTrasport(transport.name)
                console.log(transport.name)
            })
            socket.emit("connection")
        }
        function onDisconnect() {
            setIsConnected(false)
            setTrasport("N/A")
        }
        function onNotify(data) {
            toast.success('Enviado', {
                id: "notify"
            })
        }
        if (socket.connected) {
            onConnect()
        }
        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect)
        socket.on("notify", onNotify)
        return () => {
            socket.off("connect", onConnect)
            socket.off("disconnect", onDisconnect)
        }
    }, [])
    return (
        <>
            <Navbar>
                <NavbarBrand>
                    <Image src={logo} alt="UTIM" className="hidden sm:w-32 sm:flex" width={80} height={80} />
                </NavbarBrand>
                <NavbarContent justify="center">
                    <h1 className="text-xl sm:text-2xl font-bold text-center">Gestión de plantillas docentes</h1>
                </NavbarContent>
                <NavbarContent justify="end">
                    <Chip variant="dot" className="hidden sm:flex" color={isConnected ? "success" : "error"}>{isConnected ? "Conectado" : "Desconectado"}</Chip>
                    <Chip variant="dot" radius="full" className="flex sm:hidden" color={isConnected ? "success" : "error"}>.</Chip>
                </NavbarContent>
            </Navbar>
            {children}
        </>
    )
}