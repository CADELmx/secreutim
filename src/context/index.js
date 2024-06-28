import { defaultRecord } from '@/utils'
import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
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
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const { error, user } = await res.json()
        if (error) {
            return { error }
        }
        setMemory({ ...memory, user })
        setCookie('user', user, { secure: true })
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