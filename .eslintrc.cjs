module.exports = {
  root: true,
  extends: [
    'plugin:wirthus/node-ts'
  ],
  plugins: [
    'wirthus'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
    project: 'tsconfig.eslint.json'
  },
  ignorePatterns: [
    'index.js'
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    'import/no-named-as-default-member': 'off',
  },
  overrides: [
    {
      files: [
        'src/definitions/**/*.ts'
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      }
    }
  ]
};
