
import userModel from "../model/authModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/authModel";
import { saltRoundConfigVar } from "../Configration/Config";

export const userRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;

  
  try {
    // Check if the user already exists
    let user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "User already exists" });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(saltRoundConfigVar); // using config variable for salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new UserModel({ username: name, email, password: hashedPassword }); // Use correct model name
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY!, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).send("Server error");
  }
};
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "Invalid credentials" });
      return;
    }

    // Check the password
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY!, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
