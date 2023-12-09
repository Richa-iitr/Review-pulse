import { Product } from "../models/product.model";
export const createProductRoute = {
  method: "post",
  path: "/api/products",
  handler: async (req, res) => {
    const { name, description, seller, tokens } = req.body;
    console.log(req.body);
    if (!req.body) {
      res.status(400).json({ message: "Something went wrong!" });
    }
    const file = req.image;

    if (!name || !description || !seller || !tokens) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const product = new Product(req.body);
    await product.save();
    console.log(product);
    res.status(201).json({ message: "Product created successfully" });
  },
};
