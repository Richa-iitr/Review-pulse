"use client";
import React, { useEffect } from "react";
import classes from "@/styles/Login.module.css";
import { LogInWithAnonAadhaar } from "anon-aadhaar-react";
import { useAnonAadhaar } from "anon-aadhaar-react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [anonAadhaar] = useAnonAadhaar();
  const router = useRouter();

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") router.push("/");
  }, [anonAadhaar]);
  return (
    <div className={classes["login-page"]}>
      <LogInWithAnonAadhaar />
    </div>
  );
};

export default LoginPage;
