import express from "express";
const router = express.Router();

import {
  getCategory,
  getCategories,
  createCategory,
  editCategoryById,
  deleteCategoryById,
  getProductsByCategory,
} from "../controllers/category.js";

router.get("/", getCategories);
router.post("/", createCategory);
router.get("/:id", getCategory);
router.delete("/:id", deleteCategoryById);
router.patch("/:id", editCategoryById);
router.get("/:categoryId/products", getProductsByCategory);

export default router;
