import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    // Site scripts are classic <script> tags so pages still work from file://.
    files: ['assets/js/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      sourceType: 'script',
      globals: globals.browser,
    },
  },
  {
    // The Squires games and their test page use the global from terminal.js.
    files: ['assets/js/*-*.js', 'tests/**/*.js'],
    languageOptions: {
      globals: { Terminal: 'readonly' },
    },
  },
  {
    files: ['*.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
