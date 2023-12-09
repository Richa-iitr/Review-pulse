import { Product } from "../models/product.model";
import { ObjectId } from "mongoose";
export const getProductRoute = {
  method: "get",
  path: "/api/:product_id/product",
  handler: async (req, res) => {
    try {
      const { product_id } = req.params;
      console.log(product_id);
      const product = await Product.findById(product_id);
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
    }
  },
};
