// eslint 默认配置
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'standard',
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'indent': 'off',
    'semi': 'off'
  },
  globals: {
    wx: "writable",
    App: "writable",
    Page: 'writable',
    getApp: "writable"
  }
}
