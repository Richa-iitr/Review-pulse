import React, { useEffect, useState } from "react";
import classes from "@/styles/ProductCard.module.css";
import { BiMessageRounded } from "react-icons/bi";
import clothingImage from "../../public/clothing.jpeg";
import Image from "next/image";
import Link from "next/link";
import useUniversalContract from "@/hooks/useUniversalContract";
import { useAnonAadhaar } from "anon-aadhaar-react";
import useWeb3 from "@/hooks/useWeb3";
const OngoingProductCard = ({ productId, name, reviews }) => {
  const [anonAadhaar] = useAnonAadhaar();
  const { buyProduct, getPopNFT } = useUniversalContract();
  const { userAccount } = useWeb3();
  const [showBuy, setShowBuy] = useState(true);
  const handleBuyNow = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-nft-uri`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cid: "QmUttGTuPbQkuroyGqrX3gS2b9SPdtYvyXLtxZjLHhgGuZ",
        }),
      }
    );
    const data = await res.json();
    const { Uri } = data;

    const response = await buyProduct(
      productId,
      anonAadhaar.pcd.proof.nullifier,
      Uri
    );
    console.log(response);
    setShowBuy(true);
  };
  const getpop = async () => {
    const response = await getPopNFT(productId, userAccount);
    console.log(response);
    if (response === 0 || response === null || response === undefined)
      setShowBuy(true);
    else setShowBuy(false);
  };
  useEffect(() => {
    console.log(userAccount);
    if (userAccount) {
      getpop();
    }
  }, [userAccount]);
  return (
    <div className={classes["product-card"]}>
      <Image className={classes.img} src={clothingImage} alt="clothing" />
      <div className={classes["content"]}>
        {reviews > 0 ? (
          <div
            className={
              recommended ? classes.recommended : classes.unrecommended
            }
          >
            <p>{recommended ? "recommended" : "unrecommended"}</p>
          </div>
        ) : (
          <div></div>
        )}
        <div className={classes.bottom}>
          <div className={classes["ongoing-left"]}>
            <h4>{name}</h4>
            <p className={classes.round}>Round {Math.trunc(reviews / 5) + 1}</p>
          </div>
          <div>
            <BiMessageRounded />
            <p>{reviews} Reviews</p>
          </div>
        </div>
      </div>
      {showBuy ? (
        <button
          className={classes["buy-button"]}
          disabled={!userAccount ? true : false}
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      ) : (
        <Link
          href={!userAccount ? "/" : `/${productId}/review`}
          className={classes["buy-button"]}
        >
          Review
        </Link>
      )}
    </div>
  );
};

export default OngoingProductCard;
