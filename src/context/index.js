import { defaultRecord } from '@/utils'
import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import axios from 'axios'
const Context = createContext()

export const StoredContext = () => useContext(Context)

export const ContextProvider = ({ children }) => {
    const [memory, setMemory] = useState({
        record: defaultRecord,
        defaultGroups: [],
        socket: io(),
        selectedItem: defaultRecord.actividad[0].id,
        user: getCookie('user', { secure: true })
    })
    const login = async (email, password) => {
        const { data, status } = await axios.post('/api/login', { email, password })
        if (status == 200 || status == 201) {
            const { user } = data
            setMemory({ ...memory, user })
            setCookie('user', user, { secure: true })
            return { error: false }
        }
        return { error: true }
    }
    const logout = async () => {
        await fetch('/api/logout')
        deleteCookie('user')
        setMemory({ ...memory, user: null })
    }
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
        handleGlobalChange,
        login,
        logout,
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