import { Router } from "express";
import {Login,logout,signup} from "../controllers/auth.controller.js"

const router = Router();


router.post('/user/login', Login)
router.post('/user/signup', signup)





export { router}