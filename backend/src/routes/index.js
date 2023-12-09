import { createUserRoute } from "./createUserRoute";
import { createProductRoute } from "./createProductRoute";
import { getProductRoute } from "./getProductRoute";
import { getUserRoute } from "./getUserRoute";
export const routes = [
  createUserRoute,
  createProductRoute,
  getProductRoute,
  getUserRoute,
];
