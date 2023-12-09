"use client";
import Button from "./Button";
import Modal from "./Modal";
import { IoCloseSharp } from "react-icons/io5";
import classes from "@/styles/ProductList.module.css";
import { useState } from "react";
import { v4 } from "uuid";
const ProductList = ({ onClose }) => {
  const [file, setFile] = useState();
  const [values, setValues] = useState({
    name: "",
    seller: "",
    description: "",
    id: v4(),
  });
  const handleValueChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!values.name || !values.seller || !values.description || !file) return;
    console.log(values, file);
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
              placeholder="name"
              id={"product-name"}
              onChange={handleValueChange("name")}
            />
          </div>
          <div className={classes["field-container"]}>
            <label htmlFor="seller-name">Seller</label>
            <input
              type="text"
              placeholder="seller"
              id={"seller-name"}
              onChange={handleValueChange("seller")}
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
            Submit Project
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ProductList;
