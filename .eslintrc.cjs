/**
 * @description
 * 현재 eslint와 prettier은 전역적으로 하위 워크스페이스에 연동되는 전략을 택하고 있습니다.
 * 이는 `vscode`에서 지원하는 워크스페이스 기능을 이용하였습니다.
 *
 * @see: https://techblog.woowahan.com/7976/
 */
const path = require('path');

module.exports = {
  globals: {
    NodeJS: true,
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
      },
    ],
    'class-methods-use-this': 'off',
    'no-restricted-syntax': 'off',
    'no-console': 'warn',
    'no-param-reassign': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        moduleDirectory: ['src/', 'node_modules'],
      },
      typescript: [
        path.resolve(__dirname, './tsconfig.json'), // root tsconfig
        path.resolve(__dirname, './packages/three/tsconfig.json'),
        /* ...rest of projects path to its tsconfig */
      ], // this loads <rootdir>/tsconfig.json to eslint,
    },
  },
  overrides: [
    {
      files: ['./src/**/*.ts'],
      plugins: ['@typescript-eslint/eslint-plugin'],
      /**
       * @description
       * `project`를 오버라이딩한 이유는, 이를 삭제할 경우 `CustomEvent`와 같은 Native Interface를
       * 타입스크립트 컴파일러가 추적하지 못하는 현상 때문입니다.
       */
      parserOptions: {
        extensions: ['.js', '.ts'],
        project: path.resolve(__dirname, './tsconfig.json'),
      },
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-useless-constructor': 'off',
        'no-empty-function': 'off',
        'max-classes-per-file': 'off',
        'arrow-body-style': 'off',
      },
    },
  ],
};
