"use client";
import React, { useState, useEffect } from "react";
import classes from "@/styles/Reviews.module.css";
import ReviewCard from "@/components/ReviewCard";
import { useParams } from "next/navigation";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const { productId } = useParams();
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${productId}/reviews/ongoing`
      );
      const data = await res.json();
      console.log(data);

      setReviews(data);
    };
    getData();
  }, []);
  console.log(reviews);
  return (
    <main className={classes["reviews-page"]}>
      {/* <h1>Reviews Page</h1> */}
      <div className={classes["review-cards-container"]}>
        {reviews.length > 0 ? (
          reviews.map((review) => <ReviewCard review={review} />)
        ) : (
          <h1>No Reviews.</h1>
        )}
      </div>
    </main>
  );
};

export default ReviewsPage;
