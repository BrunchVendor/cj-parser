module.exports = {
  extends: [
    '../../.eslintrc.js',
    'plugin:vue/vue3-recommended',
  ],
  // 指定 vue 解析器
  parser: 'vue-eslint-parser',
  parserOptions: {
    // 告诉 ts 解析器要解析 vue 文件
    extraFileExtensions: ['.vue'],
  },
  rules: {
    'vue/multi-word-component-names': 'off',
  },
};
