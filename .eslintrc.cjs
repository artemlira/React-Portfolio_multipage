module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    "import/ignore": ["\\.svg\\?react$"],
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "object-curly-newline": "off",
    "linebreak-style": "off",
    "import/no-named-as-default-member": "off",
    "import/no-unresolved": [
      "error",
      { ignore: ["^react-router$", "^swiper", "\\.svg\\?react$"] },
    ],
    "no-param-reassign": [2, { props: false }],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
      },
    ],
  },
  ignorePatterns: [".eslintrc.cjs", "vite.config.js"],
};
