"use client";
import styles from "@/styles/page.module.css";
import OngoingProductCard from "@/components/OngoingProductCard";
import CompletedProductCard from "@/components/CompletedProductCard";
import { useState, useEffect } from "react";
import ProductList from "@/components/ProductList";
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState({ avgRating: 0, number: 0 });
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const handleProductListOpen = () => {
    console.log("opening");
    setIsProductListOpen(true);
  };
  const handleProductListClose = () => {
    setIsProductListOpen(false);
  };
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
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/c7992494-7898-49ba-a20c-c5a5f5931802/reviews`
        );
        const data = await res.json();
        console.log(data);
        let sum = 0;
        data.forEach((item) => (sum += item.rating));
        setReviews({ avgRating: sum / data.length, number: data.length });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  console.log(reviews);
  return (
    <>
      <main className={styles.main}>
        <section className={styles["ongoing-section"]}>
          <div className={styles["section-header"]}>
            <h2>Ongoing Products</h2>
            <Button
              className={styles["list-btn"]}
              action={handleProductListOpen}
            >
              List Product
            </Button>
          </div>
          <div className={styles["ongoing-products"]}>
            {products.length > 0 &&
              products.map((product) => (
                <Link href={`${product._id}/ongoing-reviews`}>
                  <OngoingProductCard
                    key={product._id}
                    productId={product._id}
                    name={product.name}
                    reviews={product.reviews}
                  />
                </Link>
              ))}
          </div>
        </section>
        <section className={styles["ongoing-section"]}>
          <h2>Completed Products</h2>
          <div className={styles["ongoing-products"]}>
            <Link
              href={"/c7992494-7898-49ba-a20c-c5a5f5931802/completed-reviews"}
            >
              <CompletedProductCard
                productId={"3"}
                name={"Clothing"}
                reviews={"340"}
                recommended={reviews.avgRating >= 2.5}
              />
            </Link>
          </div>
        </section>
        {isProductListOpen && <ProductList onClose={handleProductListClose} />}
      </main>
    </>
  );
}
