import { supabase } from '@/utils';
import { Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useState } from 'react';
import toast from 'react-hot-toast';

export const ChangeEstatus = ({ status, templateid }) => {
    const statusTypes = [{ name: 'Pendiente', color: 'warning' }, { name: 'Aprobado', color: 'success' }, { name: 'Corrección', color: 'danger' }];
    const [taskStatus, setTaskStatus] = useState(statusTypes.find(s => s.name === status) || statusTypes[0])
    const handleTaskStatus = (status) => {
        toast.promise(supabase.from('plantilla').update({ status: status.name }).eq('id', templateid), {
            loading: 'Cambiando estado...',
            success: ({ data, error }) => {
                if (error) {
                    return 'Error al cambiar estado'
                }
                setTaskStatus(status)
                return 'Estado actualizado'
            },
            error: 'Error al intentar cambiar estado'
        },{
            id: 'status-change',
        })
    }
    return (
        <Dropdown className="grid min-w-[10]">
            <DropdownTrigger>
                <Chip color={taskStatus.color} className='min-w-full hover:cursor-pointer' variant="dot">{taskStatus.name}</Chip>
            </DropdownTrigger>
            <DropdownMenu aria-label={'dropdown menu for status'} variant="solid" className="p-0 m-0 w-full" classNames={{ base: 'p-0 m-0 w-full', list: 'p-0 m-0 w-full' }}>
                {
                    statusTypes.map((status, i) => {
                        return (
                            <DropdownItem aria-label={status.name + 'dropdown item'} key={i} textValue={status.name} className="p-0 m-0">
                                <Chip onClick={() => handleTaskStatus(status)} color={status.color} className="min-w-full" variant="dot">{status.name}</Chip>
                            </DropdownItem>
                        )
                    })
                }
            </DropdownMenu>
        </Dropdown>
    )
}
