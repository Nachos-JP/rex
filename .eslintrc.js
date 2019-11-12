module.exports = {
  "root": true,
  "env": {
    node: true,
    browser: true,
    es6: true,
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended",
    "google",
  ],
  "rules": {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "quotes": ["error", "double"],
    "space-before-blocks": "off",
    "arrow-parens": ["error", "as-needed"],
    "require-jsdoc": "off",
  },
  "parserOptions": {
    parser: "babel-eslint",
  },
};
