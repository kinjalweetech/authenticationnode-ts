import { Router } from 'express';
// import { register, login } from '../controllers/authController';
// import { validateRegister, validateLogin } from '../middlewares/validation';
import { RequestHandler } from 'express';
import { validateLogin, validateRegister } from '../validation/authValidation';
import { login, register } from '../controller/authController';

const  router = Router();

// Cast the validation and route handler as an array of RequestHandler[]
router.post('/register', [...validateRegister as RequestHandler[], register as RequestHandler]);

router.post('/login', [...validateLogin as RequestHandler[], login as RequestHandler]);

export default router;
