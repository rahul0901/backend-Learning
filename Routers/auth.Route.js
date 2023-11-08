import { Router } from "express";
import { Login, Register } from "../Controllers/auth.Controller.js";

const authroutes = Router();

authroutes.post('/login', Login);
authroutes.post('/register', Register);

export default authroutes;