"use client";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

const Wallets = ({ onClose }) => {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    Moralis.onAccountChanged((newAccount) => {
      if (newAccount == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
      }
    });
  }, []);

  return (
    <>
      {account ? (
        <div className={"user-account"}>
          {account.slice(0, 4) + "..." + account.slice(-4)}
        </div>
      ) : (
        <button
          onClick={async () => {
            // await walletModal.connect()
            const ret = await enableWeb3();
            if (typeof ret !== "undefined") {
              // depends on what button they picked
              if (typeof window !== "undefined") {
                window.localStorage.setItem("connected", "injected");
                // window.localStorage.setItem("connected", "walletconnect")
              }
            }
          }}
          disabled={isWeb3EnableLoading}
          className="connect-btn"
        >
          Connect
        </button>
      )}
    </>
  );
};

export default Wallets;
