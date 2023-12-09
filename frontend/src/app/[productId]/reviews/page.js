import React from "react";
import classes from "@/styles/Reviews.module.css";
import ReviewCard from "@/components/ReviewCard";

const ReviewsPage = () => {
  return (
    <main className={classes["reviews-page"]}>
      {/* <h1>Reviews Page</h1> */}
      <div className={classes["review-cards-container"]}>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </main>
  );
};

export default ReviewsPage;
