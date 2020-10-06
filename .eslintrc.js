/* eslint-disable no-undef */
module.exports = {
  'parser': '@typescript-eslint/parser',
  'plugins': [
    '@typescript-eslint'
  ],
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'comma-dangle': 0,
    'camelcase': ['error', { ignoreDestructuring: true }],
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    'linebreak-style': ['error', 'windows'],
    'quotes': ['error', 'single']
  },
  'settings': {
    'babel-plugin-root-import': {
      'rootPathPrefix': '~/',
      'rootPathSuffix': 'src/'
    }    
  }
};
