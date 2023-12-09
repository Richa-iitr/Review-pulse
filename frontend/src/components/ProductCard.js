import React from "react";
import classes from "@/styles/ProductCard.module.css";
import { BiMessageRounded } from "react-icons/bi";
import clothingImage from "../../public/clothing.jpeg";
import Image from "next/image";
import Link from "next/link";
const ProductCard = ({ productId }) => {
  return (
    <div className={classes["product-card"]}>
      <Image className={classes.img} src={clothingImage} alt="clothing" />
      <div className={classes["content"]}>
        <h4>Clothing</h4>
        <div>
          <BiMessageRounded />
          <p>356 Reviews</p>
        </div>
      </div>
      {/* <button className={classes["buy-button"]}>Buy Now</button> */}
      <Link href={`/${productId}/review`} className={classes["buy-button"]}>
        Review
      </Link>
    </div>
  );
};

export default ProductCard;
