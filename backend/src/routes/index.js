import { createUserRoute } from "./createUserRoute";
import { createProductRoute } from "./createProductRoute";
import { getProductsRoute } from "./getProductsRoute";
import { getProductRoute } from "./getProductRoute";
import { getUserRoute } from "./getUserRoute";
import { createReviewRoute } from "./createReviewRoute";
export const routes = [
  createUserRoute,
  createProductRoute,
  getProductsRoute,
  getUserRoute,
  getProductRoute,
  createReviewRoute,
];
