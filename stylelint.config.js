export default {
  extends: ['stylelint-config-standard'],
  rules: {
    // Guesses overrides from selector shape, so it flags selectors that can
    // never match the same element (e.g. `.card p` and `.footer-inner p`).
    'no-descending-specificity': null,
    // Custom properties can hold font names like Georgia, which must keep their case.
    'value-keyword-case': ['lower', { ignoreProperties: ['/^--/'] }],
  },
};
