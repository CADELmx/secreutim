import { ContextProvider } from '@/context'
import '@/styles/globals.css'
import Notify from '@/toast'
import { NextUIProvider } from '@nextui-org/react'

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <ContextProvider>
        <Notify />
        <Component {...pageProps} />
      </ContextProvider>
    </NextUIProvider>
  )
}
