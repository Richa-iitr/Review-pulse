"use client";
import classes from "@/styles/Products.module.css";
import NftCard from "@/components/NftCard";
import { useEffect, useState } from "react";
import { useAnonAadhaar } from "anon-aadhaar-react";
const Page = () => {
  const [anonAadhaar] = useAnonAadhaar();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
      );
      const data = await res.json();
      console.log(data);
      setProducts(data);
    };
    getData();
  }, []);

  return (
    <div className={classes["nfts-page"]}>
      <div className={classes.grid}>
        {products.length > 0 &&
          products.map((product) => <NftCard product={product} />)}
      </div>
    </div>
  );
};

export default Page;
