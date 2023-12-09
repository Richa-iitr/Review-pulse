"use client";
import { AnonAadhaarProvider } from "anon-aadhaar-react";

export const AnonProvider = ({ children }) => {
  return (
    <AnonAadhaarProvider _appId={process.env.NEXT_PUBLIC_ANON_APP_ID}>
      {children}
    </AnonAadhaarProvider>
  );
};
