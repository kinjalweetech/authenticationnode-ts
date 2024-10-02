import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT = process.env.JWT_KEY ;

export const authMiddleware = (req: Request, res: Response, next: NextFunction):Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
     res.status(401).json({ message: 'No token, authorization denied' });
     return
  }

  try {
    const decoded = jwt.verify(token, JWT) as { userId: string };
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
