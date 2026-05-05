const express = require("express");
const router = express.Router();
const {registerUser, loginUser, loginStatus, logoutuser, loginAsSeller, getUser, getUserBalance, getAllUser, estimateIncome} =require("../controllers/userCtr");
const { protect, isAdmin } = require("../middelware/authMiddleware");

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.get("/loggedin" , loginStatus);
router.get("/logout" , logoutuser);
router.post("/seller" , loginAsSeller);
router.get("/getuser" ,protect,  getUser);
router.get("/sell-ammount" ,protect, getUserBalance);
router.get("/estimate-income" ,protect,isAdmin, estimateIncome);


router.get("/users" ,protect,isAdmin, getAllUser);






module.exports = router;