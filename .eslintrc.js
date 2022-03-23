module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
  },
  plugins: ['prettier'],
  extends: ['airbnb-base', 'prettier', 'plugin:import/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'import/no-import-module-exports': 'off',
  },
};
