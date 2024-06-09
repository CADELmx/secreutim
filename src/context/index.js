import { defaultRecord } from '@/utils'
import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const Context = createContext()

export const StoredContext = () => useContext(Context)

export const ContextProvider = ({ children }) => {
    const [memory, setMemory] = useState({
        record: defaultRecord,
        defaultGroups: [],
        socket: io(),
        selectedItem: defaultRecord.actividades[0].id
    })
    const setStored = (prop) => setMemory((prev) => ({ ...prev, ...prop }))
    const handleGlobalChange = (event) => setStored({
        record: {
            ...memory.record,
            [event.target?.name]: event.target?.value
        }
    })
    const ctx = {
        memory,
        setStored,
        handleGlobalChange
    }
    useEffect(() => {
        const setupSocket = async () => {
            await fetch('/api/socket')
            return () => {
                memory.socket.disconnect()
            }
        }
        setupSocket()
    }, [])
    return (
        <Context.Provider value={ctx}>
            {children}
        </Context.Provider>
    )
}