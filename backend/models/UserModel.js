const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true , "Please Add Name "],   // ✅ fixed
    },
    email : {
        type: String , 
        required: [true , "Please Add Email"],  // ✅ fixed
    },
    password:{
        type : String , 
        required:[true , "Please Provide Password "], // ✅ fixed
    },
    photo:{
        type:String ,
        default : "https://cdn-icons-png.flaticon.com/128/236/236832.png",   // ✅ remove "required" since you already provide a default
    },
    role:{
        type:String , 
        enum:["admin", "seller" , "buyer"],
        default: "buyer",
    },
    commitionBalance : {
        type:Number,
        default:0,
    },
    balance:{
        type:Number,
        default:0,
    },

},
{ timestamps: true }   // ✅ typo fixed: should be plural "timestamps"
);


userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")){
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(this.password , salt);
    this.password=hashedPassword;
    next();
})

const User =mongoose.model("User" , userSchema);
module.exports = User;