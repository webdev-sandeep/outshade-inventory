import express from "express";
import auth from "../middlewares/auth.js";
const router = express.Router();

import {
  getProduct,
  getProducts,
  createProduct,
  editProductById,
  deleteProductById,
} from "../controllers/product.js";

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProduct);
router.delete("/:id", deleteProductById);
router.patch("/:id", editProductById);

export default router;
