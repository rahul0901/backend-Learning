import { Router } from "express";
import { Login } from "../Controllers/auth.Controller.js";

const authroutes = Router();

authroutes.use('/login', Login)

export default authroutes;