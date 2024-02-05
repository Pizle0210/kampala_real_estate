import asyncHandler from "../middleware/asyncHandler.js";
import { errorHandler } from "../middleware/errorHandler.js";
import User from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

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

const google = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      // generate token
      generateToken(res, user._id);
      const { password: pass, ...rest } = user._doc;
      // Return user data
      res.status(200).json({
        ...rest,
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashGooglePassword = await bcrypt.hash(generatedPassword, 15); // Increased salt round to 15
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-3),
        email: req.body.email.toLowerCase(),
        password: hashGooglePassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const { password: pass, ...rest } = newUser._doc;
      generateToken(res, newUser._id);
      res.status(200).json({
        ...rest,
      });
    }
  } catch (error) {
    next(
      errorHandler(
        500,
        "An error occurred while processing the request.",
        error
      )
    );
  }
});

export { register, authenticateUser, google };
