export const verifyRole = (rol) => {
    return (req, res, next) => {
        if (!req.session) {
            return res.json({ status: "Error", message: "No se encuentra autentificado" })
        }
        if (!rol.includes(req.session.rol)) {
            return res.json({ status: "Error", message: "No se encuentra autorizado" })
        }
        next();
    }

}