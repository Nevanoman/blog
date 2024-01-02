module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  ignorePatterns: ['node_modules', 'dist', 'build'],
  extends: ['airbnb', 'airbnb/hooks', 'plugin:react/jsx-runtime', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  plugins: ['react', 'jsx-a11y', 'import', 'react-hooks', 'prettier'],
  rules: {
    'no-plusplus': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-param-reassign': ['error', { props: false }],
    'jsx-a11y/label-has-associated-control': [0, {}],
    'react/jsx-props-no-spreading': [0, {}],
    'react/no-array-index-key': 'off',
    'react/require-default-props': 'off',
    'no-undef': 'off',
    'react/jsx-no-bind': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-inner-declarations': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': 'off',
    'no-useless-escape': 'off',
  },
  settings: {
    version: 'detect',
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
}
