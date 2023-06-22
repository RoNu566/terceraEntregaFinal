import dotenv from "dotenv"
dotenv.config();

export const options = {
    fileSystem: {
        productsFileSystem: 'products.json',
        cartFileSysyem: 'cart.json'
    },
    mongoDB: {
        URL: process.env.MONGO_URL,
    },
    server: {
        port: process.env.PORT,
        secretSession: process.env.SECRET_KEY,
        persistance: process.env.PERSISTANCE,
    },
    email: {
        admin: process.env.EMAIL_ADMIN,
        pass: process.env.EMAIL_PASS
    }
};

