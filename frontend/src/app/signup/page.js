"use client";
import React, { useState } from "react";
import classes from "@/styles/Login.module.css";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import Wallets from "@/components/Wallets";
import { useRouter } from "next/navigation";
import useUniversalContract from "@/hooks/useUniversalContract";

const Page = () => {
  const [anonAadhaar] = useAnonAadhaar();
  const [name, setName] = useState("");
  const router = useRouter();
  const { registerAadhar } = useUniversalContract();

  const handleSignUp = async () => {
    if (!name || !anonAadhaar.pcd.proof.nullifier) return;

    try {
      await registerAadhar(anonAadhaar.pcd.proof.nullifier);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${anonAadhaar.pcd.proof.nullifier}/user`,
        {
          method: "POST",
          body: JSON.stringify({ name }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      router.push("/");
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
          <LogInWithAnonAadhaar />
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
