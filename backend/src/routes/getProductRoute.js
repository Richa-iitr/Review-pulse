import { Product } from "../models/product.model";
export const getProductRoute = {
  method: "GET",
  path: "/api/products",
  handler: async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
  },
};
