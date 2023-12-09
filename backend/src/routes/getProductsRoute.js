// import { Product } from "../models/product.model";
// export const getProductsRoute = {
//   method: "get",
//   path: "/api/products",
//   handler: async (req, res) => {
//     const products = await Product.find();
//     res.status(200).json(products);
//   },
// };

import { Product } from "../models/product.model";
import { Review } from "../models/review.model";

export const getProductsRoute = {
  method: "get",
  path: "/api/products",
  handler: async (req, res) => {
    try {
      const products = await Product.aggregate([
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "product_id",
            as: "reviewsArr",
          },
        },
        {
          $addFields: {
            averageRating: {
              $avg: "$reviewsArr.rating",
            },
          },
        },
        {
          $project: {
            reviewsArr: 0,
          },
        },
      ]);

      res.status(200).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
