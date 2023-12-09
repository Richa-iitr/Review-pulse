"use client";
import styles from "@/styles/page.module.css";
import OngoingProductCard from "@/components/OngoingProductCard";
import CompletedProductCard from "@/components/CompletedProductCard";
import { useState, useEffect } from "react";
import ProductList from "@/components/ProductList";
import Button from "@/components/Button";

export default function Home() {
  const [products, setProducts] = useState([]);
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
                <OngoingProductCard
                  key={product._id}
                  productId={product._id}
                  name={product.name}
                  reviews={"23"}
                />
              ))}
          </div>
        </section>
        <section className={styles["ongoing-section"]}>
          <h2>Completed Products</h2>
          <div className={styles["ongoing-products"]}>
            <CompletedProductCard
              productId={"3"}
              name={"Clothing"}
              reviews={"340"}
            />
            <CompletedProductCard
              productId={"4"}
              name={"Clothing"}
              reviews={"340"}
            />
            <CompletedProductCard
              productId={"5"}
              name={"Clothing"}
              reviews={"340"}
            />
          </div>
        </section>
        {isProductListOpen && <ProductList onClose={handleProductListClose} />}
      </main>
    </>
  );
}
