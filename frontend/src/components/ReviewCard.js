import React from "react";
import classes from "@/styles/ReviewCard.module.css";
import { PiShieldStarFill } from "react-icons/pi";
const ReviewCard = ({ review }) => {
  let rating = 4.6;

  return (
    <div className={classes["review-card"]}>
      <div className={classes["star-wrapper"]}>
        <div className={classes["star-number"]}>
          {[1, 2, 3, 4, 5].map((index) => {
            let styleClass = "star-rating-blank";
            if (Math.trunc(review.rating) >= index) {
              styleClass = "star-rating-filled";
            }
            console.log(Math.trunc(rating));
            return (
              <PiShieldStarFill className={"star-rating-blank"} size={30} />
            );
          })}
        </div>
        {/* <p>
          <i>{review.rating}/5.0</i>
        </p> */}
      </div>
      <p className={classes.review}>{review.review}</p>
    </div>
  );
};

export default ReviewCard;
