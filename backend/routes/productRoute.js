const express = require("express");
const { createProduct, getAllProducts, deleteProduct, updateProduct, getAllProductsOfUser, verifyAndAddCommitionByAdmin, getAllProductsByAdmin, deleteProductByAdmin, getProductsBySlug, getProduct, getAllSoldProducts } = require("../controllers/productController");
const { protect, isSeller, isAdmin } = require("../middelware/authMiddleware");
const { upload } = require("../utils/fileUpload");
const router = express.Router();


router.post("/" , protect,isSeller,upload.single("image"), createProduct);
router.get("/" , getAllProducts);
router.get("/sold" , getAllSoldProducts);
router.get("/user" , protect,getAllProductsOfUser);
router.get("/:id" , getProduct   );

router.delete("/:id" , protect,isSeller ,deleteProduct);
router.put("/:id" , protect,isSeller,upload.single("image"), updateProduct);



router.patch("/admin/product-verified/:id" , protect,isAdmin, verifyAndAddCommitionByAdmin);
router.get("/admin/products" , protect,isAdmin, getAllProductsByAdmin);
router.delete("/admin/products" , protect,isAdmin, deleteProductByAdmin);




module.exports = router;