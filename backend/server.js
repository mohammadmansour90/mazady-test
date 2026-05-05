const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const biddingRoute = require("./routes/biddingRoute");
const categoryRoute = require("./routes/categoryRoute")

const errorHandler = require("./middelware/errorMiddleWare");
require('dotenv').config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());

app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5173"],
        credentials: true,
    })
);


const PORT = process.env.PORT || 5000 ; 

app.use("/api/users", userRoute);
app.use("/api/product", productRoute);
app.use("/api/bidding", biddingRoute);
app.use("/api/category", categoryRoute);




app.use(errorHandler);
app.use("/uploads" , express.static(path.join(__dirname , "uploads")));

app.get("/" , (req, res) => {
    res.send("Home Pages");
});


mongoose.connect(process.env.DATABASE_CLOUD)
.then (() => {
    app.listen(PORT , () => {
        console.log(`Serever running on port ${PORT}`);
    });
})
 .catch((eer)=>{
    console.log(eer);
});

