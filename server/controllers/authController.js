import User from "../models/userModel.js";
const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400).json({ message: `user already exist` });
    return;
  }
  
  // Validate username, email, and password
  if (!username || !email || !password) {
    return res.status(400).send("Invalid input");
  }
  try {
    const newUser = new User({ username, email, password });
    // Save the user to the database
    await newUser.save();
    // Send a response back to the client
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).json({error: `error encountered,${error}`})
  }
  
};
export { signUp }; 
