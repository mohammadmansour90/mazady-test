const express = require("express");
const router = express.Router();
const { createCategory, getAllCategory, getCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");
const { protect, isAdmin } = require("../middelware/authMiddleware");



router.post("/" ,protect , isAdmin ,createCategory);
router.get("/" ,getAllCategory);
router.get("/:id" ,protect , isAdmin,getCategory);
router.put("/:id" ,protect , isAdmin,updateCategory);
router.delete("/:id" ,protect , isAdmin,deleteCategory);







module.exports = router;