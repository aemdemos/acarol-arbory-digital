module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  globals: {
    WebImporter: 'readonly',
    window: 'readonly',
    document: 'readonly',
    KeyboardEvent: 'readonly',
    XPathResult: 'readonly',
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'import/extensions': ['error', { js: 'always' }], // require js file extensions in imports
    'linebreak-style': ['error', 'unix'], // enforce unix linebreaks
    'no-param-reassign': [2, { props: false }], // allow modifying properties of param
    camelcase: ['error', { properties: 'never' }], // allow snake_case in properties only
    'no-console': 'warn', // warn on console statements
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // warn on unused variables except those starting with _
    'no-shadow': ['error', { allow: ['buttonElement'] }], // allow shadowing of buttonElement
    'no-redeclare': ['error', { builtinGlobals: false }], // allow redeclaring built-in globals
  },
  overrides: [
    {
      files: ['import.js'],
      rules: {
        camelcase: 'off',
        'no-console': 'off',
        'no-unused-vars': 'off',
        'no-shadow': 'off',
        'no-redeclare': 'off',
      },
    },
  ],
};
