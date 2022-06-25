import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  creator: String,
  products: [
    {
      name: String,
      id: String,
    },
  ],
  image: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Category", categorySchema);
