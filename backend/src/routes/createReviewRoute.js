import { Review } from "../models/review.model";
export const createReviewRoute = {
  method: "post",
  path: "/api/:anon_id/review",
  handler: async (req, res) => {
    const { rating, review, stake, productId } = req.body;
    const { anon_id } = req.params;
    console.log(req.body);
    if (!req.body) {
      res.status(400).json({ message: "Something went wrong!" });
    }

    if (!review || !rating || !productId) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const product = new Review({
      anon_id,
      rating,
      review,
      stake,
      product_id: productId,
    });
    await product.save();
    console.log(product);
    res.status(201).json({ message: "Review created successfully" });
  },
};
