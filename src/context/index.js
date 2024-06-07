import { defaultRecord } from '@/utils'
import { createContext, useContext, useState } from 'react'

const Context = createContext()

export const StoredContext = () => useContext(Context)

export const ContextProvider = ({ children }) => {
    const [memory, setMemory] = useState({
        record: defaultRecord,
        defaultGroups: [],
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
    return (
        <Context.Provider value={ctx}>
            {children}
        </Context.Provider>
    )
}