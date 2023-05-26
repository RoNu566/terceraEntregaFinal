import { CartManager } from "../config/persistance.js"
import { manager } from "../controllers/products.controller.js"
import TicketManager from "../dao/db-managers/ticket.manager.js";

const cartManager = new CartManager();
const ticketManager = new TicketManager();

export const GetCartController = async (req, res) => {
    let carrito = await cartManager.getCart();
    res.send(carrito);
}

export const CreateCartController = async (req, res) => {
    let carrito = await cartManager.addCart();
    res.send(carrito);
}

export const GetCartByIdController = async (req, res) => {
    let cid = req.params.cid;
    let carrito = await cartManager.checkCart(cid);
    if (!carrito) {
        res.send("Este carrito no existe")
    } else {
        res.send(carrito);
    }
}

export const AddProductToCartController = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await cartManager.addProductToCart(cid, pid);
        res.status(201).send(`Producto ${pid} agregado al carrito ${cid}`);
    } catch (error) {
        res.status(404).send("No se pudo agregar producto al carrito")
    }
}

export const DeleteProductFromCartController = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        await cartManager.deletProdfromCart(cid, pid);
        res.send({ status: "success", payload: "Se elimino el producto del carrito" })
    } catch (err) {
        res.send({ status: "failed", payload: "No se pudo eliminar el producto del carrito" })
    }
}

export const DeleteCartController = async (req, res) => {
    try {
        const { cid } = req.params;
        await cartManager.deleteCar(cid);
        res.send({ status: "Success", payload: "Se elimino el carrito" })
    } catch (err) {
        res.send({ status: "Failed", payload: "No se ha eliminado el carrito" })
    }

}

export const Purchase = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.checkCart(cartId);
        const ticketProducts = [];
        const rejectedProducts = [];
        if (!cart) {
            res.send("No existe el carrito, por favor genere su carrito primero")
        } else {
            if (!cart.products.length) {
                return res.send("es necesario que agrege productos antes de realizar la compra")
            } else {
                for (let i = 0; i < cart.products.length; i++) {
                    const cartProduct = cart.products[i];
                    const productDB = await manager.getProductById(cartProduct.product._id);
                    //comparar la cantidad de ese producto en el carrito con el stock del producto
                    if (cartProduct.quantity <= productDB.stock) {
                        ticketProducts.push(cartProduct);
                    } else {
                        rejectedProducts.push(cartProduct);
                    }
                }
                console.log("ticketProducts", ticketProducts)
            }
            const NewTicket = await ticketManager.newTicket(ticketProducts, req.session.email.toString())
            console.log("ticketfinal", NewTicket)
            res.send(NewTicket)
        }
    } catch (err) {
        res.send({ status: "Error", payload: "No se pudo realizar la compra" })
    }
}
