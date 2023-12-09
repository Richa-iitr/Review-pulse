"use client";
import { MoralisProvider } from "react-moralis";

export default function MoralisProviderCustom({ children }) {
  return (
    <MoralisProvider initializeOnMount={false}>{children}</MoralisProvider>
  );
}
