import { saxios } from '@/requests'
import { setCookie } from 'cookies-next'
const loginHandler = async (req, res) => {
    if (req.method === 'POST') {
        const { email, password } = req.body
        if (email === '' || password === '' || !email || !password) {
            return res.status(400).json({ error: 'Credenciales requeridas' })
        }
        try {
            const { status, data } = await saxios.post('/auth/login', {
                username: email,
                password: password,
            })
            if (status !== 201 && status !== 200) {
                return res.status(status).json({ error: 'No se pudo autenticar' })
            }
            const { access_token } = data
            setCookie('token', access_token, {
                res,
                maxAge: 60 * 60 * 24,
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })
            return res.status(status).json({ message: 'Usuario autenticado', user: email })
        } catch (error) {
            return res.status(500).json({ error: 'Error interno' })
        }
    } else {
        return res.status(404).json({ error: 'Método no permitido' })
    }
}

export default loginHandler