import js from "@eslint/js";
import next from "eslint-config-next";

export default [
  js.configs.recommended,
  next,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    rules: {
      "no-unused-vars": "warn",
      "react/react-in-jsx-scope": "off",
    },
  },
];
