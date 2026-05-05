const express = require("express");
const {protect, isSeller} = require("../middelware/authMiddleware");
const { getBiddingHistory, placeBid, sellProduct } = require("../controllers/biddingController");
const router = express.Router();

router.get("/:productId" , getBiddingHistory);
router.post("/" ,protect , placeBid);
router.post("/sell" ,protect ,isSeller, sellProduct);



module.exports = router;