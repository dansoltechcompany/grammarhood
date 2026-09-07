import { defineConfig, globalIgnores } from "eslint/config";
import nextPlugin from "eslint-config-next";

export default defineConfig([
  ...nextPlugin,
  globalIgnores([".next/**", "out/**", "node_modules/**"]),
]);
