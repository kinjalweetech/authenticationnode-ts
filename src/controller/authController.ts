import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/authModel';

// JWT secret from environment
const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
     res.status(400).json({ message: 'User already exists' });
     return
    }

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login an existing user
export const login = async (req: Request, res: Response):Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      res.status(400).json({ message: 'Invalid credentials' });
      return
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
