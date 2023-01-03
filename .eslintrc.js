module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  rules: {
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
    indent: 'off', // Prettier
    quotes: 'off', // Prettier
    'no-undef': 'error',
    'prefer-const': 'error',
    semi: ['error', 'always'],
    'no-console': ['error', { allow: ['error'] }],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',

    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    // TODO: fixme and switch to `error`
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
      },
    },
  },

  overrides: [
    {
      files: ['v3/ui/**/*'],

      env: {
        browser: true,
      },

      extends: ['plugin:react/recommended'],
      plugins: ['react', 'react-hooks'],

      settings: {
        react: {
          version: '18.2.0',
        },
      },

      globals: {
        React: true,
      },

      rules: {
        quotes: 'off',
        'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
        'react/prop-types': 'off', // using ts
        // react-hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
      },
    },

    {
      files: ['v2/ui/**/*', 'v2/components/**/*', 'v1/components/**/*'],

      extends: ['plugin:react/recommended'],
      plugins: ['react', 'react-hooks'],

      settings: {
        react: {
          version: '18.2.0',
        },
      },

      env: {
        browser: true,
      },

      globals: {
        React: true,
        JSX: true,
      },

      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],

        // TODO: fixme and switch to `error`
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',

        // react
        'react/prop-types': 'off',
        'react/jsx-key': 'off',

        // react-hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
      },
    },
    {
      files: ['v2/ui/tests/e2e/**/*'],
      env: {
        mocha: true,
      },
      globals: {
        cy: true,
      },
    },

    {
      files: [
        '**/cypress/**/*.js',
        '**/*.cy.js',
        '**/*.cy.ts',
        '**/*.cy.tsx',
        '**/*.e2e.js',
        '**/*.e2e.ts',
        '**/*.e2e.tsx',
        'v3/synpress/tests/e2e/**/*',
      ],
      env: {
        mocha: true,
      },
      globals: {
        cy: true,
        Cypress: true,
        expect: true,
      },
      rules: {},
    },

    {
      files: ['v3/subgraphs/**/*'],
      env: {},
      globals: {
        changetype: true,
        i32: true,
        i64: true,
        assert: true,
      },
      rules: {
        'prefer-const': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-array-constructor': 'off',
      },
    },
  ],
};
