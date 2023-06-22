import usersModel from "../dao/models/users.model.js";

export const isPremium = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersModel.findById(userId);
        const userRol = user.rol;

        if (userRol === "user") {
            user.rol = "premium"
        } else if (userRol === "premium") {
            user.rol = "user"
        } else {
            return res.json({ status: "error", message: "No fue posible modificar la membresia" })
        }
        await usersModel.updateOne({ _id: user._id }, user)
        res.send({ status: "succes", message: "Se ha actualizado la membresía" })
    } catch (error) {
        res.status(404).send("No se pudo modificar el tipo de usuario")
    }
}