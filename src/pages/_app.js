import { Layout } from '@/components/layout'
import { ContextProvider } from '@/context'
import '@/styles/globals.css'
import Notify from '@/toast'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute='class' enableSystem>
        <ContextProvider>
          <Notify />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContextProvider>
      </ThemeProvider>
    </NextUIProvider>
  )
}
