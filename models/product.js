import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  cost: String,
  creator: String,
  category: String,
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Product", productSchema);
