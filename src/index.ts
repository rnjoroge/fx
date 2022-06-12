import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

/**
 * Aza Entry Point
 */
import "./modules"
import "./infra/http/app"