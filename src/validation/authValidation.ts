// import { check, validationResult } from "express-validator";
// import { Request, Response, NextFunction } from "express";
// import { body } from 'express-validator';

// // Validation middleware for registering
// export const validateRegister = [
//   check("username", "Username is required").not().isEmpty(),
//   check("email", "Please include a valid email").isEmail(),
//   check("password", "Password must be 6 or more characters").isLength({
//     min: 6,
//   }),
//   (req: Request, res: Response, next: NextFunction):Promise<void> => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).json({ errors: errors.array() });
//       return
//     }
//     next();
//   },
// ];

// // Validation middleware for login
// export const validateLogin = [
//   check("email", "Please include a valid email").isEmail(),
//   check("password", "Password is required").exists(),
//   (req: Request, res: Response, next: NextFunction):Promise<void> => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//      res.status(400).json({ errors: errors.array() });
//      return
//     }
//     next();
//   },
// ];


// // export const validateLogin = [
// //   body('email').isEmail().withMessage('Please include a valid email'),
// //   body('password')
// //     .isLength({ min: 6 })
// //     .withMessage('Password must be 6 or more characters'),
// // ];
