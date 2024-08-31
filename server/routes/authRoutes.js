import express from "express";
import { register, login, loginSuccess } from "../controller/auth/auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/login/success", loginSuccess);

export default authRouter;
