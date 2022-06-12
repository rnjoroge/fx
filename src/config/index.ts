import { authConfig } from "./auth";

const isProduction = process.env.IS_PRODUCTION === "false";

export {
  isProduction,
  authConfig
}