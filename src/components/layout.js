import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import Image from "next/image"
import logo from "public/logo.svg"
export const Layout = ({ children }) => {
    return (
        <>
            <Navbar>
                <NavbarBrand>
                    <Image src={logo} alt="logo" width={50} height={50} />
                </NavbarBrand>
                <NavbarContent>

                </NavbarContent>
            </Navbar>
            {children}
        </>
    )
}