"use client";
import React, { useState } from "react";
import classes from "@/styles/Login.module.css";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import Wallets from "@/components/Wallets";

const Page = () => {
  const [anonAadhaar] = useAnonAadhaar();
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
        method: "POST",
        body: JSON.stringify(name),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={classes["login-page"]}>
      <div className={classes["content-container"]}>
        <div className={classes["input-field-container"]}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={classes["anon-container"]}>
          <p>Verify with Anon Aadhaar</p>
          {anonAadhaar.status === "logged-in" ? (
            <p>{anonAadhaar.pcd}</p>
          ) : anonAadhaar.status === "logging-in" ? (
            <div className="spin"></div>
          ) : (
            <LogInWithAnonAadhaar />
          )}
        </div>
        <div className={classes["wallet-container"]}>
          <p>Wallet Connection</p>
          <Wallets />
        </div>
        <button
          className="connect-btn"
          style={{ textAlign: "center" }}
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Page;
