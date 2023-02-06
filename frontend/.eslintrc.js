module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'react-app',
    'prettier',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'lines-between-class-members': 'off',
    'import/no-unresolved': 'off',
    'prefer-template': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['.storybook/**', 'src/stories/**'],
      },
    ],
  },
};
