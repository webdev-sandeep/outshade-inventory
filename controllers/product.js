import ProductModal from "../models/product.js";
import mongoose from "mongoose";

//Create a product
export const createProduct = async (req, res) => {
  const product = req.body;
  const newProduct = new ProductModal({
    ...product,
    createdAt: new Date().toISOString(),
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong!" });
  }
};

//Read all products
export const getProducts = async (req, res) => {
  try {
    const products = await ProductModal.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong!" });
  }
};

//Read single product
export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModal.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong!" });
  }
};

//Delete a product
export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Product doesn't exist" });
    }
    await ProductModal.findByIdAndRemove(id);
    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(404).json({ messgae: "Something went wrong!" });
  }
};

//Update a product
export const editProductById = async (req, res) => {
  const { id } = req.params;
  const { name, description, cost, creator, categoryId, image } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Product doesn't exist" });
    }
    const updatedProduct = {
      name,
      description,
      cost,
      creator,
      categoryId,
      image,
      _id: id,
    };
    await ProductModal.findByIdAndUpdate(id, updatedProduct, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ messgae: "Something went wrong!" });
  }
};
