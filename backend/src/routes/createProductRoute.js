import { Product } from "../models/product.model";
export const createProductRoute = {
  method: "POST",
  path: "/api/products",
  handler: async (req, res) => {
    const { name, description, seller } = req.body;
    if (!name || !description || !seller) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const product = new Product({
      name,
      description,
      seller,
    });
    await product.save();
    res.status(201).json({ message: "Product created successfully" });
  },
};
