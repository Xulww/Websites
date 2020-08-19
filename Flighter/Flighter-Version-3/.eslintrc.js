const OFF = 0;
const WARN = 1;

module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "plugin:prettier/recommended"],
  env: {
    browser: true,
  },
  rules: {
    "react/destructuring-assignment": OFF,
    "import/prefer-default-export": OFF,
    "no-console": [WARN, { allow: ["warn", "error"] }],
  },
};
