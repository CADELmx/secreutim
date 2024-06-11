import { CircularProgress } from '@nextui-org/react'
import React from 'react'
import { Toaster, useToaster } from 'react-hot-toast'

export default function Notify() {
    const { handlers: { startPause, endPause } } = useToaster()
    return (
        <div onMouseEnter={startPause} onMouseLeave={endPause} >
            <Toaster position='top-right' toastOptions={{
                error: {
                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                },
                style: {
                    backgroundColor: 'background',
                    color: 'revert',
                    boxShadow: '0 1px 5px #09090b',
                    overflow: 'hidden',
                }, icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path aria-label='path'
                        strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>,
                loading: {
                    icon: <CircularProgress aria-label='progress' size='sm' className='h-4' />
                },
                duration: 5000
            }}></Toaster>
        </div>
    )
}
