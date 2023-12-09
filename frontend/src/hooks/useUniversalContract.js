import { contractAddress, abi } from "../../constants";
import { useState, useEffect } from "react";
import { useWeb3Contract } from "react-moralis";
import useWeb3 from "./useWeb3";
import { ethers } from "ethers";

const useUniversalContract = () => {
const useUniversalContract = () => {
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
      msgValue: ethers.utils.parseEther("0.01"),
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

  const review = async (amount, productId) => {
    const parameters = {
      abi: abi.universal,
      contractAddress: contractAddress.universal,
      functionName: "review",
      params: {
        productId: productId,
      },
      msgValue: ethers.utils.parseEther(amount),
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

  function getPopNFT(productId, userAccount) {
    const parameters = {
      abi: abi.popNFT,
      contractAddress: contractAddress.popNFT,
      functionName: "getPopNFT",
      params: {
        productId: productId,
        user: userAccount,
      },
    };
    try {
      const response = runContractFunction({
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
  }
  function getProductCount() {
    const parameters = {
      abi: abi.universal,
      contractAddress: contractAddress.universal,
      functionName: "productCount",
      params: {},
    };
    try {
      const response = runContractFunction({
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
  }
  return {
    registerAadhar,
    getProducts,
    addProduct,
    buyProduct,
    getProductCount,
    getPopNFT,
  };
};
export default useUniversalContract;
