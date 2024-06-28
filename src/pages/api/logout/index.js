import { deleteCookie } from "cookies-next"

const logoutHandler = async (req, res) => {
    if (req.method === 'GET') {
        deleteCookie('token', {
            req,
            res,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        })
        return res.status(200).json({ message: 'Sesión cerrada' })
    }
    return res.status(404).json({ error: 'Método no permitido' })
}

export default logoutHandler