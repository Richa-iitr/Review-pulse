"use client";
import styles from "@/styles/page.module.css";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import ProductList from "@/components/ProductList";
import Button from "@/components/Button";

export default function Home() {
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const handleProductListOpen = () => {
    console.log("opening");
    setIsProductListOpen(true);
  };
  const handleProductListClose = () => {
    setIsProductListOpen(false);
  };
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
            <ProductCard productId={"1"} />
            <ProductCard productId={"2"} />
          </div>
        </section>
        <section className={styles["ongoing-section"]}>
          <h2>Completed Products</h2>
          <div className={styles["ongoing-products"]}>
            <ProductCard productId={"3"} />
            <ProductCard productId={"4"} />
          </div>
        </section>
        {isProductListOpen && <ProductList onClose={handleProductListClose} />}
      </main>
    </>
  );
}
