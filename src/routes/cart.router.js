import { Router, json } from "express";
import { GetCartController, CreateCartController, GetCartByIdController, AddProductToCartController, DeleteProductFromCartController, DeleteCartController } from "../controllers/cart.controller.js";


const cartRouter = Router();
cartRouter.use(json())

//Ruta para obtener Carritos//
cartRouter.get("/", GetCartController);

//Ruta para crear Carritos//
cartRouter.post("/", CreateCartController);

//Ruta para obtener Carritos por ID//
cartRouter.get("/:cid", GetCartByIdController);

//Ruta para agregar producto al Carritos//
cartRouter.post("/:cid/product/:pid", AddProductToCartController);

//Ruta para eliminar producto del carrito//
cartRouter.delete("/:cid/product/:pid", DeleteProductFromCartController);

//Ruta para eliminar Carritos//
cartRouter.delete("/:cid", DeleteCartController)

// //
const router = Router();

router.post("/", async (req, res) => {
    try {
        const cartCreated = await CartModel.create({});
        res.send(cartCreated)
    } catch (error) {
        res.send(error.message)
    }
});

router.put("/", async (req, res) => {
    try {
        const { cartId, productId, quantity } = req.body;
        const cart = await CartModel.findById(cartId);
        cart.products.push({ id: productId, quantity: quantity });
        cart.save();
        res.send("producto agregado")
    } catch (error) {
        res.send(error.message)
    }
});

router.post("/:cid/purchase", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await CartModel.findById(cartId);
        if (cart) {
            if (!cart.products.length) {
                return res.send("es necesario que agrege productos antes de realizar la compra")
            }
            const ticketProducts = [];
            const rejectedProducts = [];
            for (let i = 0; i < cart.products.length; i++) {
                const cartProduct = cart.products[i];
                const productDB = await ProductModel.findById(cartProduct.id);
                //comparar la cantidad de ese producto en el carrito con el stock del producto
                if (cartProduct.quantity <= productDB.stock) {
                    ticketProducts.push(cartProduct);
                } else {
                    rejectedProducts.push(cartProduct);
                }
            }
            console.log("ticketProducts", ticketProducts)
            console.log("rejectedProducts", rejectedProducts)
            const newTicket = {
                code: uuidv4(),
                purchase_datetime: new Date().toLocaleString(),
                amount: 500,
                purchaser: req.user.email
            }
            const ticketCreated = await ticketsModel.create(newTicket);
            res.send(ticketCreated)
        } else {
            res.send("el carrito no existe")
        }
    } catch (error) {
        res.send(error.message)
    }
});

export { router as cartRouter }


export default cartRouter;