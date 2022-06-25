import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/category.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.get("/", (req, res) => {
  res.send(`<h1>Hello from the server</h1>`);
});

mongoose
  .connect(
    "mongodb+srv://sandeep:iY6nfPTmrAz2wkok@cluster0.3knkafa.mongodb.net/inventory?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(process.env.PORT || 5000, "0.0.0.0", () =>
      console.log(
        `Listening to the server at : http://localhost:${
          process.env.PORT || 5000
        }`
      )
    );
  })
  .catch((error) => console.log(error));
