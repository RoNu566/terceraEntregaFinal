import { Router, json, urlencoded } from "express";
import { isPremium } from "../controllers/users.controller.js";
import { verifyRole } from "../middlewares/auth.roles.js";

const usersRouter = Router();
usersRouter.use(json());
usersRouter.use(urlencoded({ extended: true }));

usersRouter.put("/premium/:uid", verifyRole(["admin"]), isPremium);

export default usersRouter;