import { StoredContext } from '@/context'
import { Avatar, Button, Chip } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const LoginButton = () => {
    const router = useRouter()
    const { memory: { user } } = StoredContext()
    if (router.pathname === '/user') {
        return null
    }
    return (
        user ? <Chip avatar={<Avatar color="primary" />}>{user}</Chip> : <Link href="/user" passHref legacyBehavior><Button size='' variant='bordered'>Iniciar sesión</Button></Link>
    )
}
