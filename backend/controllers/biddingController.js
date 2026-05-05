const asyncHandler = require("express-async-handler");
const biddingProduct = require("../models/biddingModel");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const sendMail = require("../utils/sendMail");



const getBiddingHistory = asyncHandler(async (req , res) =>{
   const {productId} = req.params;
   const biddingHistory = await biddingProduct.find({product:productId}).sort("-createdAt").populate("user").populate("product");
   res.status(200).json(biddingHistory);
});

const placeBid = asyncHandler(async (req , res) =>{
    const {productId , price} = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if(!product.isVerify){
        res.status(400);
        throw new Error("bidding is not verified for these products");
    };

    if(!product || product.isSoldOut === true){
        res.status(400);
        throw new Error("invalid product or bidding is closed ");
    };

    const existinguserBid = await biddingProduct.findOne({user:userId , product:productId});

    if(existinguserBid){
        if(price <= existinguserBid.price){
            res.status(400);
            throw new Error("your bid must be higher than your previous bid");
        }
        existinguserBid.price=price;
        await existinguserBid.save();
        res.status(200).json({biddingProduct:existinguserBid});

    }
    else{
        const highestBid = await biddingProduct.findOne({product:productId}).sort({price: -1});
        if(highestBid && price <= highestBid.price){
            res.status(400);
            throw new Error("your bid must be higher than the current highest bid ");
        }
    }

    const BiddingProduct = await biddingProduct.create({
        user:userId,
        product:productId,
        price,
    });
    res.status(200).json({BiddingProduct});
});


const sellProduct = asyncHandler(async (req , res) =>{
    const {productId} =req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if(!product){
        res.status(400);
        throw new Error("product not found");
    }


    if(product.user.toString() !== userId){
        return res.status(403).json({error:"you are not authorized to sell this product"});
    }


    const highestBid = await biddingProduct.findOne({product:productId }).sort({price:-1}).populate("user");

    if(!highestBid){
       return res.status(400).json({error:"No winning bid found for this product"});
     
    }



    const commitionRate = product.commition;
    const commitionAmmount = (commitionRate/100) * highestBid.price;
    const finalPrice = highestBid.price - commitionAmmount;


    product.isSoldOut = true;
    product.soldTo = highestBid.user;
    product.soldPrice = finalPrice;



    const admin = await User.findOne({role:"admin"});
    if(admin){
        admin.commitionBalance += commitionAmmount;
        await admin.save();
    }


    const seller = await User.findById(product.user);
    if(seller){
        seller.balance += finalPrice;
        await seller.save();
    }
    else{
        return res.status(400).json({error:"Seller not found"});
    }

    await product.save();

await sendMail({
    email:highestBid.user.email,
    subject:"congratulations you won the auction",
    text: `you have won the auction for "${product.title}" with a bid of $${highestBid.price} "please pay using iban transfer at (JO22 ARAB 1500 0000 0011 1526 4256)"`,
})

});




module.exports = {getBiddingHistory , placeBid , sellProduct};