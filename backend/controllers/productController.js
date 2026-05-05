const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../models/ProductModel");
const cloudinary = require("cloudinary").v2;

const multer = require("multer");



const createProduct = asyncHandler(async(req , res)=>{

    const {title, description ,category , price, height ,lengthPic  , width , mediumUsed ,weight } = req.body;

    const userId = req.user.id;
    const originalSlug = slugify(title,{
        lower:true,
        remove:/[*+~.()'"!:@]/g,
        strict:true,
    });

    let slug = originalSlug;
    let suffix = 1;


    while(await Product.findOne({slug})) {
        slug = `${originalSlug}-${suffix}`;
        suffix++;
    }

    if(!title || !description || !price){

        res.status(400);
        throw new Error("please fill out all the fields");
    };

   let fileData = {};

if (req.file) {
  try {
    // ✅ Show file info
    console.log("FILE RECEIVED:", req.file);

    // ✅ Normalize Windows backslashes to slashes
    const normalizedPath = req.file.path.replace(/\\/g, "/");
    console.log("Uploading from path:", normalizedPath);

    const uploadedFile = await cloudinary.uploader.upload(normalizedPath, {
      folder: "Bidding/Product",
      resource_type: "image",
    });

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      public_id: uploadedFile.public_id,
    };

  } catch (error) {
    console.error("Cloudinary error:", error);
    res.status(500);
    throw new Error("Image could not be uploaded");
  }
} else {
  res.status(400);
  throw new Error("No image file received");
}

   

 
    const product = await Product.create({
        user:userId,
        title,
        slug:slug,
        description ,
        category , 
        price, 
        height ,
        lengthPic  , 
        width , 
        mediumUsed ,
        weight,
        image:fileData,

    });

    res.status(201).json({
        success:true,
        data:product,
    });

});



const getAllProducts = asyncHandler(async (req, res) => {
 
 const userid = req.user._id;

const product = await Product.find({user:userid}).populate("user");
res.json({product});
});


const deleteProduct = asyncHandler(async(req , res)=>{

const {id} = req.params;
const product = await Product.findByIdAndDelete(id);

if(!product){
  res.status(404);
  throw new Error("Product not found");
}

if(product.user?.toString() !== req.user.id){
  res.status(401);
  throw new Error("User not authorized ");
}

if(product.image && product.image.public_id){
  try {
    await  cloudinary.uploader.destroy(product.image.public_id);
    
  } catch (error) {
    res.status(500);
    throw new Error("unable to delete product ");
  }
}
await Product.findByIdAndDelete(id);
res.status(200).json({message:"product deleted successfully"});

});


const updateProduct = asyncHandler(async(req , res)=>{

    const {title, description ,category , price, height ,lengthPic  , width , mediumUsed ,weight } = req.body;

    const {id} = req.params;

    const product = await Product.findByIdAndDelete(id);

if(!product){
  res.status(404);
  throw new Error("Product not found");
}

if(product.user?.toString() !== req.user.id){
  res.status(401);
  throw new Error("User not authorized ");
}


let fileData = {};

if (req.file) {
  try {
    // ✅ Show file info
    console.log("FILE RECEIVED:", req.file);

    // ✅ Normalize Windows backslashes to slashes
    const normalizedPath = req.file.path.replace(/\\/g, "/");
    console.log("Uploading from path:", normalizedPath);

    const uploadedFile = await cloudinary.uploader.upload(normalizedPath, {
      folder: "Bidding/Product",
      resource_type: "image",
    });

    if(product.image && product.image.public_id){
  try {
    await  cloudinary.uploader.destroy(product.image.public_id);
    
  } catch (error) {
    res.status(500);
    throw new Error("unable to update product ");
  }
}


    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      public_id: uploadedFile.public_id,
    };

  } catch (error) {
    console.error("Cloudinary error:", error);
    res.status(500);
    throw new Error("Image could not be uploaded");
  }
} else {
  res.status(400);
  throw new Error("No image file received");
}


    const updateproduct = await Product.findByIdAndUpdate(
      {
        _id:id,
      },
       { 
        title,
        description ,
        category , 
        price, 
        height ,
        lengthPic  , 
        width , 
        mediumUsed ,
        weight,
        image:Object.keys(fileData).length === 0? Product?.image : fileData,

  },
{
  new:true,
  runValidators:true,
}  );

    res.status(201).json(updateproduct);

});


const getAllProductsOfUser = asyncHandler(async(req , res)=>{
const userId = req.user._id;

const product = await Product.find({user:userId}).populate("user");
res.json({product});
});


const verifyAndAddCommitionByAdmin = asyncHandler(async(req , res)=>{

  const com = req.body;
  const {id} = req.params;

  const product = await Product.findById(id);

  if(!product){
    res.status(400);
    throw new Error("product not found");
  }

  product.isVerify = true;
  product.commition=com;

  await product.save();

  res.status(200).json({message: "product verified successfully" , data:"product"});
});



const getAllProductsByAdmin = asyncHandler(async(req , res)=>{
const userId = req.user._id;

const product = await Product.find({user:userId}).populate("user");
res.json({product});

});

const deleteProductByAdmin = asyncHandler(async(req , res)=>{
const {ProductId} = req.params;
const product = await Product.findByIdAndDelete(id);

if(!product){
  res.status(404);
  throw new Error("Product not found");
}


if(product.image && product.image.public_id){
  try {
    await  cloudinary.uploader.destroy(product.image.public_id);
    
  } catch (error) {
    res.status(500);
    throw new Error("unable to delete product ");
  }
}
await Product.findByIdAndDelete(ProductId);
res.status(200).json({message:"product deleted successfully"});
});

const getProduct = asyncHandler(async(req , res)=>{
  const {id} = req.params;
  const product = await Product.findById(id).populate("user");

  if(!product){
    res.status(400);
    throw new Error("product not found");
  }

  res.status(200).json(product);
});

const getAllSoldProducts = asyncHandler(async(req , res)=>{
const userId = req.user._id;

const product = await Product.find({isSoldOut:true}).populate("user");
res.json({product});
});

const test = asyncHandler(async(req , res)=>{

});

module.exports = {
    createProduct, getAllProducts, deleteProduct , updateProduct , getAllProductsOfUser , verifyAndAddCommitionByAdmin , getAllProductsByAdmin , deleteProductByAdmin , getProduct , getAllSoldProducts
}