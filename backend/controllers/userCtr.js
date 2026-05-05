const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const generateToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn:"1d"});
};

const registerUser = asyncHandler(async(req ,res) => {
    const {name , email , password} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please fill in all the required fields")
    }

      if (!email.endsWith("@aau.edu.jo")) {
    return res.status(400).json({ message: "Only Amman Arab University emails are allowed" });
  }
    
    const userExits = await User.findOne({email});
    if(userExits){
        res.status(400);
        throw new Error("Email is already in use ")
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
    });

    if(user){
        const {_id , name , email , photo , role} = user;
        res.status(201).json({ _id, name , email , photo , role, token }); // ✅ include token
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});


const loginUser = asyncHandler(async(req ,res) => {
    const {email , password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please add email and password");
    }

    const user = await User.findOne({email});
    if(!user){
        res.status(404);
        throw new Error("User not found , please Sign Up ");
    }

    const passwordIsCorrect = await bcrypt.compare(password,user.password);

    if(!passwordIsCorrect){
        res.status(400);
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id);
    res.cookie("token", token , {
        path:"/",
        httpOnly:true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure:true,
    });

    const {_id , name , email: userEmail , photo , role} = user;
    res.status(200).json({ _id , name , email: userEmail , photo , role, token }); // ✅ include token
});

const loginStatus = asyncHandler(async(req ,res) => {

    const token = req.cookies.token;
    if(!token){
        return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(verified){
        return res.json(true);
    }
    return res.json(false);
    });


    const logoutuser = asyncHandler(async (req, res)=>{
        res.cookie("token" , "" , {
            path: "/",
            httpOnly:true,
            expires:new Date(0),
            sameSite:"none",
            secure:true,
        });
        return res.status(200).json({message:"Successfully logged out"});
    });

   const loginAsSeller = asyncHandler(async(req ,res) => {
const {email , password} = req.body;
if(!email || !password){
    res.status(400);
    throw new Error("Please add email and password");
}

const user = await User.findOne({email});
if(!user){
    res.status(404);
    throw new Error("User not found , please Sign Up ");
}


const passwordIsCorrect = await bcrypt.compare(password,user.password);
if(!passwordIsCorrect){
    res.status(404);
    throw new Error("Invalid password ");
}

user.role="seller";
await user.save();

const token = generateToken(user._id);
res.cookie("token", token , {
    path:"/",
    httpOnly:true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure:true,
});

if(user && passwordIsCorrect){
    const {_id , name , email , photo , role} = user;
   res.status(201).json({_id , name , email , photo , role});

}else {
    res.status(400);
    throw new Error("Invalid user data"); 
}


});

const getUser = asyncHandler(async(req , res)=>{
const user = await User.findById(req.user._id).select("-password");
res.status(200).json(user);
});

const getUserBalance = asyncHandler(async(req , res)=>{

const user = await User.findById(req.user._id);

if(!user){
    res.status(404);
    throw new Error("user not found");
}

res.status(200).json({
    balance:user.balance,
});

});

const getAllUser = asyncHandler(async(req , res)=>{
 const userList = await User.find({});


 if(!userList.length){
    return res.status(400).json({message:"No user found!"});
 }
 res.status(200).json(userList);
});


const estimateIncome = asyncHandler(async(req , res)=>{
       try {
        const admin = await User.findOne({role: "admin"});
        if(!admin){
        return res.status(404).json({message:"No user found !"});
        }
        const commitionBalance = admin.commitionBalance;
        res.status(200).json({commitionBalance});
        
       } catch (error) {
        
        res.status(500).json({error :"internal server error" });
       }
    });
module.exports ={
    registerUser, loginUser , loginStatus , logoutuser , loginAsSeller , getUser , getUserBalance , getAllUser , estimateIncome
}   