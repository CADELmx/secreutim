import { defaultRecord } from '@/utils'
import { createContext, useContext, useState } from 'react'

const Context = createContext()

export const StoredContext = () => useContext(Context)

export const ContextProvider = ({ children }) => {
    const [memory, setMemory] = useState({
        record: defaultRecord,
        selectedItem: 'act-0'
    })
    const setStored = (prop) => setMemory((prev) => ({ ...prev, ...prop }))
    const ctx = {
        memory,
        setStored
    }
    return (
        <Context.Provider value={ctx}>
            {children}
        </Context.Provider>
    )
}