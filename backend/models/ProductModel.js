const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref :"User",
    },
    title:{
        type:String,
        require: [true,"Please add a title"],
        trim:true,
    },

    slug:{
        type:String,
        unique:true,
    },

    description :{
        type:String,
        require: [true,"Please add a description"],
        trim:true,

    },
    image:{
        type:Object,
        default:{},
    },
    category:{
        type:String,
         require: [true,"Please add a category"],
         default:"ALL",

    },
    commition:{
        type:Number,
        default:0,
    },
    price:{
        type:Number,
        require: [true,"Please add a price"],
    },
    height:{type:Number},
    lengthPic:{type:Number},
    width:{type:Number},
    mediumUsed:{type:String},
    weight:{type:Number},
    isVerify:{type:Boolean , default:false},
    isSoldOut:{type:Boolean,default:false},
    soldTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    CreatedAt: {
  type: Date,
  default: Date.now,
},
});

const Product = mongoose.model("Product" , productSchema);
module.exports = Product;