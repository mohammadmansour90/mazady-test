const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Look for token in cookies or Authorization header (Bearer token)
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized to access this page. Please login.");
  }

  try {
    // Verify token and extract user info
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    req.user = user; // Set the user info on the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized to access this page. Please login.");
  }
});



const isAdmin = (req , res , next) =>{
    if(req.user && req.user.role === "admin"){
        next();
    }
    else{
        res.status(403);
        throw new Error("Access denied , you are not an administratior ");
    }
}


const isSeller = (req , res , next) =>{
    if(req.user && req.user.role === "seller" || req.user.role === "admin"){
        next();
    }
    else{
        res.status(403);
        throw new Error("Access denied , you are not a seller ");
    }
}
module.exports = {
    protect , isAdmin , isSeller
}