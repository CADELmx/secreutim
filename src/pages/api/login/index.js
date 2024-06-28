import { setCookie } from 'cookies-next'
const loginHandler = async (req, res) => {
    if (req.method === 'POST') {
        const { email, password } = req.body
        if (email === '' || password === '' || !email || !password) {
            return res.status(400).json({ error: 'Credenciales requeridas' })
        }
        const response = await fetch(`${process.env.API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password,
            }),
        })
        if (response.status === 401) {
            return res.status(401).json({ error: 'Credenciales inválidas' })
        }
        if (response.status === 201 || response.status === 200) {
            const { access_token } = await response.json()
            setCookie('token', access_token, {
                req,
                res,
                maxAge: 60 * 60 * 24,
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })
            return res.status(200).json({ message: 'Usuario autenticado', user: email })
        }
    }
    return res.status(404).json({ error: 'Método no permitido' })
}

export default loginHandler