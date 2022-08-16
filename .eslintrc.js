module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
    browser: true,
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    indent: 'off',
    quotes: ['error', 'single'],
    'no-undef': 'error',
    'prefer-const': 'error',
    semi: ['error', 'always'],
    'no-console': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },

  overrides: [
    {
      files: ['v3/ui/**/*'],

      extends: ['plugin:react/recommended'],
      plugins: ['react', 'react-hooks'],

      settings: {
        react: {
          version: '18.0.0',
        },
      },

      rules: {
        quotes: 'off',

        // react
        //        'react/prop-types': 'off',
        //        'react/jsx-key': 'off',

        // react-hooks
        //        'react-hooks/rules-of-hooks': 'error',
        //        'react-hooks/exhaustive-deps': 'error',
      },
    },
  ],
};
