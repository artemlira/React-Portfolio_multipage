module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "prettier",
    'plugin:react/recommended',
    'airbnb',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "linebreak-style": ["error", "windows"],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type"
        ]
      }
    ]
  },
  ignorePatterns: [".eslintrc.cjs", "postcss.config.js", "vite.config.js"],
};
