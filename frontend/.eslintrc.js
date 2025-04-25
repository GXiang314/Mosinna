module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    // 'no-console': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: ["error","never"],
        singleQuote: true,
        trailingComma: 'none'
      }
    ]
  }
}
