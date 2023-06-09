import { Router, json } from "express";
import { GetCartController, CreateCartController, GetCartByIdController, AddProductToCartController, DeleteProductFromCartController, DeleteCartController, Purchase } from "../controllers/cart.controller.js";
import { verifyRole } from "../middlewares/auth.roles.js";
import { LoginViewController } from "../controllers/views.controller.js";
import compression from "express-compression";

const cartRouter = Router();
cartRouter.use(json())

//Ruta para obtener Carritos//
cartRouter.get("/", compression({ brotli: { enable: true, zlib: {} } }), GetCartController);

//Ruta para crear Carritos//
cartRouter.post("/", CreateCartController);

//Ruta para obtener Carritos por ID//
cartRouter.get("/:cid", GetCartByIdController);

//Ruta para agregar producto al Carritos//
cartRouter.post("/:cid/product/:pid", verifyRole(["user"]), AddProductToCartController);

//Ruta compra sin carritp//
cartRouter.post("/sincarrito", LoginViewController);//me envia al login

//Ruta para eliminar producto del carrito//
cartRouter.delete("/:cid/product/:pid", DeleteProductFromCartController);

//Ruta para eliminar Carritos//
cartRouter.delete("/:cid", DeleteCartController)

//Ruta para confirmar la compra//
cartRouter.post("/:cid/purchase", Purchase);

export default cartRouter;