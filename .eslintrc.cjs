/**
 * @description
 * 현재 eslint와 prettier은 전역적으로 하위 워크스페이스에 연동되는 전략을 택하고 있습니다.
 * 이는 `vscode`에서 지원하는 워크스페이스 기능을 이용하였습니다.
 *
 * @see: https://techblog.woowahan.com/7976/
 */

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
  plugins: ['@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'class-methods-use-this': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  overrides: [
    {
      files: ['*.ts'],
      plugins: ['@typescript-eslint/eslint-plugin'],
      /**
       * @since
       * 0번째 인덱스에 `project`를 오버라이딩한 이유는, 이를 삭제할 경우 `CustomEvent`와 같은 Native Interface를
       * 타입스크립트 컴파일러가 추적하지 못하는 현상 때문입니다.
       */
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
};
