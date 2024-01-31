import asyncHandler from "../middleware/asyncHandler.js";
import { errorHandler } from "../middleware/errorHandler.js";
import User from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";

const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errorHandler(400, "Invalid input"));
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(errorHandler(409, "User already exists"));
    }
    const user = await User.create({ username, email, password });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      next(errorHandler(400, "Unable to create user"));
    }
  } catch (error) {
    next(errorHandler(500, "error from function"));
  }
});

const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Invalid request body");
  }
  //? find user in db
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // generate token
    generateToken(res, user._id);
    // Return user data
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });

    // ?Send response
    res.status(200).json({ message: "User authenticated successfully" });
  } else {
    throw new Error("Invalid email or password");
  }
});

export { register, authenticateUser };
