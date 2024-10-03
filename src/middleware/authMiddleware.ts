
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// export interface AuthRequest extends Request {
//   userId?: string;
// }

// export const authenticateJWT = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.header("Authorization")?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     req.userId = (decoded as { userId: string }).userId;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from cookies
  const token = req.cookies['authToken'];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
