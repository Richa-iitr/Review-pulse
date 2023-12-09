"use client";
import React, { useState } from "react";
import classes from "@/styles/Review.module.css";
import StarRating from "@/components/StarRating";

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const handleSubmitReviewForm = (e) => {
    e.preventDefault();
    console.log(rating, review);
  };
  return (
    <div className={classes["review-page"]}>
      <div className={classes["review-section"]}>
        <h2>Write a review of Product</h2>
        <form onSubmit={handleSubmitReviewForm}>
          <div className={classes["input-field-container"]}>
            <label>Overall rating</label>
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <div className={classes["input-field-container"]}>
            <label>Your Review</label>
            <textarea
              rows={8}
              placeholder="Write your reviews to help others"
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
              }}
            />
          </div>
          <button type="submit" className={classes["submit-btn"]}>
            Submit review
          </button>
        </form>
      </div>
      <div className={classes["product-section"]}>
        <h2>About Product</h2>
        <div className={classes["product-details-container"]}>
          <h1>Product Name</h1>
          <p>This is product description section</p>
          <p>
            <strong>Price</strong> <br /> Rs. 4000
          </p>
          <p>
            <strong>Seller</strong> <br /> Seller
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
