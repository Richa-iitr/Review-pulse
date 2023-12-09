"use client";
import React, { useState, useEffect } from "react";
import classes from "@/styles/Review.module.css";
import StarRating from "@/components/StarRating";
import { useParams } from "next/navigation";
import { useAnonAadhaar } from "anon-aadhaar-react";
import useUniversalContract from "@/hooks/useUniversalContract";

const ReviewPage = () => {
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState({});
  const [userReview, setUserReview] = useState("");
  const [stakeAmount, setStakeAmount] = useState(0);
  const [anonAadhaar] = useAnonAadhaar();
  const { productId } = useParams();
  const { review } = useUniversalContract();
  const handleSubmitReviewForm = async (e) => {
    e.preventDefault();
    if (!productId || !stakeAmount) return;
    try {
      console.log(stakeAmount, productId);
      const response = await review(stakeAmount, "10");
      console.log(response);
      const backendResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${anonAadhaar.pcd.proof.nullifier}/review`,
        {
          method: "POST",
          body: JSON.stringify({
            productId,
            rating,
            review: userReview,
            stakeAmount,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await backendResponse.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(product);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${productId}/product`
      );
      const data = await res.json();
      console.log(data);
      setProduct(data);
    };
    getData();
  }, []);
  if (product._id === undefined) return <div className="spin"></div>;
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
            <label>Stake Amount</label>
            <input
              type="number"
              placeholder="Amount to stake"
              value={stakeAmount}
              onChange={(e) => {
                setStakeAmount(e.target.value);
              }}
            />
          </div>
          <div className={classes["input-field-container"]}>
            <label>Your Review</label>
            <textarea
              rows={8}
              placeholder="Write your reviews to help others"
              value={userReview}
              onChange={(e) => {
                setUserReview(e.target.value);
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
          <h1>{product.name}</h1>
          <p>This is product description section</p>
          <p>
            <strong>Price</strong> <br /> Rs. 4000
          </p>
          <p>
            <strong>Seller</strong> <br /> {product.seller}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
