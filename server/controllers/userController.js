import asyncHandler from "../middleware/asyncHandler.js ";

const getUsers = asyncHandler(async (req, res) => {
  res.status(200).send(`<h1>Welcome back home</h1>`);
});

export { getUsers };
