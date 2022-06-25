import CategoryModal from "../models/category.js";
import ProductModal from "../models/product.js";
import mongoose from "mongoose";

//Create a category
export const createCategory = async (req, res) => {
  const category = req.body;
  const newCategory = CategoryModal({
    ...category,
    createdAt: new Date().toISOString(),
  });

  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong!" });
  }
};

//Read all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModal.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong!" });
  }
};

//Read single category
export const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoryModal.findById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong!" });
  }
};

//Read all the products order by category
export const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await ProductModal.find({ categoryId: categoryId });
    res.json(products);
  } catch (error) {
    res.status(404).json({ messgae: "Something went wrong!" });
  }
};

//Delete a category
export const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Category doesn't exist" });
    }
    const category = await CategoryModal.findById(id);
    const products = category.products.map((item) => item.id);
    await ProductModal.deleteMany({ _id: { $in: [...products] } });
    await CategoryModal.findByIdAndRemove(id);
    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    res.status(404).json({ messgae: "Something went wrong!" });
  }
};

//Update a category
export const editCategoryById = async (req, res) => {
  const { id } = req.params;
  const { name, creator, image, products } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Category doesn't exist" });
    }
    const updatedCategory = {
      name,
      creator,
      image,
      products,
      _id: id,
    };
    await CategoryModal.findByIdAndUpdate(id, updatedCategory, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(404).json({ messgae: "Something went wrong!" });
  }
};
