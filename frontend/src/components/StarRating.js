"use client";
import Star from "./Star";
import { useState } from "react";
const StarRating = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const onMouseEnter = (index) => setHoverRating(index);
  const onMouseLeave = () => setHoverRating(0);
  const onSaveRating = (index) => setRating(index);

  return (
    <div className={"stars-list"}>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <Star
            key={index}
            starId={index}
            rating={hoverRating || rating}
            onMouseEnter={() => onMouseEnter(index)}
            onMouseLeave={() => onMouseLeave()}
            onClick={() => onSaveRating(index)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
