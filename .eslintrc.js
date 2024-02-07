module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "prettier",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@next/next/recommended",
  ],
  plugins: ["prettier"],
  rules: {
    "react/prop-types": "off",
    "prettier/prettier": "error",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },

  ignorePatterns: [
    ".eslintrc.js",
    "next.config.js",
    "next-env.d.ts",
    "node_modules",
    "out",
    "public",
    "tsconfig.json",
    "generated.ts",
    "intercom.js",
  ],
};
