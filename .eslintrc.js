module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: "react-tools",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to"]
      }
    ],
    indent: ["error", 2],
    "linebreak-style": 0,
    quotes: ["error", "single"],
    semi: ["error", "always"]
  }
};
