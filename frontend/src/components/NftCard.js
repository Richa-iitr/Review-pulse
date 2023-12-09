import classes from "@/styles/Products.module.css";
import Image from "next/image";

const NftCard = ({ product }) => {
  return (
    <div className={classes["discover-card"]}>
      <div className={classes.nft}>
        <Image
          src={"/clothing.jpeg"}
          className={classes["nft-image"]}
          width={500}
          height={500}
          alt=""
          style={{ width: "100%", height: "auto", objectFit: "fill" }}
        />
        {/* <button className={classes["buy-button"]}>Buy Now</button> */}
      </div>
      <div className={classes.details}>
        <div className={classes.owner}>
          <Image
            src={"/clothing.jpeg"}
            alt=""
            width={50}
            height={50}
            style={{ objectFit: "fill" }}
            className={classes.icon}
          />
          <h3 className={classes.title}>{product.name}</h3>
        </div>

        <div className={classes["price-details"]}>
          <p>Price</p>
          <h4>0.01 RVT</h4>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
