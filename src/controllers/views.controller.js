import { manager } from "../controllers/products.controller.js"
import ChatManager from "../dao/db-managers/chat.manager.js";
import productModel from "../dao/models/products.models.js";
import { Logger2 } from "../Logger/logger.js";

const chatManager = new ChatManager;
const logger = Logger2()

export const HomeViewController = async (req, res) => {
    const products = await manager.getProducts()
    res.render("home", { products })
}

export const RealTimeProdController = async (req, res) => {
    const products = await manager.getProducts()
    res.render("real-time-products", { products })
}

export const ProductViewController = async (req, res) => {
    const data = req.session
    const { page } = req.query;
    const products = await productModel.paginate({}, { limit: 4, lean: true, page: page ?? 1 })
    res.render("products", { products, data })
}

export const ChatController = async (req, res) => {
    try {
        const messages = await chatManager.getMessages();
        res.render("chat", { messages: messages })
    } catch (Err) {
        logger.fatal("No se pudieron obtener los mensajes!")
        // console.log("No se pudieron obtener los mensajes!")
    }
}

export const LoginViewController = async (req, res) => {
    console.log(req.session)
    const data = req.session;
    res.render("login", { data, section: "login" })
}

export const ProfileViewController = async (req, res) => {
    const data = req.session;
    res.render("profile", { data })
}

export const SignInViewController = async (req, res) => {
    res.render("signIn")
}

export const ForgotViewController = async (req, res) => {
    res.render("forgot")
}

export const loggerViewController = async (req, res) => {
    logger.fatal("prueba fatal")
    logger.error("prueba error")
    logger.warning("prueba warning")
    logger.info("prueba info")
    logger.http("prueba http")
    logger.debug("prueba debug")
    res.send("Fin de la prueba")
}