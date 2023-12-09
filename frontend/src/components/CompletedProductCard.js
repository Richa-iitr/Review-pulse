import React from "react";
import classes from "@/styles/ProductCard.module.css";
import { BiMessageRounded } from "react-icons/bi";
import clothingImage from "../../public/clothing.jpeg";
import Image from "next/image";
import { TiTick } from "react-icons/ti";

const CompletedProductCard = ({ productId, name, reviews, recommended }) => {
  return (
    <div className={classes["product-card"]}>
      <Image className={classes.img} src={clothingImage} alt="clothing" />
      <div className={classes["content"]}>
        <div
          className={recommended ? classes.recommended : classes.unrecommended}
        >
          <p>{recommended ? "recommended" : "unrecommended"}</p>
        </div>
        <div className={classes.bottom}>
          <div className={classes.left}>
            <h4>{name}</h4>
            <p className={classes.completed}>
              <TiTick />
              Completed
            </p>
          </div>

          <div>
            <BiMessageRounded />
            <p>{reviews} Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedProductCard;
