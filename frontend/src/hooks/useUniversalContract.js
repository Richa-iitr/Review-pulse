import { contractAddress, abi } from "../../constants";
import { useState, useEffect } from "react";
import { useWeb3Contract } from "react-moralis";
import useWeb3 from "./useWeb3";
import { ethers } from "ethers";

const useDealClient = () => {
  const { userAccount } = useWeb3();
  const { runContractFunction, data, error, isLoading } = useWeb3Contract({});
  const registerAadhar = async (nullifier) => {
    const parameters = {
      abi: abi.universal,
      contractAddress: contractAddress.universal,
      functionName: "registerAadhar",
      params: {
        aadhar: nullifier,
      },
    };
    try {
      const response = await runContractFunction({
        params: parameters,
        onSuccess: (response) => {
          console.log(response);
        },
        onError: (error) => {
          console.log(error);
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (productName, id, nullifier) => {
    const parameters = {
      abi: abi.universal,
      contractAddress: contractAddress.universal,
      functionName: "addProduct",
      params: {
        name: productName,
        id: id,
        aadhar: nullifier,
      },
    };
    try {
      const response = await runContractFunction({
        params: parameters,
        onSuccess: (response) => {
          console.log(response);
        },
        onError: (error) => {
          console.log(error);
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const buyProduct = async (productId, nullifier, uri) => {
    const parameters = {
      abi: abi.universal,
      contractAddress: contractAddress.universal,
      functionName: "buyProduct",
      params: {
        productId: productId,
        aadhar: nullifier,
        uri: uri,
      },
    };
    try {
      const response = await runContractFunction({
        params: parameters,
        onSuccess: (response) => {
          console.log(response);
        },
        onError: (error) => {
          console.log(error);
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (productId) => {
    const parameters = {
      abi: abi.universal,
      contractAddress: contractAddress.universal,
      functionName: "products",
      params: {
        "": productId,
      },
    };
    try {
      const response = await runContractFunction({
        params: parameters,
        onSuccess: (response) => {
          console.log(response);
        },
        onError: (error) => {
          console.log(error);
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return { registerAadhar, getProducts };
};
export default useDealClient;
