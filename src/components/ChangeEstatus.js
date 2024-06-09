import { Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useState } from 'react';

export const ChangeEstatus = () => {
    const statusTypes = [{ name: 'Pendiente', color: 'warning' }, { name: 'Aprobado', color: 'success' }, { name: 'Corrección', color: 'danger' }];
    const [taskStatus, setTaskStatus] = useState({ name: 'Pendiente', color: 'warning' });
    const handleTaskStatus = (status) => {
        setTaskStatus(status);
    }
    return (
        <Dropdown className="grid min-w-[10]">
            <DropdownTrigger>
                <Chip color={taskStatus.color} className='min-w-full' variant="dot">{taskStatus.name}</Chip>
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
