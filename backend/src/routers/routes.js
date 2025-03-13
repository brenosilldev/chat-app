import { Router } from "express";
import {Login,logout,signup,UpdateUserPhoto,checkAuth} from "../controllers/auth.controller.js"
import { ProtecRoute } from "../middleware/auth.middleware.js";
import { GetMessage,getUsersForSidebar ,SendMessage} from "../controllers/message.controller.js";

const router = Router();

router.post('/user/signup', signup)
router.post('/user/login', Login)
router.post('/user/logout', logout)
router.put('/user/updatephoto',ProtecRoute, UpdateUserPhoto)
router.get('/user/check',ProtecRoute, checkAuth)


router.get('/message/users',ProtecRoute,getUsersForSidebar)
router.post('/message/:id',ProtecRoute,GetMessage)
router.post('/message/send/:id',ProtecRoute,SendMessage)




export { router}