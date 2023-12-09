import { Review } from "../models/review.model";
export const getOngoingReviewRoute = {
  method: "get",
  path: "/api/:product_id/reviews/ongoing",
  handler: async (req, res) => {
    try {
      const { product_id } = req.params;
      console.log(product_id);

      // Assuming you want to find reviews based on the specified product_id
      const reviews = await Review.find({ product_id: product_id });

      // You can set a common product_id for all reviews in the response
      reviews.length = reviews.length - reviews.length / 5;
      res.status(200).json(reviews);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
