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
<<<<<<< HEAD
    'linebreak-style': ['error', 'windows'],
=======
    'linebreak-style': ['error', 'unix'],
>>>>>>> 609a646a4aa9869ccc8b82690542fc6b5873d1a0
    'quotes': ['error', 'single']
  },
  'settings': {
    'babel-plugin-root-import': {
      'rootPathPrefix': '~/',
      'rootPathSuffix': 'src/'
    }    
  }
};
