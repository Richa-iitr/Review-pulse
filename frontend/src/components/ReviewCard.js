import React from "react";
import classes from "@/styles/ReviewCard.module.css";
import { PiShieldStarFill } from "react-icons/pi";
const ReviewCard = () => {
  let rating = 4.6;

  return (
    <div className={classes["review-card"]}>
      <div className={classes["star-wrapper"]}>
        <div className={classes["star-number"]}>
          {[1, 2, 3, 4, 5].map((index) => {
            let styleClass = "star-rating-blank";
            if (Math.trunc(rating) >= index) {
              styleClass = "star-rating-filled";
            }
            console.log(Math.trunc(rating));
            return <PiShieldStarFill className={styleClass} size={30} />;
          })}
        </div>
        <p>
          <i>{rating}/5.0</i>
        </p>
      </div>
      <h5>User name</h5>
      <p>
        Mucius doctus constituto pri at, ne cetero postulant pro. At vix utinam
        corpora, ea oblique moderatius usu. Vix id viris consul honestatis, an
        constituto deterruisset consectetuer pro
      </p>
    </div>
  );
};

export default ReviewCard;
