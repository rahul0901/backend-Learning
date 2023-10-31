import { Router } from "express";
import authroutes from './auth.Route.js'

const router = Router();

router.use('/auth', authroutes)

export default router;