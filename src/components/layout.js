import socket from "@/utils/socket"
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import Image from "next/image"
import logo from "public/utim.png"
import { useEffect } from "react"
import toast from "react-hot-toast"
export const Layout = ({ children }) => {
    useEffect(() => {
        socket.on('notify', (data) => {
            toast.success(data, {
                icon: '👏',
                id: 'notify',
            })
        })
    })
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