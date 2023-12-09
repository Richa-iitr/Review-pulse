"use client";
import Button from "./Button";
import Modal from "./Modal";
import { IoCloseSharp } from "react-icons/io5";
import classes from "@/styles/ProductList.module.css";
import { useState } from "react";
import useUniversalContract from "@/hooks/useUniversalContract";
import { useAnonAadhaar } from "anon-aadhaar-react";
const ProductList = ({ onClose }) => {
  const [file, setFile] = useState();
  const [values, setValues] = useState({
    name: "",
    seller: "",
    description: "",
    tokens: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { getProductCount, addProduct } = useUniversalContract();
  const [anonAadhaar] = useAnonAadhaar();
  console.log(anonAadhaar);
  const handleValueChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!values.name || !values.seller || !values.description || !file) return;
    try {
      setIsLoading(true);
      console.log("getting count");
      const nftCount = await getProductCount();
      if (!nftCount) return;
      console.log(Number(nftCount));
      const contractResponse = await addProduct(
        values.name,
        Number(nftCount),
        anonAadhaar.pcd.proof.nullifier,
        values.tokens.toString()
      );

      console.log(contractResponse);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("seller", values.seller);
      formData.append("description", values.description);
      formData.append("tokens", values.tokens);
      formData.append("product_id", nftCount);
      formData.append("image", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);

      setIsLoading(false);
      onClose();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  return (
    <Modal>
      <div className={classes.top}>
        <h2>Product Details</h2>
        <Button className={classes["close-btn"]} action={onClose}>
          <IoCloseSharp size={30} />
        </Button>
      </div>
      <div className={classes["modal-content"]}>
        <form onSubmit={handleProductSubmit}>
          <div className={classes["field-container"]}>
            <label htmlFor="product-name">Product Name</label>
            <input
              type="text"
              placeholder="Name"
              id={"product-name"}
              onChange={handleValueChange("name")}
            />
          </div>
          <div className={classes["field-container"]}>
            <label htmlFor="seller-name">Seller</label>
            <input
              type="text"
              placeholder="Seller Name"
              id={"seller-name"}
              onChange={handleValueChange("seller")}
            />
          </div>
          <div className={classes["field-container"]}>
            <label htmlFor="tokens">Amount to Pay</label>
            <input
              type="number"
              placeholder="Amount to Pay"
              id={"tokens"}
              onChange={handleValueChange("tokens")}
              min={0}
            />
          </div>
          <div className={classes["field-container"]}>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              placeholder="write about your product"
              id={"description"}
              rows={4}
              onChange={handleValueChange("description")}
            />
          </div>

          <div className={classes["field-container"]}>
            <label htmlFor="description">Product Image</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
            />
          </div>
          <button type="submit" className="btn">
            {isLoading ? <div className="spin"></div> : "Submit Product"}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ProductList;
