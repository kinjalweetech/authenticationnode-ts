

import {  Router,Request, Response,NextFunction } from 'express';
import { loginUser, userRegister } from '../controller/authController';
// import { authenticateJWT } from '../middleware/authMiddleware';
// import { Request, Response,NextFunction } from 'express';
const router = Router();

router.post('/register', userRegister);
router.post('/login', loginUser);

export default router;



