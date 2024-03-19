import { NextUIProvider } from "@nextui-org/react"

export const Layout = ({ children }) => {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}