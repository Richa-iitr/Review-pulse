import { Review } from "../models/review.model";
import { ObjectId } from "mongoose";

export const getReviewRoute = {
  method: "get",
  path: "/api/:product_id/reviews",
  handler: async (req, res) => {
    try {
      const { product_id } = req.params;
      console.log(product_id);

      // Assuming you want to find reviews based on the specified product_id
      const reviews = await Review.find({ product_id: product_id });

      // You can set a common product_id for all reviews in the response
      const responseReviews = reviews.map((review) => ({
        ...review.toObject(),
        product_id: "c7992494-7898-49ba-a20c-c5a5f5931802", // Replace with your desired product_id
      }));

      res.status(200).json(responseReviews);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
